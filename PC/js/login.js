window.onload = function() {

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
			alert('用户名格式不正确');
			username.select();
			return false;
		}

	} 

}