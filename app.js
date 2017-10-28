var app=angular.module('app',[]);
app.controller('appController', function($scope,$http){
	$scope.call=call
	function call(){
		$http.get("https://api.github.com/repos/angular/angular/commits")
		.then(function(response){

		let list=[]
		let user=[]
		let d=response.data
		for(let i=0;i<25;i++){
			console.log(d[i].commit.committer)
			let dateStart=new Date(d[i].commit.committer.date).getHours()
			let dateEnd=new Date().getHours()
			var difference=dateEnd-dateStart
			let c={
				sha:d[i].sha,
				user:d[i].author.login,
				avatar_url:d[i].author.avatar_url,
				message:d[i].commit.message,
				time:difference
			}
			list.push(c)
			user.push(d[i].author.login)
		}

		list.sort(function(a,b){
			const userA=a.user.toUpperCase();
			const userB=b.user.toUpperCase();
			let comparison=0;
			if(userA>userB){
				comparison=1;
			}else if(userA<userB){
				comparison=-1;
			}
			return comparison;
		})
		
		$scope.data=list

		})	
	}
	$scope.call();
  
})
