/**
 * Created by Administrator on 2016/11/22.
 * 控制器模块（控制器层）
 */
angular.module('project.controller',[])
	// 登录控制器
	.controller('firstController', ['$scope', function($scope) {

		//轮播容器
		var container = document.getElementById('container');
		// 图片列表
		var list = document.getElementById('list');
		// 获得图片的数量
		var imageCount = list.getElementsByTagName('img').length
		// 切换按钮组
		var buttons = document.getElementById('buttons').getElementsByTagName('span');
		// 左右箭头
		var prev = document.getElementById('prev');
		var next = document.getElementById('next');
		//屏幕宽度
		var containerWidth = screen.width;
		// 当前索引
		var currIndex = 0;

		// 单幅图片宽度
		var imagesWidth = 1920;
		// 动画同步标志
		var isAnimate = false;


		// 左箭头单击事件
		prev.onclick = function() {
			// 判断动画是否进行
			if (isAnimate) {
				return;
			}
		
			// 索引递增
			currIndex --;
			if (currIndex < 0) {
				currIndex = imageCount - 3;				
			}
			animate(imagesWidth);
			

		}

		// 右箭头单击事件
		next.onclick = function() {
			// 判断动画是否进行
			if (isAnimate) {
				return;
			}
			// 索引递减
			currIndex ++;
			if (currIndex > imageCount - 3) {
				currIndex = 0;

			}
			animate(-imagesWidth);
		}

		// 遍历切换按钮组
		for (var i = 0;i < buttons.length;i ++) {

			(function(index) {
				buttons[i].onclick = function() {

					// 判断动画是否进行
					if (isAnimate) {
						return;
					}
					var offset = -imagesWidth * (index - currIndex);
					currIndex = index;//记录当前索引
					animate(offset);
					

				}
			})(i);

		}

		list.style.left = -imagesWidth + (-imagesWidth + parseInt(screen.width))/2 + 'px';
		
		// 运动函数
		function animate(offset) {

			// 计算出新的位置
			var newLeft = parseInt(list.style.left) + offset;

			//运动参数
			var time = 800;//动画的运动时间
			var interval = 40;//每隔多少毫秒执行一次
			var speed = offset / (time / interval);//每次移动的像素数

			// go函数
			function go() {

				// 获得当前位置
				var left = parseInt(list.style.left);

				// 判断是否到达目标位置
				if(speed > 0 && left >= newLeft || speed < 0 && left <= newLeft) {
					// 终止定时器
					clearInterval(timerId);
					// 动画中止
					isAnimate = false;
					// 防止误差，直接设置到目标位置
					left = list.style.left = newLeft + 'px';

					// 判断是否到达替身图
					if (parseInt(left) == (-imagesWidth + parseInt(screen.width))/2) {
						list.style.left = -imagesWidth * (imageCount - 2) + (-1920 + parseInt(screen.width))/2 + 'px';
					}

					if (parseInt(left) == -imagesWidth * (imageCount - 1) + (-1920 + parseInt(screen.width))/2) {
						list.style.left = -imagesWidth + (-imagesWidth + parseInt(screen.width))/2 + 'px';
					}
					return;
				}
				// 递增递减
				list.style.left = left + speed + 'px';
			}

			//定时器
			var timerId = setInterval(go,interval);
			// 动画进行中
			isAnimate = true;
			highlight();//高亮


		}
		// 高亮函数
		function highlight() {
			for (var i = 0;i < buttons.length;i ++) {
				buttons[i].className = '';
			}

			// 当前按钮高亮
			buttons[currIndex].className = 'on';
		}

		// 自动播放
		function autoPlay() {
			next.click();//产生用户单击右箭头事件
		}

		//自动播放的定时器
		var timerId = setInterval(autoPlay,3000);

		// 鼠标移上终止自动播放
		container.onmouseenter = function() {
			clearInterval(timerId);
		}

		// 鼠标离开重新自动播放
		container.onmouseleave = function() {
			timerId = setInterval(autoPlay,3000);
		}

		// 滚动条事件
		$(window).scroll(function(event) {
			
			// 获得滚动条卷去的大小
			var sTop = $(window).scrollTop();		

			// 如果滚动条超过200像素，显示回到顶部的按钮
			if (sTop >= 200) {
				$('.BackTop').slideDown(500);			
			} else {
				$('.BackTop').slideUp(500);
			}

		});

		// 滚动条回到顶部
		$('.BackTop').click(function(event) {
			
			$('html,body').animate({scrollTop:0}, 1000);

		});

	}])
	// 发表评论画面控制器
	.controller('secondController', ['$scope','$http', function($scope,$http) {

		// 滚动条事件
		$(window).scroll(function(event) {
			
			// 获得滚动条卷去的大小
			var sTop = $(window).scrollTop();		

			// 如果滚动条超过200像素，显示回到顶部的按钮
			if (sTop >= 200) {
				$('.BackTop').slideDown(500);			
			} else {
				$('.BackTop').slideUp(500);
			}

		});

		// 滚动条回到顶部
		$('.BackTop').click(function(event) {
			
			$('html,body').animate({scrollTop:0}, 1000);

		});

		// 发出http的ajax请求
		$http({
			method:'GET', //请求方式GET POST
			url:'js/json.txt' //请求的url
		})
		.success(function(data) { 

			//请求成功
			alert('请求成功！');
			$scope.data = data;
		})
		.error(function(data,status,headers,config) { 

			//请求失败
			alert('请求失败:' + status);				
		});
		

		/*
			点赞功能
		*/
		$('.widget-article-list').on('click', '.in', function(event) {	

			// 读取本地存储的点赞历史数据
			var hitIdsStr = sessionStorage.getItem('hitIds');

			var hitIds;//点赞历史记录的id数组

			// 如果是第一次存储，初始化空数组，如果以前有数据，把原来的数据转换为数组
			if (hitIdsStr == null) {
				hitIds = [];
			} else {
				hitIds = JSON.parse(hitIdsStr);
			}
			
			// 获得操作的数据的id
			var id = $(this).attr('data-id');

			// 判断id是否在历史记录数组中存在
			if (hitIds.indexOf(id) != -1) {
				layer.msg('这个文章已经点过赞了！');
				return;
			}

			$(this).addClass('active');

			// 存储id到数组中
			hitIds.push(id);

			// 重新存储到本地存储
			sessionStorage.setItem('hitIds',JSON.stringify(hitIds));
			

			// 更新前端画面
			var newHit = parseInt($(this).find('.txt').text()) + 1;
			$(this).find('.txt').text(newHit);

		});

	}])
	// 查看评论电脑版控制器
	.controller('thirdController', ['$scope', function($scope) {

		// 获得表单对象
		var form1 = document.getElementById('form1');


		// 注册提交事件
		form1.onsubmit = function() {

			// 正则表达式对象
			var r;
			var r1;

			// 手机号码验证
			var username = document.getElementById('username');

			r = /^1[345678]\d{9}$/;
			r1 = /^[a-z0-9_]+@\w+(\.[a-z]{2,3}){1,2}$/;

			if (!r.test(username.value) || !r1.test(username.value)) {
				layer.msg('用户名格式不正确');
				username.select();
				return false;
			}

		} 

	}]);