var app = new Vue({
    el:'#app',
    data:{
        // city为input所输入即为接口参数
        city:'',
        // cur_city为在提交表单后所显示当前城市即为当前city值
        // cur_city:'南昌',
        // // lists[]数组接受来自接口不同城市的每日天气情况
        lists:[],
        // hotLists[]数组为热门搜索城市
        hotLists:['深圳','北京','上海'],
        // tip对应接口不同城市今日的gammao值
        tip:''
    },
    methods:{
        // mounted:function(){
        //     this.city = '南昌';
        //     getWeather();
        // },
        // getWeather函数用于获取城市天气信息并显示
        getWeather:function(){
            // 定义that变量储存this指向的全局
            var that = this;
            // axios方法获取接口信息，input输入值this.city作为接口的参数
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city="+this.city)
            .then(function(response){
                // // 将全局中的city值赋值给全局变量cur_city
                // that.cur_city = that.city;
                // // 将接口响应的内容储存在全局中的变量lists中
                that.lists = response.data.data.forecast;
                // 将接口相应的ganmao值储存在全局中的变量tip中
                that.tip = response.data.data.ganmao;
            },function(err){
                console.log(err)
            })
        },

        // getHotWeather函数用于热门城市点击后显示该热门城市的天气信息
        getHotWeather:function(index){
            var that = this;
            // 此时传入的参数为全局变量hotLists中的某个成员，某个用index代替
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city="+this.hotLists[index] )
            .then(function(response){
                // that.cur_city = that.city;
                // console.log(that.cur_city);
                that.city = that.hotLists[index];
                that.lists = response.data.data.forecast;
                that.tip = response.data.data.ganmao;
            },function(err){
                console.log(err)
            })
        }
    }
})