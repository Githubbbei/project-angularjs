window.onload = function() {

	//分页变量
	var recordCount;//总记录数
	var pageSize = 3;//每页多少条
	var pageCount;//共几页
	var pageNum = 1;//当前页码

	getData();


	function getData() {


		$.getJSON('js/json.txt',function(json, textStatus) {

			//计算当前页的起始下标和终止下标
			var start = (pageNum - 1) * pageSize;
			var end = pageNum * pageSize;

			//得到当前页的数据
			var newArray = json.slice(start,end);
			
			var html = '';//拼接html字符串
			var topics = $('.topics');//评论列表容器
			// topics.empty();//清空容器列表

			// 遍历json数组
			$.each(newArray,function(index, el) {

				// 拼接html代码
				html = '<li>';
				html += '	<a href="javascript:;">';
				html += '		<img src="' + el.url + '" alt="">';
				html += '	</a>';
				html += '	<h1>' + el.title + '</h1>';
				html += '	<span>';
				html += '		<i class="icon-home2"></i>';
				html += '		我的故事';
				html += '	</span>';
				html += '</li>';

				topics.append(html);
				
			});	

			// 分页数据设置
			recordCount =  json.length;
			pageCount = parseInt(recordCount / pageSize);
			if (recordCount % pageSize != 0) {
				pageCount ++;
			};

		})
		.fail(function() {
			alert("请求失败");
		});

	}

	// 加载更多评论
	$('.moreTopic').click(function(event) {

		pageNum ++;
		getData();
		// 判断是否最后一页
		if (pageNum >= pageCount) {
			$(this).text('刺猬君也是有底线的');
			return;
		}
		
	});

}