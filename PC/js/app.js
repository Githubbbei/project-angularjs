/**
 * Created by Administrator on 2016/11/22.
 * 核心模块：核心配置，路由配置
 */


//创建模块，依赖ngRoute路由模块
var myApp = angular.module('myApp',['ngRoute','project.controller']);

//在config中配置路由，注入$routeProvider
myApp.config(['$routeProvider',function($routeProvider) {

//配置路由的对应的画面
$routeProvider
	.when('/',{
		templateUrl:'tpls/main.html',
		controller:'firstController'
		})
	.when('/talk',{
		templateUrl:'tpls/talk.html',
		controller:'secondController'  //指定页面的控制器
	})
	.when('/login',{
		templateUrl:'tpls/Login.html',
		controller:'thirdController'  //指定页面的控制器
	})
//	如果没有匹配的路由，默认重定向地址
	.otherwise({
		redirectTo:'/'
	});
}]);
