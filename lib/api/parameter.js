//全局参数
var global = {
    project: {
        projectId : "05", //项目ID
        projectName : "语音球帮助",
        platform: "tt",
        version: "0.1",
        icon : "http://app.52tt.com/assets/images/touch-icon.png"
    },
    cache : {
        key: "tt_content_cache_05"
    },
    status : {
        data :{
            in_app: false //是否在APP中
        },
        methods: {}
    },
    request : {
        data:{
            token: 'token', //token
            gid : 0
        },
        methods: {
            update:{}
        }
    },
    profile : {
        data:{
            uid : 0, //用户ID
            account : "user", //用户账号
            name: "游客", //用户昵称
            level: 1, //用户等级
            diamond : 0, //用户红钻
            head : 'http://app.52tt.com/assets/common/images/default_face_yellow.png', //用户头像
        },
        methods: {}
    }
}
var tmp_global = global;