//向服务器端发送请求，获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response) {
        console.log(response);
        var html = template('commentsTpl', response);
        // console.log(html);
        $('#commentsBox').html(html);
        var pageHTML = template('pageTpl', response);
        $('#pageBox').html(pageHTML);
    }
})

//实现分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(response) {
            console.log(response);
            var html = template('commentsTpl', response);
            // console.log(html);
            $('#commentsBox').html(html);
            var pageHTML = template('pageTpl', response);
            $('#pageBox').html(pageHTML);
        }
    })
}

$("#commentsBox").on('click', '.status', function() {
    //获取当前评论的状态
    var status = $(this).attr('data-status');
    //获取当前要修改的评论id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: { state: status == 0 ? 1 : 0 },
        success: function() {
            location.reload();
        }
    })
})

//点击删除时
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('您真的要执行删除操作吗？')) {
        //获取要删除的id值
        var id = $(this).attr('data-id');
        //向服务端请求删除操作
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function() {
                location.reload();
            }
        })
    }

})