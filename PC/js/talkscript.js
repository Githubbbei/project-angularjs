window.onload = function() {

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

	getData();


	function getData() {
		$.getJSON('js/json.txt',function(json, textStatus) {

			var data = json;
			var html = '';//拼接html字符串
			var widgetArticleList = $('.widget-article-list');//评论列表容器
			widgetArticleList.empty();//清空容器列表

			// 遍历json数组
			$.each(data,function(index, el) {

				// 拼接html代码
				html = '<div class="widget">';
				html += '	<div class="box">';
				html += '		<a href="javascript:;" class="img left">';
				html += '			<img src="' + el.pic + '">';
				html += '		</a>';
				html += '		<div class="info">';
				html += '			<h2 class="title">';
				html += '				<a href="javascript:;">' + el.title + '</a>';
				html += '			</h2>';
				html += '			<div class="subinfo">';
				html += '				<span class="author left">';
				html += '					<img src="' + el.person_pic + '" alt="">';
				html += 					el.name;
				html += '				</span>';
				html += '				<span class="left time">' + el.time + '</span>';
				html += '			</div>';
				html += '			<p>' + el.s_title + '</p>';
				html += '			<div class="left">';
				html += '				<a href="javascript:;" class="icontext">';
				html += '					<i class="font icon-home2"></i>';
				html += '					<i class="txt">刺猬电台</i>';
				html += '				</a>';
				html += '			</div>';
				html += '			<div class="right status">';
				html += '				<span data-id="' + el.id + '" class="icontext">';
				html += '					<i class="font icon-eye"></i>';
				html += '					<i class="txt">20</i>';
				html += '				</span>';
				html += '				<span  data-id="' + el.id + '" class="icontext in">';
				html += '					<i class="font icon-heart"></i>';
				html += '					<i class="txt">0</i>';
				html += '				</span>';
				html += '				<span class="icontext">';
				html += '					<i class="font icon-mail4"></i>';
				html += '					<i class="txt">0</i>';
				html += '				</span>';
				html += '			</div>';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';

				widgetArticleList.append(html);
				
			});

		})
		.fail(function() {
			alert("请求失败");
		});
	}

	/*
		点赞功能
	*/
	$('.widget-article-list').on('click', '.in', function(event) {

		$(this).addClass('active');

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
			layer.msg('这条评论已经点过赞了！');
			return;
		}

		// 存储id到数组中
		hitIds.push(id);

		// 重新存储到本地存储
		sessionStorage.setItem('hitIds',JSON.stringify(hitIds));
		

		// 更新前端画面
		var newHit = parseInt($(this).find('.txt').text()) + 1;
		$(this).find('.txt').text(newHit);

	});

}