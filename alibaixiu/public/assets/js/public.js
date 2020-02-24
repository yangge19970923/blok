//处理时间日期格式
function formateDate(date) {
    date = new Date(date);
    var hour = date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
    var minute = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + hour + ':' + minute;
}

//从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    //循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        if (paramsAry[i].split('=')[0] == name) {
            return paramsAry[i].split('=')[1];
        }
    }
    return -1;
}

//向服务器端发送请求，索要随机推荐数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(response) {
        var randomTpl = `
        {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                    <p class="title">{{$value.title}}</p>
                    <p class="reading">阅读({{$value.meta.views}})</p>
                    <div class="pic">
                        <img src="{{$value.thumbnail}}" alt="">
                    </div>
                </a>
            </li>
            {{/each}}
        `;
        var html = template.render(randomTpl, {
            data: response
        });
        $('#randomBox').html(html);
    }
})

//向服务器端发送请求，索要最新评论数据
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(response) {
        var commentTpl = `
        {{each data}}
            <li>
                <a href="javascript:;">
                    <div class="avatar">
                        <img src="{{$value.author.avatar}}" alt="">
                    </div>
                    <div class="txt">
                        <p>
                            <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                        </p>
                        <p>{{$value.content}}</p>
                    </div>
                </a>
            </li>
            {{/each}}
        `;
        var html = template.render(commentTpl, {
            data: response
        })
        $('#commentBox').html(html);

    }
})

//向服务器端发送请求，索要文章列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var navTpl = `
        {{each data}}
            <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `;
        var html = template.render(navTpl, {
            data: response
        });
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
})

//获取到搜索表单，并为其添加搜索表单事件
$('.search form').on('submit', function() {
    //获取到用户在搜索框中输入的关键字
    var keys = $(this).find('.keys').val();

    //跳转到搜索结果页面。并且将用户输入的搜索关键字传递到搜索结果
    location.href = '/search.html?key=' + keys;
    //阻止表单默认事件
    return false;
})