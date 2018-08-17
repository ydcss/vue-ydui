<template>
    <yd-layout title="Search">
        <p class="demo-search-title">行内模式：</p>
        <yd-search v-model="value1" :on-submit="submitHandler" :on-cancel="cancelHandler"></yd-search>

        <p class="demo-search-title">全屏模式（带匹配结果）：</p>
        <yd-search :result="result" fullpage v-model="value2" :itemClick="clickHandler" :on-submit="submitHandler" :on-cancel="cancelHandler"></yd-search>

        <p class="demo-search-title">全屏模式（带匹配结果）：</p>
        <yd-search fullpage v-model="value3" :itemClick="clickHandler" :on-submit="submitHandler" :on-cancel="cancelHandler">
            <div>自定义内容{{value3}}</div>
        </yd-search>
    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                value1: '',
                value2: '',
                value3: '',
                result: []
            }
        },

        methods: {
            getResult(val) {
                if (!val) return [];
                return [
                    'Apple', 'Banana', 'Orange', 'Durian', 'Lemon', 'Peach', 'Cherry', 'Berry',
                    'Core', 'Fig', 'Haw', 'Melon', 'Plum', 'Pear', 'Peanut', 'Other'
                ].filter(value => new RegExp(val, 'i').test(value));
            },
            clickHandler(item) {
                this.$dialog.toast({mes: `搜索：${item}`});
            },
            submitHandler(value) {
                this.$dialog.toast({mes: `搜索：${value}`});
            },
            cancelHandler() {
                this.$dialog.toast({mes: '取消搜索回调'});
            }
        },
        watch: {
            value2(val) {
                this.result = this.getResult(val);
            }
        }
    }
</script>
