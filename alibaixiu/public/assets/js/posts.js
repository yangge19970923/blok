//向服务器发送请求，huoqu文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {

        var html = template('postsTpl', {
            data: response
        });
        $('#postsBox').html(html);
        var page = template('pageTpl', response);
        $('#page').html(page);
    }
});

//处理日期时间格式
function formateDate(date) {
    date = new Date(date);
    var hour = date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
    var minute = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + hour + ':' + minute;
}

function changePage(page) {
    //向服务器发送请求，huoqu文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(response) {
            var html = template('postsTpl', {
                data: response
            });
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
}

//向服务器端发送请求，索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {

        var html = template('categoryTpl', {
            data: response
        });
        $('#categoryBox').html(html);
    }
})

//当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function() {
    //获取到管理员选择的
    var formData = $(this).serialize();
    //向服务器端发送数据，根据条件索要文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(response) {
            var html = template('postsTpl', {
                data: response
            });
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
    //阻止表单默认请求
    return false;
})

//当用户点击删除按钮时i
$('#postsBox').on('click', '.delete', function() {
    if (confirm('您真的要删除吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload();
            }
        })
    }
    //阻止默认事件
    return false;
});