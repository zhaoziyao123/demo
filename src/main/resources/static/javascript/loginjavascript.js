function submitForm() {
    $.ajax({
        url: '<%=request.getContextPath()%>/login/login.do',
        data: $('#loginForm').serialize(),
        success: function (result) {
            if (result == 1) {
                bootbox.alert("账号不存在")
            } else if (result == 2) {
                bootbox.alert("密码错误,请重新输入")
            } else if (result == 0) {
                bootbox.alert("登录成功")
                location.href = "<%=request.getContextPath()%>/jump/toMain.do"
            } else {
                bootbox.alert("系统出错,请检查")
            }
        },
        error: function () {

        }
    })
}