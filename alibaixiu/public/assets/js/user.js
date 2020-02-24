//当表单发生提交表单行为的时候
$("#userForm").on('submit', function() {
    //获取到用户在表单中输入的内容，并将内容格式化成参数字符串
    var formData = $(this).serialize();
    //向服务器端发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            //刷新页面
            location.reload();
        },
        error: function(response) {
            alert(JSON.stringify(response));
        }
    });
    //阻止表单默认提交行为
    return false;
})

//当用户修改和添加图片时 
$('#modifyBox').on('change', '#avatar', function() {
    //获取用户上传的文件 this.files[0],他是一个数组
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: "/upload",
        data: formData,
        //告诉$.ajax不要解析data的值
        processData: false,
        //告诉$.ajax不要设置请求参数的类型
        contentType: false,
        success: function(response) {
            //实现图片预览功能
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
})

//向服务端发送请求，索要用户列表数据
$.ajax({
    type: "get",
    url: '/users',
    success: function(response) {
        //使用磨板引擎将数据与html字符串进行拼接
        var html = template('userTpl', {
            data: response
        });
        //将字符串展示在页面当中
        $('#userBox').html(html);
    }
})

//通过事件委托的方式，为编辑按钮添加事件
$('#userBox').on('click', '.edit', function() {
    //获取被点击用户的id值
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })
})

//为修改表单提交表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    //获取用户在表单中输入的内容
    var formData = $(this).serialize();
    //获取用户要修改的id值
    var id = $(this).attr('data-id');
    //发送请求，修改用户信息
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            //刷新页面
            location.reload();
        }
    });
    //组织默认的表单行为
    return false;
})

//删除用户
$('#userBox').on('click', '.delete', function() {
    if (confirm('您真的要删除用户吗？')) {
        var id = $(this).attr('data-id');

        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})

//获取全选按钮
var selectAll = $('#selectAll');

//获取批量删除按钮
var deleteMany = $('#deleteMany');

//当全选的按钮状态发生改变时
selectAll.on('change', function() {
    //获取到全选按钮当前的状态
    var status = $(this).prop('checked');

    if (status) {
        //显示批量删除按钮
        deleteMany.show();
    } else {
        //隐藏批量删除按钮
        deleteMany.hide();
    };
    //获取所有的用户并将用户的状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked', status);
});

//当用户前面的复选框状态发生改变时
$('#userBox').on('change', '.userStatus', function() {
    //获取所有的用户，过滤出被选中的用户
    //如果被选中用户个数和所有用户个数一致，则全选按钮被选中
    //如果不一致，则不被选中
    var inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
    }

    //如果有选中的复选框大于0，就说明有选中的
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});

//删除被选中用户
deleteMany.on('click', function() {
    var ids = [];
    //获取被选中用户
    var checkedUser = $('#userBox').find('input').filter(':checked');
    //循环复选框，从复选框元素的身上获取data-id属性的值
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    });

    if (confirm('您真的要删除吗')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload();
            }
        });
    }
})