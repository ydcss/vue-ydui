<template>
    <yd-pullrefresh :callback="type==0?loadListCallback:loadList" ref="pullrefreshDemo">

        <yd-list theme="4">
            <yd-list-item v-for="item, key in list" :key="key">
                <img slot="img" :src="item.img">
                <span slot="title">{{item.title}}</span>
                <yd-list-other slot="other">
                    <div>
                        <span class="list-price"><em>¥</em>{{item.marketprice}}</span>
                        <span class="list-del-price">¥{{item.productprice}}</span>
                    </div>
                    <div>content</div>
                </yd-list-other>
            </yd-list-item>
        </yd-list>
        <div class="tab-btn">
            <button :class='{active:type==1}' @click="typeChange(1)">Promise</button>
            <button :class='{active:type==0}' @click="typeChange(0)">Callback</button>
        </div>
    </yd-pullrefresh>
</template>
<style>
    .tab-btn{
        position: fixed;
        bottom: 10px;
        right:10px;
        z-index: 100;
    }
    .tab-btn>button{
        padding: 10px 15px;
        border: none;
        background-color:#7cc9ff ;
        color:#ffffff;
        box-shadow:0 0 5px 2px #B7D0E1;
    }
    .tab-btn>button.active{
        background-color: #e95a4e;
    }
</style>
<script type="text/babel">
    export default {
        data() {
            return {
                type:0,
                page: 1,
                list: []
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            init(){
                this.$set(this,'page',1);
                this.$set(this,'list',[
                    {
                        img: "http://img1.shikee.com/try/2016/06/23/14381920926024616259.jpg",
                        title: "标题标题标题标题标题",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/21/10172020923917672923.jpg",
                        title: "骆驼男装2016夏装男士短袖T恤 圆领衣服 印花男装体恤 半袖打底衫",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/23/15395220917905380014.jpg",
                        title: "条纹短袖T恤男士韩版衣服大码潮流男装夏季圆领体恤2016新款半袖",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/25/14244120933639105658.jpg",
                        title: "夏季青少年衣服男生潮牌t恤 男士 夏秋学生 日系棉短袖半袖男小衫",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/26/12365720933909085511.jpg",
                        title: "2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/19/09430120929215230041.jpg",
                        title: "男装衣服男夏t恤 男士短袖t恤圆领夏季潮牌宽松原宿风半截袖男",
                        marketprice: 56.23,
                        productprice: 89.36
                    }
                ])
            },
            typeChange(type){
                this.init();
                this.$set(this,'type',type);
            },
            async loadList() {
                const url = 'http://list.ydui.org/getdata.php';
                console.log(this.page);
                let response = await this.$http.jsonp(url, {params: {type: 'pulldown', page: this.page}});
                const _list = response.body;

                this.list = [..._list, ...this.list];

                this.$dialog.toast({
                    mes: _list.length > 0 ? '为您更新了' + _list.length + '条内容' : '已是最新内容'
                });

                this.page++;

                return true
            },
            loadListCallback() {
                const url = 'http://list.ydui.org/getdata.php';
                console.log(this.page);
                this.$http.jsonp(url, {params: {type: 'pulldown', page: this.page}}).then((response)=>{
                    const _list = response.body;

                    this.list = [..._list, ...this.list];

                    this.$dialog.toast({
                        mes: _list.length > 0 ? '为您更新了' + _list.length + '条内容' : '已是最新内容'
                    });

                    this.page++;

                    this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
                });
            }
        }
    }
</script>
