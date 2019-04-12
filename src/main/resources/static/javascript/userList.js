$(function () {
    initdatagrid();
    addData();
    normal2ajax();
    $("#dialog_add").dialog("close");
    $("#dialog_role").dialog("close");
})
//上传头像
$("#uploadImg").uploadify({
    //插件自带  不可忽略的参数flash插件
    "swf": "/js/uploadify/uploadify.swf",
    //前台请求后台的url 不可忽略的参数
    "uploader": "/user/uploadUserImg.do",
    //给div的进度条加背景 不可忽略
    "queueID": "fileQueue",
    //上传文件文件名 跟file标签 name值 保持一致
    "fileObjName": "image",
    //给上传按钮设置文字
    "buttonText": "上传头像",
    //设置文件是否自动上传
    "auto": true,
    //可以同时选择多个文件 默认为true  不可忽略
    "multi": true,
    //上传后队列是否消失
    "removeCompleted": true,
    //允许上传的文件后缀
    "fileExt": "*.jpg;*.gif;*.png",
    //
    "cancelImg": "/js/uploadify/uploadify-cancel.png",
    //队列消失时间
    "removeTimeout": 1,
    //上传文件的个数，项目中一共可以上传文件的个数
    "uploadLimit": -1,
    "fileTypeExts": "*.jpg;*.png",
    //成功回调函数 file：文件对象。data后台输出数据
    "onUploadSuccess": function (file, data, response) {
        //alert(file.name+" 路径："+data.imagePath)
        var imgurl = "http://<%=request.getServerName()%>:<%=request.getServerPort()%>/" + eval(data);
        //图片回显， 预览
        $("#add_img").attr("src", imgurl)
        // 文本框 回填
        $("#hideImg").val(imgurl);
    }

});

//初始化表格
function initdatagrid() {
    $("#show").datagrid({
        url: "/user/queryUsers",
        toolbar: "#tb",
        pagination: true,
        pageList: [1, 3, 5],
        pageSize: 3,
        checkOnSelect: false,
        /* 奇数偶数行不同颜色 start */
        rowStyler: function (index, row) {
            if (index % 2 == 0) {
                return "background-color:#6293BB;color:#fff;";
            } else {
                return "background-color:#ccffff;color:red;";
            }
        },
        /* 奇数偶数行不同颜色 end */
        columns: [[
            {field: "ck", checkbox: true},
            {field: "id", title: "用户编号", width: 100, align: "right"},
            {field: "name", title: "用户姓名", width: 100, align: "right"},
            {field: "loginNumber", title: "用户账号", width: 100, align: "right"},
            {field: "password", title: "用户密码", width: 100, align: "right"},
            {
                field: "sex", title: "用户性别", width: 100, align: "r,ight", formatter: function (value, row, index) {
                    return value == 1 ? "男" : "女";
                }
            },
            {field: "age", title: "用户年龄", width: 100, align: "right"},
            {field: "roleName", title: "角色", width: 200, align: "right"},
            {field: "birthday", title: "用户生日", width: 100, align: "right"},
            {field: "email", title: "用户邮箱", width: 100, align: "right"},
            {field: "detail", title: "detail", width: 100, align: "right"},
            {
                field: "headImg", title: "头像", formatter: function (value, row, index) {
                    return "<img width='50px' height='50px' src='" + value + "'>";
                }
            },
            {
                field: "provinceName", title: "地址", formatter: function (value, row, index) {
                    return row.regionName + "-" + row.cityName;
                }
            },
            {
                field: "cz", title: "操作", width: 100, align: "right", formatter: function (value, row, index) {
                    var content = "<a href='javascript:void(0)' onclick=updateUserById(" + row.id + ")>修改</a>";
                    content += " |  <a href='javascript:void(0)' onclick=deleteUserById(" + row.id + ",'" + row.name + "')>删除</a>";
                    content += " |<a href='javascript:void(0)' onclick=clearSession(" + row.id + ") >角色</a>";
                    return content;
                }
            }
        ]]
    });
}


function updateUserRoleById(userId) {
    $.ajax({
        url: "/role/assignRole",
        data: {userId: userId},
        success: function (result) {
            if (result) {
                $("#dialog_role").dialog("open");
            } else {
                alert("ajax访问失败!!!请查看控制台!!!");
            }
        },
        error: function () {
            //请求失败时
        }
    })

}


function normal2ajax() {
    $("#add_form").form({
        url: "/user/addUser",
        onSubmit: function () {
        },
        success: function (data) {
            if (data == 1) {
                alert("不能添加重复的编号");
            } else {
                closedSubmitData();
                $("#dialog_add").dialog("close");
                $("#show").datagrid("reload");
            }

        }
    });
}

function submitData() {//进行提交表单
    $("#add_form").form("submit")
}

function addData() {
    $("#dialog_add").dialog("open");
    closedSubmitData();
    intoRole();
    initDept();
    initRegion();
}

function closedSubmitData() {
    $("#dialog_add").form("clear");
}


function deleteUserById(id, username) {
    $.messager.confirm("确认", "您确认想要删除" + username + "这条记录吗？", function (r) {
        if (r) {//点击确认
            deleteItems(id);
        }
    });
}

function deleteItems(id) {
    $.ajax({
        url: "/user/deleteUserById",
        type: "POST",
        data: {
            id: id
        },
        success: function (pageUtil) {
            /* deleteItems start */
            $.messager.show({
                title: "删除",
                msg: "删除成功",
                timeout: 2000,
                showType: "slide"
            });
            $("#show").datagrid("reload");
            /* deleteItems end */
        },
        error: function (pageUtil) {
            if (pageUtil == 0) {
                alert("代码错误");
            } else {
                alert("删除失败");
            }
        }
    });

}

//打开修改弹框
function updateUserById(userId) {
    $.ajax({
        url: "/user/findUserById",
        type: "post",
        data: {"userId": userId},
        success: function (result) {
            intoRole();
            addData();
            $("#add_form").form("load", result);
            $("#add_img").attr("src", data.headImg);

        }
    })

}

//初始化省的数据
function initRegion() {
    $("#region").combobox({
        url: "/user/findArea?pid=0",
        textField: "name",
        valueField: "id",
        onChange: function (newValue, oldValue) {
            $("#city").combobox({
                url: "/user/findArea.do?pid=" + newValue,
                textField: "name",
                valueField: "id"
            })
        }
    })
}

//初始化部门数据
function initDept() {
    $("#dept").combotree({
        url: "/user/findDept",
        lines: true,
        onClick: function (node) {
            if (node.children != null && node.children.length > 0) {
                $("#dept").combotree("setValue", "");
                $.messager.alert("提示", "不能选择父节点", "info");
            }
        }
    })
}

/* start */

//给用户设置角色
function addRole() {


    var param = {userId: "${userId}"};


    if ($("#leftSelect :selected").size() == 0) {

        alert("至少选择一个角色")
        return;
    }

    $.each($("#leftSelect :selected"), function (index, obj) {

        param["roid[" + index + "]"] = obj.value;

    })

    var ii = 0;
    $.ajax({
        url: "/role/addRoleByUserId",
        type: "POST",
        data: param,
        cache: false,//false是不缓存，true为缓存
        beforeSend: function () {
            ii = layer.load(2);
        },
        success: function (result) {
            $("#rightSelect").append($("#leftSelect :selected"))
        },
        error: function () {
            alert("ajax访问失败了,查看控制台");

        }, complete: function () {
            layer.close(ii)
        }
    });

}

function removeRole() {

    var param = {userId: "${userId}"};

    if ($("#rightSelect :selected").size() == 0) {

        alert("至少选择一个角色")

        return;
    }

    $.each($("#rightSelect :selected"), function (index, obj) {

        param["roid[" + index + "]"] = $(obj).val();

    })

    $.ajax({
        url: "/role/removeRoleByUserId",
        type: "POST",
        data: param,
        cache: false,//false是不缓存，true为缓存
        success: function (result) {
            //location.reload()
            //判断数据库的数据确实已经改变了 再改变前台的数据
            $("#leftSelect").append($("#rightSelect :selected"))
        },
        error: function () {
            alert("ajax访问失败了,查看控制台");
        }
    });
}

/* end */

function clearSession(userId) {

    $.ajax({
        url: "/role/clearSession",
        cache: false,//false是不缓存，true为缓存
        async: true,//true为异步，false为同步
        success: function (result) {
            if (result) {
                updateUserRoleById(userId);
            } else {
                alert("ajax访问失败!!!")
            }
        },
        error: function () {
            //请求失败时
        }
    })


}

//角色
function intoRole() {
    $("#roleId").combobox({
        url: "/user/queryRole",
        valueField: "id",
        textField: "name",
        multiple: true
    })
}