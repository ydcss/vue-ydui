<template>
    <yd-layout title="CitySelect">

        <yd-cell-group title="默认调用" class="demo-small-pitch">
            <yd-cell-item arrow>
                <span slot="left">所在地区：</span>
                <input slot="right" type="text" @click.stop="show1 = true" v-model="model1" readonly class="cell-input" placeholder="请选择收货地址">
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="设置默认值">
            <yd-cell-item arrow>
                <span slot="left">所在地区：</span>
                <input slot="right" type="text" @click.stop="show2 = true" v-model="model2" readonly class="cell-input" placeholder="请选择收货地址">
            </yd-cell-item>
        </yd-cell-group>

        <yd-cityselect v-model="show1" :done="result1"></yd-cityselect>

        <yd-cityselect v-model="show2" :done="result2" provance="新疆" city="乌鲁木齐市" area="天山区"></yd-cityselect>

    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                show1: false,
                show2: false,
                model1: '',
                model2: '新疆 乌鲁木齐市 天山区'
            }
        },
        methods: {
            result1(ret) {
                this.model1 = ret.provance + ' ' + ret.city + ' ' + ret.area;
            },
            result2(ret) {
                this.model2 = ret.provance + ' ' + ret.city + ' ' + ret.area;
            }
        }
    }
</script>
