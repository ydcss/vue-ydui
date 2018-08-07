<template>
    <yd-layout title="ScrollNav">

        <yd-scrollnav>
            <yd-scrollnav-panel :label="item.label" v-for="item, key in list" :key="key">

                <p class="demo-scrollnav-title">{{item.label}}</p>
                <yd-list :theme="1">
                    <yd-list-item v-for="i in 10">
                        <img slot="img" src="http://static.shikee.com/common/img/blank.gif" style="background-color:#e6e6e6;">
                        <span slot="title"><span style="color:#909090;">{{item.label}} - {{item.label}}</span></span>
                    </yd-list-item>
                </yd-list>

            </yd-scrollnav-panel>
        </yd-scrollnav>

    </yd-layout>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    {label: '今日特惠'},
                    {label: '烟灶推荐'},
                    {label: '净水饮水推荐'},
                    {label: '洗碗机推荐'},
                    {label: '电热推荐'},
                    {label: '燃热推荐'},
                    {label: '消毒柜推荐'},
                    {label: '嵌入式推荐'},
                    {label: '商用电器'},
                    {label: '活动说明'}
                ]
            }
        }
    }
</script>

<style>
    .demo-scrollnav-title {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #4242ff;
        text-align: center;
        background-color: #e4e4e4;
        padding-left: 4px;
    }
</style>
