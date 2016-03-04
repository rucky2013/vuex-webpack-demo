// Init App
var myApp = new Framework7({
    tapHold:true, //长按保持
    // Modal Setting
    modalTitle: '提示',
    modalButtonOk: '确定',
    modalButtonCancel: '取消',
    modalPreloaderTitle: '正在载入...',
    //是否开启页面过渡动画
    animatePages: true,
    // notification settting
    notificationCloseOnClick: true, //设置为true之后，点击就可以关闭通知
    notificationTitle: '提示', //所有通知(notifications)的默认标题
    //物理按键回退
    pushState: true, //物理按键回退支持
    swipeBackPage: false, //滑动返回上一页(IOS)
    sortable: false, //排序
    swipeout: false, //滑动删除
    materialPreloaderSvg: '<div class="icon-loading"></div>', //preLoader
    //template 7
    dynamicPageUrl: '{{name}}', //动态内容链接
    template7Pages: true,
    template7Data: {

        'url:page/about.html': {
            title: 'TT语音',
            page_title: '关于TT',
            content: '测试'
        }
    }
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
    domCache: true //内联DOM
});

// Show/hide preloader for remote ajax loaded pages
$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});

// plugins
//init toast
myApp.showToast = function(message){
    var toast = myApp.toast(message, '', {hold : 3000});
    toast.show(message);
};

//init mainView.router
myApp.redictNewPage = function (pageName, animation, history, query){
    mainView.router.load({
        content : '<div id=' + pageName + ' data-page=' + pageName + ' class="page"><div class="page-content"></div></div>',
        animatePages: animation !=null ? animation : true,
        pushState: history !=null ? history : true,
        query: query != null ? query : null
    })
}

//init confirm alert
//myApp.confirmModal = function(description, btn_text, callback) {
//    myApp.modal({
//        title: '提示',
//        text: description,
//        buttons : [
//            {
//                text:
//            }
//        ]
//    })
//}

//webview 恢复后调用方法
myWebview.webviewCallbackWhenRecover = function(){

}
//网络变化时 webview被调用方法
myWebview.webviewCallbackWhenNetworkChange = function (){

}

//进度条通知
myWebview.onGameDownloadProgress = function(parameter){

}

//init game download button
//webview 恢复后调用方法
myWebview.webviewCallbackWhenRecover = function(){
    var isGameInstalled =  myWebview.checkGameInstalled(global.request.gid);
    myApp.updateButtonStatus();
}

//进度条通知
myWebview.onGameDownloadProgress = function(parameter){
    var percent = parameter.toFixed(1);
    var isGameDownloading = myWebview.checkGameDownloading(global.request.gid);
    if(isGameDownloading === 'true'){
        $$("#download-game .progress").attr('style','width:' + percent + '%');
        $$("#download-game .button-text").text(percent + "%，暂停下载");
    }else{
        $$("#download-game .progress").removeAttr("style");
    }
}

//网络变化时
myWebview.webviewCallbackWhenNetworkChange = function(){
    var isGameInstalled =  myWebview.checkGameInstalled(global.request.gid);
    var isGameDownloaded = myWebview.checkGameDownloaded(global.request.gid);
    var isGameDownloading = myWebview.checkGameDownloading(global.request.gid);
    var status = myWebview.checkNetworkStatus();
    if(status === 'UNAVAILABLE' && isGameInstalled === 'false' && isGameDownloading ==='false'){
        myWebview.showToast("网络不可用，下载失败");
        myApp.updateButtonStatus(7);
    }else if(isGameInstalled === 'false' && isGameDownloading ==='true'){
        myApp.updateButtonStatus(6);
    }else{
        myApp.updateButtonStatus();
    }
}

//关注
myWebview.focusAreaRequest = function (){

}

myApp.updateButtonStatus = function(status){

    myWebview.callbackFunction("webviewCallback",[]); //传递在webview 恢复后调用的方法名

    var button = $$('#download-game');
    button.attr("class", "button block-button");
    var places = JSON.parse(localStorage.gameAreaPageData);
    var text;

    var isGameInstalled =  myWebview.checkGameInstalled(global.request.gid);
    var isGameDownloading = myWebview.checkGameDownloading(global.request.gid);
    var isGameDownloaded = myWebview.checkGameDownloaded(global.request.gid); //游戏已下载
    var isGameDownloadExistUrl = places.profile.download_url;
    var isGameDownloadRepeat = myWebview.checkGameDownloadRepeat(global.request.gid);

    //状态检测并执行相关逻辑
    if(!status){
        var status;

        //如果有下载包
        if (isGameDownloadExistUrl !=''){
            if(isGameInstalled === 'true'){
                status = 5;
            }else if(isGameDownloading === 'true'){
                status = 6;
            }else if(isGameDownloaded === 'true'){
                status = 3;
            }else if(isGameInstalled === 'false'){
                status = 3;
            }
        }else{
            if (places.profile.is_follow === 0){
                status = 0;
            }else{
                status = 1;
            }
        }
    }



    if(status === 0){ //未关注
        if( places.profile.focus > 0){
            text = places.profile.focus + "人已关注，我也关注";
        }else{
            text = "关注游戏";
        }
        button.addClass("status-unfocus");
        button.once('click', function (){

            myApp.getUerProfile(); //从app请求刷新用户数据
            myApp.updateButtonStatus(2);

            myWebview.focusAreaRequest();
        });
    }
    else if(status === 1){ //已关注
        text = places.profile.focus + "人已关注";
        button.addClass("status-focused");
    }
    else if(status === 2){ //正在关注
        text = "正在关注中...";
        button.addClass("status-focusing");
    }
    else if(status === 3){ //未下载
        if(isGameDownloadRepeat === 'true'){
            text = "继续下载";
            button.addClass("status-loading");
            button.find(".progress").attr('style','width:' + myWebview.checkGameDownloadProgress(global.request.gid) + '%');
        }else if( places.profile.install_total > 0){
            text = places.profile.install_total + "人已安装，我也安装";
            button.addClass("status-download");
        }else{
            text = "安装游戏";
            button.addClass("status-download");
        }
        //button.addClass("status-download");

        button.once('click', function (){
            //console.log("click vouchers successful");
            if(isInApp){
                var status = myWebview.checkNetworkStatus();
                myWebview.updateUserGameFollow(global.request.gid, global.request.cid); //通知更新客户端关注数据
                myWebview.NetworkStatusChanged("webviewCallbackWhenNetworkChange",[]); //传递在webview 恢复后调用的方法名
                //myWebview.showToast(status);
                if (status === 'MOBILE'){
                    myApp.modal({
                        title: "温馨提示",
                        text: "你可能不在wifi环境中，确定下载吗？",
                        buttons: [
                            {
                                text: '取消',
                                onClick: function () {
                                    myApp.updateButtonStatus(3);
                                }
                            },
                            {
                                text: '确定',
                                color: 'green',
                                onClick: function () {

                                    if(isGameDownloaded === 'true'){
                                        myApp.updateButtonStatus(4);
                                        myWebview.showToast("开始下载，可在【我】->【我的下载】中查看");
                                        myWebview.installGame(global.request.gid);

                                    }else{
                                        myApp.updateButtonStatus(6);
                                        myWebview.showToast("开始下载，可在【我】->【我的下载】中查看");
                                        myWebview.downloadGame(global.request.gid); //下载游戏

                                    }

                                }
                            }
                        ]
                    });
                }else if(status === 'UNAVAILABLE'){
                    myApp.networkErrorProcess();
                }else{

                    if(isGameDownloaded === 'true'){
                        myApp.updateButtonStatus(4);
                        myWebview.showToast("开始下载，可在【我】->【我的下载】中查看");
                        myWebview.installGame(global.request.gid);

                    }else{
                        myApp.updateButtonStatus(6);
                        myWebview.showToast("开始下载，可在【我】->【我的下载】中查看");
                        myWebview.downloadGame(global.request.gid); //下载游戏

                    }
                }
            }else{
                myApp.alert("请在TT语音中浏览");
            }


        });
    }
    else if(status === 4){ //正在安装（下载）
        text = "正在安装";
        button.addClass("status-loading");
    }
    else if(status === 5){ //已安装
        text = "打开游戏";
        button.addClass("status-installed");
        button.once('click', function (){
            myWebview.gameStartById(global.request.gid);
        });

    }else if(status === 6){ //正在下载
        //var progress = myWebview.checkGameDownloadProgress(global.request.gid).toFixed(1) + '%，';
        text = '暂停下载';
        button.addClass("status-loading");

        button.once('click', function (){
            myWebview.CancelDownloadGame(global.request.gid);
            //myWebview.showToast("下载已取消");
            myApp.updateButtonStatus(3);
        });

    }else if(status === 7){ //已下载，未安装
        text = "重试";
        button.addClass("status-retry");

        button.once('click', function (){
            var status = myWebview.checkNetworkStatus();
            if(status === 'UNAVAILABLE'){
                //myWebview.showToast("网络不可用，请检查后重试");
                myApp.networkErrorProcess();
            }else{
                if(isGameDownloaded === 'true'){
                    myApp.updateButtonStatus(4);
                    myWebview.showToast("开始下载，可在【我】->【我的下载】中查看");
                    myWebview.installGame(global.request.gid);
                }else{
                    myApp.updateButtonStatus(6);
                    myWebview.showToast("开始下载，可在【我】->【我的下载】中查看");
                    myWebview.downloadGame(global.request.gid); //下载游戏
                }
            }

        });

    }
    button.find(".button-text").text(text);
}

