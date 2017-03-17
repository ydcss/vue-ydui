<template>
    <yd-layout title="Rate">
        <yd-cell-group title="普通使用" class="demo-small-pitch">
            <yd-cell-item>
                <yd-rate slot="left" v-model="rate1"></yd-rate>
                <span slot="right">值是: {{rate1}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <yd-rate slot="left" v-model="rate2"></yd-rate>
                <span slot="right">设置默认值</span>
            </yd-cell-item>
            <yd-cell-item>
                <yd-rate slot="left" count="7" v-model="rate3"></yd-rate>
                <span slot="right">设置多个</span>
            </yd-cell-item>
            <yd-cell-item>
                <yd-rate slot="left" v-model="rate4" color="#00FF16" activeColor="#0078D7"></yd-rate>
                <span slot="right">自定义颜色</span>
            </yd-cell-item>
            <yd-cell-item>
                <yd-rate slot="left" v-model="rate5" size="18px"></yd-rate>
                <span slot="right">自定义大小</span>
            </yd-cell-item>
            <yd-cell-item>
                <yd-rate slot="left" v-model="rate6" :readonly="true"></yd-rate>
                <span slot="right">只读</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="带提示文字">
            <yd-cell-item>
                <yd-rate slot="left" v-model="rate7" :showText="['很差','还行','一般','挺好','非常好']"></yd-rate>
                <span slot="right">提示文字</span>
            </yd-cell-item>
            <yd-cell-item>
                <yd-rate slot="left" v-model="rate8" :showText="tipText"></yd-rate>
                <span slot="right">HTML提示模板</span>
            </yd-cell-item>
        </yd-cell-group>
    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                rate1: 0,
                rate2: 3,
                rate3: 2,
                rate4: 1,
                rate5: 4,
                rate6: 3,
                rate7: 2,
                rate8: 1,
                tipText: [
                    '<span style="color:red;">$ 分 - 很差</span>',
                    '<span style="color:blue;">$ 分 - 勉强</span>',
                    '<span style="color:green;">$ 分 - 一般</span>',
                    '<span style="color:black;">$ 分 - 挺好</span>',
                    '<span style="color:chartreuse;">$ 分 - 非常好</span>'
                ]
            }
        }
    }
</script>
