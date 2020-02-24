$("#logout").on('click', function() {
    //cofirm 返回值是true和false 
    var isConfirm = confirm('您真的要退出吗');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(response) {
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败');
            }
        })
    }
});

//处理时间日期格式
function formateDate(date) {
    date = new Date(date);
    var hour = date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
    var minute = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + hour + ':' + minute;
}

//向服务器端发送请求，索要用户登录信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {

        $('.avatar').attr('src', response.avatar);
        $('.profile .name').html(response.nickName);
    }
})