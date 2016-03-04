//确认web是否在APP中
var isInApp = function webIsInApp(){
    try{
        TTJSBridge.invoke("operate", "isInApp");
        return true;
    }catch(e){
        return false;
    }
}

/*
 TT JS-API
 */
function webViewApi(){
    return this;
}

webViewApi.prototype = {
    //获取profile
    getAppData: function( methods){
        var dataSet = TTJSBridge.invoke("data", methods);
        return dataSet;
    },
    //更新用户红钻
    updateUserDiamond: function( parameters){
        if(isInApp){
            try{
                TTJSBridge.invoke("data", "updateMyRedDiamond" , parameters);
            }catch(e){
                webErrorReport('apiError', 'Update user diamond failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //更新关注缓存
    updateUserGameFollow: function(gid, cid){
        if(isInApp){
            try{
                TTJSBridge.invoke("gamearea", "updateAppGameFollow", '"'+ gid +','+ cid +'"');
            }catch(e){
                webErrorReport('apiError', 'Update user game follow status failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //获取活动标题
    getActiveTitle: function(){
        var dataSet = TTJSBridge.invoke("ui", "getActivityTitle");
        return dataSet ;
    },
    //更新navbar title
    setNavbarTitle: function( parameters){
        if(isInApp){
            try{
                TTJSBridge.invoke( "ui", "setCurrentPageTitle", '{"title":"' + parameters + '"}');
            }catch(e){
                webErrorReport('apiError', 'Update navbar title failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }

    },
    //更新navbar button
    setNavbarButton: function(){

        return {
            showButton:function(){
                if(isInApp){
                    try{
                        TTJSBridge.invoke("ui", "setRightTextVisibility", true);
                    }catch(e){
                        webErrorReport('apiError', 'Navbar button is not display - ' + e.name + ": " + e.message);
                    }
                }
                else{
                    notInAppProcess();
                }
            },
            hideButton:function(){

                if(isInApp){
                    try{
                        TTJSBridge.invoke("ui", "setRightTextVisibility", false);
                    }catch(e){
                        webErrorReport('apiError', 'Hide navbar button failed - ' + e.name + ": " + e.message);
                    }
                }
                else{
                    notInAppProcess();
                }
            },
            setButtonText:function(parameters){

                if(isInApp){
                    try{
                        TTJSBridge.invoke("ui", "updateRightText", parameters);
                    }catch(e){
                        webErrorReport('apiError', 'Set navbar button text failed - ' + e.name + ": " + e.message);
                    }
                }
                else{
                    notInAppProcess();
                }
            },
            setButtonFunction:function(method){

                if(isInApp){
                    try{
                        TTJSBridge.invoke("ui", "setRightTextRunMethod", '{"method" : ' + method +  '}');
                    }catch(e){
                        webErrorReport('apiError', 'Method of navbar button failed - ' + e.name + ": " + e.message);
                    }
                }
                else{
                    notInAppProcess();
                }
            }
        }

    },
    //分享: {"share_type":"分享类型(qq: "QQ";qq空间:"QZone";微信:"Wechat", 微信朋友圈:"WechatMoments")","title":"分享标题", "content":"分享内容", "url":"分享url"}
    share: function(parameters){

        if(isInApp){
            try{
                TTJSBridge.invoke("ui", "share",parameters);
            }catch(e){
                webErrorReport('apiError', 'Share failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //callbackModal
    callbackModal: function(method, parameters){

        if(isInApp){
            try{
                TTJSBridge.invoke("ui", "setInvokeMethod", '{"type" : 1, "callback" : {"method" : "' + method + '", "params" : ["'+ parameters +'"]}}');
            }catch(e){
                webErrorReport('apiError', 'Share callback failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //web view 恢复时
    callbackFunction: function(method, parameters){

        if(isInApp){
            try{
                TTJSBridge.invoke("operate", "onResumeInvokeMethod", '{"type" : 1, "callback" : {"method" : "' + method + '", "params" : ["'+ parameters +'"]}}');
            }catch(e){
                webErrorReport('apiError', 'callback failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //邀请好友
    invitation: function(){

        if(isInApp){
            try{
                TTJSBridge.invoke("nav", "inviteUser");
            }catch(e){
                webErrorReport('apiError', 'Method of invite friend failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //APP导航
    appNav: function(parameters){

        if(isInApp){
            try{
                //window.WebViewJavascriptBridge.call(parameters);
                TTJSBridge.invoke("operate", "jump", parameters);
            }catch(e){
                webErrorReport('apiError', 'App navigation failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //复制内容
    copyContent: function(parameters){

        if(isInApp){
            try{
                TTJSBridge.invoke("operate", "copy", parameters);
            }catch(e){
                webErrorReport('apiError', 'Copy to clipboard failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    checkAppInstalled : function (parameters){
        if(isInApp){
            try{
                var dataSet = TTJSBridge.invoke("operate", "checkInstallApp", parameters);
                return dataSet;
            }catch(e){
                webErrorReport('apiError', 'Check app install failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //检查游戏是否安装
    checkGameInstalled : function (parameters){
        if(isInApp){
            try{
                var dataSet = TTJSBridge.invoke("gamearea", "isGameInstall", parameters);
                return dataSet;
            }catch(e){
                webErrorReport('apiError', 'Check game install failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //检查游戏是否下载了
    checkGameDownloaded : function (parameters){
        if(isInApp){
            try{
                var dataSet = TTJSBridge.invoke("gamearea", "isGameDownloaded", parameters);
                return dataSet;
            }catch(e){
                webErrorReport('apiError', 'Check game downloaded failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //检查游戏是否正在下载
    checkGameDownloading :function (parameters){
        if(isInApp){
            try{
                var dataSet = TTJSBridge.invoke("gamearea", "isGameDownloading", parameters);
                return dataSet;
            }catch(e){
                webErrorReport('apiError', 'Check game downloading failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //检查游戏是否可以重试
    checkGameDownloadRepeat :function (parameters){
        if(isInApp){
            try{
                var dataSet = TTJSBridge.invoke("gamearea", "isGameDownloadrepeat", parameters);
                return dataSet;
            }catch(e){
                webErrorReport('apiError', 'Check game downloading failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //检查游戏下载进度
    checkGameDownloadProgress :function (parameters){
        if(isInApp){
            try{
                var dataSet = TTJSBridge.invoke("gamearea", "getGameDownloadProgress", parameters);
                return dataSet;
            }catch(e){
                webErrorReport('apiError', 'Check game download progress failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //检查网络状态
    checkNetworkStatus : function (){
        if(isInApp){
            try{
                var dataSet = TTJSBridge.invoke("operate", "getNetworkState");
                return dataSet;
            }catch(e){
                webErrorReport('apiError', 'Check network status failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //网络状态变化时
    NetworkStatusChanged : function (method, parameters){
        if(isInApp){
            try{
                TTJSBridge.invoke("operate", "initiativeInvokeMethod", '{"type" : 1, "callback" : {"method" : "' + method + '", "params" : ["'+ parameters +'"]}}');
            }catch(e){
                webErrorReport('apiError', 'Network status changed failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    downloadGame : function (parameters){
        if(isInApp){
            try{
                TTJSBridge.invoke("operate", "download", parameters);
            }catch(e){
                webErrorReport('apiError', 'Download game failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //取消下载
    CancelDownloadGame : function (parameters){
        if(isInApp){
            try{
                TTJSBridge.invoke("gamearea", "cancelDownloadGame", parameters);
            }catch(e){
                webErrorReport('apiError', 'Cancel download game failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //安装游戏
    installGame : function (parameters){
        if(isInApp){
            try{
                TTJSBridge.invoke("gamearea", "installGame", parameters);
            }catch(e){
                webErrorReport('apiError', 'Cancel download game failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    gameStartById : function (parameters){
        if(isInApp){
            try{
                TTJSBridge.invoke("gamearea", "startGameById", parameters);
            }catch(e){
                webErrorReport('apiError', 'Game start failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    showToast : function (parameters) {
        if(isInApp){
            try{
                TTJSBridge.invoke("operate", "showToast" , parameters);
            }catch(e){
                webErrorReport('apiError', 'Show toast failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    setFullScreen: function (parameters){
        if(isInApp){
            try{
                TTJSBridge.invoke("ui", "enterfullscreen", parameters);
            }catch(e){
                webErrorReport('apiError', 'Set full screen failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    videoPlayer: function (parameters){
        if(isInApp){
            try{
                TTJSBridge.invoke("operate", "playVideo",parameters);
            }catch(e){
                webErrorReport('apiError', 'Set full screen failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //去设置页面
    toAppSetting: function (){
        if(isInApp){
            try{
                TTJSBridge.invoke("nav", "toSetting");
            }catch(e){
                webErrorReport('apiError', 'Go to app setting failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //去设置页面小米神隐模式
    toMiuiHideMode: function (){
        if(isInApp){
            try{
                TTJSBridge.invoke("nav", "toMIUIHideMode");
            }catch(e){
                webErrorReport('apiError', 'Go to miui hide mode failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    },
    //去其他设置
    toOtherAppSetting: function (parameters){
        if(isInApp){
            try{
                TTJSBridge.invoke("nav", "toOtherApp", parameters);
            }catch(e){
                webErrorReport('apiError', 'Go to other app setting failed - ' + e.name + ": " + e.message);
            }
        }
        else{
            notInAppProcess();
        }
    }
}

var myWebview = new webViewApi();

/* ===== 定义不在TT中打开网页的场景 ===== */
function notInAppProcess(){
    //myApp.alert("请在TT语音中打开~");
}

/* ===== update request token ===== */
function updateRequestToken() {
    try{
        return myWebview.getAppData("getToken");
    }catch(e){
        webErrorReport('apiError', 'uToken获取失败 - ' + e.name + ": " + e.message);
    }
}

//set navbar button
//button: 按钮文案，callback: 执行方法名
myWebview.setShareButton = function(button, callback){
    myWebview.setNavbarButton().setButtonText(button);
    myWebview.setNavbarButton().showButton();
    myWebview.setNavbarButton().setButtonFunction(callback);
}
