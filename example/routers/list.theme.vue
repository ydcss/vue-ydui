<template>
    <yd-layout>
        <yd-navbar slot="navbar" :title="title">
            <router-link to="/list" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-list :theme="theme">
            <yd-list-item v-for="item in list">
                <img slot="img" :src="theme != 5 ? item.img + '_220x220.jpg' : item.img">
                <span slot="title">{{item.title}}</span>
                <yd-list-other slot="other">
                    <div>
                        <span class="list-price"><em>¥</em>{{item.price}}</span>
                        <span class="list-del-price">¥{{item.w_price}}</span>
                    </div>
                    <div>content</div>
                </yd-list-other>
            </yd-list-item>
        </yd-list>

    </yd-layout>
</template>

<script type="text/babel">
    export default {
        computed: {
            theme() {
                return this.$route.params.id;
            },
            title() {
                return 'Theme' + this.$route.params.id;
            },
            list() {
                const arr = [
                    {img: "http://img1.shikee.com/try/2016/06/23/14381920926024616259.jpg", title: "标题标题标题标题标题", price: 56.23, w_price: 89.36},
                    {img: "http://img1.shikee.com/try/2016/06/21/10172020923917672923.jpg", title: "骆驼男装2016夏装男士短袖T恤 圆领衣服 印花男装体恤 半袖打底衫", price: 56.23, w_price: 89.36},
                    {img: "http://img1.shikee.com/try/2016/06/23/15395220917905380014.jpg", title: "条纹短袖T恤男士韩版衣服大码潮流男装夏季圆领体恤2016新款半袖", price: 56.23, w_price: 89.36},
                    {img: "http://img1.shikee.com/try/2016/06/25/14244120933639105658.jpg", title: "夏季青少年衣服男生潮牌t恤 男士 夏秋学生 日系棉短袖半袖男小衫", price: 56.23, w_price: 89.36},
                    {img: "http://img1.shikee.com/try/2016/06/26/12365720933909085511.jpg", title: "2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服", price: 56.23, w_price: 89.36},
                    {img: "http://img1.shikee.com/try/2016/06/19/09430120929215230041.jpg", title: "男装衣服男夏t恤 男士短袖t恤圆领夏季潮牌宽松原宿风半截袖男", price: 56.23, w_price: 89.36}
                ];

                if (this.$route.params.id == 3) {
                    const imgs = [
                        "http://img1.shikee.com/lottery/2016/06/24/15421120925701980627.jpg",
                        "http://img1.shikee.com/lottery/2016/06/14/20403320925701986993.jpg",
                        "http://img1.shikee.com/lottery/2016/06/12/13411720925701982313.jpg",
                        "http://img1.shikee.com/lottery/2016/06/12/12460220925701986563.jpg",
                        "http://img1.shikee.com/lottery/2016/06/08/23124920925701986316.jpg",
                        "http://img1.shikee.com/lottery/2016/06/07/23270520925701982715.jpg"
                    ];
                    arr.forEach(function (item, key) {
                        item.img = imgs[key];
                    });
                }

                return arr;
            }
        }
    }
</script>
