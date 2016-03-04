
export const myStore = {
	// http://192.168.9.230:8089 
	// "http://api.52tt.com"
    project: {
        url :"http://api.52tt.com/act/guild_popularity", //配置接口路径
        joinUrl : "http://api.52tt.com/act/guild_popularity_signup", //配置报名接口路径
     },
     _f7Ajax : (method,parameter,url,locatl,cb) => {
		// body...格式为 {"uid": global.profile.uid,"token": global.request.token,"debug": global.request.debug,"callback": 1}
		//methond 为get,post等
		parameter.callback = 1;
	    parameter.debug = 0;
	    // myApp.alert(JSON.stringify(parameter));
	    myApp.showIndicator();
		var _this = this;
		$$.ajax({
			method: method,
			async: true,
			url: url,
			crossDomain: true,
			dataType: 'json',
			timeout: 2 * 1000,
			data: parameter,
	        success: (d) => {
	        	if(typeof d == 'string'){
	        		d = JSON.parse(d);
	        	}
	        	if (d.code === 0) {
	        	 	if(locatl){
	        	 		/* 缓存数据 */
		        		myStore.storage.set(locatl,d.data);
		        	}
		        }else{
		        	myApp.alert(d.code+":"+d.msg);
		        }
	        	if(cb) cb.call();
	        	myApp.hideIndicator();
	        },
	        error : (d)=> {
            	myApp.hideIndicator();
	        	if(typeof d == 'string'){
	        		d = JSON.parse(d);
	        	}
	        }
		})
	},
	//获取本地存储的数据,不需要变换数据类型
	storage: {
        get:(key)  => {
            var value = localStorage.getItem(key);
            return (/^(\{|\[).*(\}|\])$/).test(value) ? JSON.parse(value) : value;
        },
        set:(key, value)  => {
            var serializable = $$.isArray(value),
                storeValue = serializable ? value : JSON.stringify(value) ;
            localStorage.setItem(key, storeValue);
        },
        remove:(key)  => {
            localStorage.removeItem(key);
        },
        removeAll:()  => {
            localStorage.clear();
        }
    },
    //匹配hash返回页面名称
    watchHash:{
    	get:(key) =>{
    		var hash = window.location.hash;
    		if(hash.indexOf('guild-zone-rules') > -1){
    			return 'guild-zone-rules'
    		}else{
    			return 'guild-zone-index'
    		}
    	}
    },
    //获取全局的token,uid,gid等
    paramter:{
    	get:(key)=>{
    		if(typeof(key) !== undefined || key !=="undefined" || key){
    			if(_.isEmpty(key)) return;
    			switch(key){
    				case 'uid':
						if (tmp_global.profile.data.uid === 0 || tmp_global.profile.data.uid === 1){
						    if ( $$.parseUrlQuery(window.location.href).uid ) {
						        tmp_global.profile.data.uid = $$.parseUrlQuery(window.location.href).uid*1;
						    	} else {
						    }
						}
					return tmp_global.profile.data.uid ; break;
					case 'token':
						if (tmp_global.request.data.token === 'token'){
						    tmp_global.request.methods.update
						}
					return tmp_global.request.data.token; break;
					case 'gid':
						if(tmp_global.request.data.gid === 0){
							if ( $$.parseUrlQuery(window.location.href).gid ) {
						        tmp_global.request.data.gid = $$.parseUrlQuery(window.location.href).gid*1;
						    	} else {
						    }
						}
					return tmp_global.request.data.gid ; break ;
					default : break;
    			}
    		}
    	}
    }
}