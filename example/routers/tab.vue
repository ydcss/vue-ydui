<template>
    <yd-layout title="Tab">
        <div class="demo-tab-title">普通使用</div>
        <yd-tab>
            <yd-tab-panel label="选项一">土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。</yd-tab-panel>
            <yd-tab-panel label="选项二">我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。</yd-tab-panel>
            <yd-tab-panel label="选项三">时间是一切财富中最宝贵的财富。</yd-tab-panel>
            <yd-tab-panel label="选项四">真理惟一可靠的标准就是永远自相符合。</yd-tab-panel>
        </yd-tab>

        <div class="demo-tab-title">设置初始，手动切换</div>
        <yd-tab v-model="tab1">
            <yd-tab-panel label="选项一">111111</yd-tab-panel>
            <yd-tab-panel label="选项二">222222 - 【设置初始激活项】</yd-tab-panel>
            <yd-tab-panel label="选项三">333333</yd-tab-panel>
            <yd-tab-panel label="选项四">444444</yd-tab-panel>
        </yd-tab>

        <yd-button-group>
            <yd-button size="large" @click.native="tab1 = 3" type="warning" style="height: 40px;font-size: 15px;">go to 3</yd-button>
        </yd-button-group>

        <div class="demo-tab-title">多个选项卡，左右滑动</div>
        <yd-tab horizontal-scroll>
            <yd-tab-panel label="选项一">111111</yd-tab-panel>
            <yd-tab-panel label="选项二">222222</yd-tab-panel>
            <yd-tab-panel label="选项三">333333</yd-tab-panel>
            <yd-tab-panel label="选项四">444444</yd-tab-panel>
            <yd-tab-panel label="选项五">555555</yd-tab-panel>
            <yd-tab-panel label="选项六">666666</yd-tab-panel>
            <yd-tab-panel label="选项七">777777</yd-tab-panel>
            <yd-tab-panel label="选项八">888888</yd-tab-panel>
        </yd-tab>

        <div class="demo-tab-title">异步获取数据</div>
        <yd-tab v-model="tab2" :callback="fn" :prevent-default="false" :item-click="itemClick">
            <yd-tab-panel v-for="item in items" :label="item.label">{{item.content}}</yd-tab-panel>
        </yd-tab>

        <div class="demo-tab-title">添加标识</div>
        <yd-tab>
            <yd-tab-panel label="选项一">aaaaa</yd-tab-panel>
            <yd-tab-panel label="选项二" badge="2">bbbbb</yd-tab-panel>
            <yd-tab-panel label="选项三" dot>cccc</yd-tab-panel>
            <yd-tab-panel label="选项四">dddd</yd-tab-panel>
        </yd-tab>

        <div class="demo-tab-title">自定义外观</div>
        <yd-tab bg-color="#F00" color="#FFF" border-color="#000" active-color="#000" height="1.2rem" font-size=".36rem">
            <yd-tab-panel label="选项一">aaaaa</yd-tab-panel>
            <yd-tab-panel label="选项二">bbbbb</yd-tab-panel>
            <yd-tab-panel label="选项三">cccc</yd-tab-panel>
        </yd-tab>
    </yd-layout>
</template>

<script>
    export default {
        data() {
            return {
                tab1: 1,
                tab2: 0,
                items: [
                    {label: '1111', content: 'aaaaaaaaaaa'},
                    {label: '2222', content: 'bbbbbbbbbbb'},
                    {label: '3333', content: 'ccccccccccc'},
                    {label: '4444', content: 'ddddddddddd'}
                ]
            }
        },
        methods: {
            fn(label, key) {
                console.log(label, key);
            },
            itemClick(key) {
                this.$dialog.loading.open('数据加载中');
                setTimeout(() => {
                    this.tab2 = key;
                    this.$dialog.loading.close();
                    this.items[key].content = '新内容【key:' + key + '】新内容_' + new Date().getTime();
                }, 1000);
            }
        }
    }
</script>
