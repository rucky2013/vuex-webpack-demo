//modal组件
//分享当前页面
//parameters = {title, description, icon, url}， callback: 分享触发时
myApp.shareCurrentPage = function(parameter, callback){
    //初始化分享弹框按钮模板
    var str = myWebview.checkAppInstalled("Wechat") === "true" ? '<div class="share-button col-25 icon-weixin" data-share-type="WechatMoments">微信朋友圈</div>' : '<div class="col-25"></div>';
    var html = '<div class="content-block">' +
        '<div class="row">' +
        '<div class="share-button col-25 icon-qzone" data-share-type="QZone">QQ空间</div>' +
        str +
        '<div class="col-25"></div>' +
        '<div class="col-25"></div>' +
        '</div>' +
        '</div>';
    //初始化按钮
    var buttons = [
        {
            text: '分享到',
            label: true,
            color: 'green'
        },
        {
            text: html,
            label: true,
        },
        {
            text: '取消',
            color: 'gray'
        },
    ];

    //调用分享弹框
    myApp.actions(buttons);

    //绑定点击分享js-api
    $$('.share-button').on('click', function () {
        //回调
        if(callback) callback();
        //关闭modal
        myApp.closeModal();
        //初始化对象
        var shareInfo = {
            "share_type": $$(this).data("share-type"),
            "title": parameter.title, //标题
            "content": parameter.description, //分享内容
            "imageUrl" : parameter.icon , //icon地址
            "url": parameter.url, //分享页地址
        };
        myWebview.share(JSON.stringify(shareInfo)); //分享API
    });
}