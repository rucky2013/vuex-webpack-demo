import Vue from 'vue'
import guild_zone_index from '../views/guild-zone-index.vue'
import guild_zone_rules from '../views/guild-zone-rules.vue'
import { myStore } from '../js/store'

/*配置路由*/
$$(document).on('pageInit', function(e) {

	const page = e.detail.page;
	const value = myStore._f7Ajax('get',{'uid':myStore.paramter.get('uid'),'token': myStore.paramter.get('token'),'act_id':1},myStore.project.url,'info_data');

	if(page.name === 'guild-zone-index'){

		const guildListPage = new Vue(guild_zone_index);
  		guildListPage.$mount('#guild-zone-index .page-content');
		console.log('guild-zone-index-page');

	}

	if(page.name === 'guild-zone-rules'){
		const guildZonerules = new Vue(guild_zone_rules);
		guildZonerules.$mount('#guild-zone-rules .page-content');
		console.log('guild-zone-rules');
	}

	//错误页面
    if (page.name === 'error-page'){     

    } 
});
 /*初始化*/
 let pageName = myStore.watchHash.get();
 myApp.redictNewPage(pageName,false,false);


