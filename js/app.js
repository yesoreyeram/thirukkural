'use strict';

var kuralApp = angular.module('kuralApp',['ngRoute','kuralApp.Home','kuralApp.About','kuralApp.Kural']);
kuralApp.config(['$routeProvider', function($routeProvider) {
 $routeProvider.otherwise({redirectTo: '/'});
}]);

/// Home Module

var homeModule = angular.module('kuralApp.Home',['ngRoute']);
homeModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
    templateUrl: 'home/index.html',
    controller: 'HomeCtrl'
  });
}]);
homeModule.controller('HomeCtrl',["$scope",function($scope){
	$scope.Welcome ="Hello Thirukkural";
}]);

// About Module

var aboutModule = angular.module('kuralApp.About',['ngRoute']);
aboutModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/about', {
    templateUrl: 'about/index.html',
    controller: 'AboutCtrl'
  });
}]);
aboutModule.controller('AboutCtrl',["$scope",function($scope){
	$scope.Welcome ="About Thirukkural";
}]);

// Browse Module


var browserModule = angular.module('kuralApp.Kural',['ngRoute']);
browserModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/browse', { templateUrl: 'kural/index.html', controller: 'KuralBrowserCtrl' });	
	$routeProvider.when('/kural', { templateUrl: 'kural/index.html', controller: 'KuralBrowserCtrl' });
	$routeProvider.when('/kural/:SectionName', { templateUrl: 'kural/paal.html', controller: 'PaalCtrl' });
	$routeProvider.when('/kural/:SectionName/:CatGroupName', { templateUrl: 'kural/catgroup.html', controller: 'CatGrpCtrl' });
	$routeProvider.when('/kural/:SectionName/:CatGroupName/:CategoryName', { templateUrl: 'kural/Category.html', controller: 'CategoryCtrl' });
	$routeProvider.when('/kural/:SectionName/:CatGroupName/:CategoryName/:KuralID', { templateUrl: 'kural/kural.html', controller: 'KuralCtrl' });
}]);
browserModule.controller('KuralBrowserCtrl',["$scope","$http",function($scope,$http){
	$scope.Welcome ="Thirukkural list";
	$http.get('data/Summary.json').success(function(data)
	{
    	$scope.KuralList = data;
  	});
}]);
browserModule.controller('PaalCtrl',["$scope","$http","$routeParams",function($scope,$http,$routeParams){
	$scope.Welcome ="Thirukkural list";
	$scope.SectionName = $routeParams.SectionName;
	$http.get('data/Summary.json').success(function(data)
	{
		$scope.PaalList = _.filter(data,function(item){return item.Name_Transliteration == $scope.SectionName})[0];
  	});
}]);
browserModule.controller('CatGrpCtrl',["$scope","$http","$routeParams",function($scope,$http,$routeParams){
	$scope.Welcome ="Thirukkural list";
	$scope.SectionName = $routeParams.SectionName;
	$scope.CatGroupName = $routeParams.CatGroupName;
	$http.get('data/Summary.json').success(function(data)
	{
		$scope.Paalist = _.filter(data,function(item){return item.Name_Transliteration == $scope.SectionName})[0];
		$scope.CatGrouplist = _.filter($scope.Paalist.Iyalgal,function(item){return item.Name_Transliteration == $scope.CatGroupName})[0];
  	});
}]);
browserModule.controller('CategoryCtrl',["$scope","$http","$routeParams",function($scope,$http,$routeParams){
	$scope.Welcome ="Thirukkural list";
	$scope.SectionName = $routeParams.SectionName;
	$scope.CatGroupName = $routeParams.CatGroupName;
	$scope.CategoryName = $routeParams.CategoryName;
	$http.get('data/summary.json').success(function(data)
	{
		$scope.Paalist = _.filter(data,function(item){return item.Name_Transliteration == $scope.SectionName})[0];
		$scope.CatGrouplist = _.filter($scope.Paalist.Iyalgal,function(item){return item.Name_Transliteration == $scope.CatGroupName})[0];
		$scope.Chapter = _.filter($scope.CatGrouplist.Adhigarangal,function(item){return item.Name_Transliteration == $scope.CategoryName})[0];
		var aaa ="data/chapters/KuralChapter_"+ $scope.Chapter.ID +".json";
		$http.get(aaa).success(function(data){
			$scope.Kuralgal = data.Kuralgal 
		});
  	});
}]);
browserModule.controller('KuralCtrl',["$scope","$http","$routeParams",function($scope,$http,$routeParams){
	$scope.Welcome ="Thirukkural list";
	$scope.SectionName = $routeParams.SectionName;
	$scope.CatGroupName = $routeParams.CatGroupName;
	$scope.CategoryName = $routeParams.CategoryName;
	$scope.KuralID = $routeParams.KuralID;
	$http.get('data/Summary.json').success(function(data)
	{
		$scope.Paalist = _.filter(data,function(item){return item.Name_Transliteration == $scope.SectionName})[0];
		$scope.CatGrouplist = _.filter($scope.Paalist.Iyalgal,function(item){return item.Name_Transliteration == $scope.CatGroupName})[0];
		$scope.Chapter = _.filter($scope.CatGrouplist.Adhigarangal,function(item){return item.Name_Transliteration == $scope.CategoryName})[0];
		var aaa ="data/chapters/KuralChapter_"+ $scope.Chapter.ID +".json";
		$http.get(aaa).success(function(data){
			$scope.Kuralgal = data.Kuralgal 
			$scope.Kural = _.filter($scope.Kuralgal,function(item){ return item.ID == $scope.KuralID })[0];
		});
  	});
}]);