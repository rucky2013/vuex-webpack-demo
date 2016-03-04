myApp.requestApi = function (url, parameter, success){
    parameter.callback = 1;
    parameter.debug = 0;
    myApp.showIndicator();
    $$.ajax({
        method: "get",
        async: true,
        url: url,
        crossDomain: true,
        dataType: 'json',
        timeout: 30 * 1000,
        data: parameter,
        success: function (data) {
            myApp.hideIndicator();
            if (data.code === 0) {
                if(success) success(data);
            }else{
                myApp.alert(data.code + " " + data.msg);
            }
        },
        error: function () {
            myApp.hideIndicator();
            myApp.networkErrorProcess();
        }
    });
}

myApp.networkErrorProcess = function(){

}