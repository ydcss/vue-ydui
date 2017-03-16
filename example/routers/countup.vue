<template>
    <yd-layout title="CountUp">
        <yd-cell-group class="demo-small-pitch">

            <yd-cell-item>
                <yd-countup
                        slot="left"
                        :startnum="0"
                        :endnum="1200"
                        :duration="2.5"
                ></yd-countup>
                <span slot="right">普通调用</span>
            </yd-cell-item>

            <yd-cell-item>
                <yd-countup
                        slot="left"
                        :startnum="0"
                        :endnum="100"
                        :duration="2.5"
                        :decimals="2"
                ></yd-countup>
                <span slot="right">添加小数</span>
            </yd-cell-item>

            <yd-cell-item>
                <yd-countup
                        slot="left"
                        :startnum="0"
                        :endnum="100"
                        :duration="2.5"
                        :decimals="2"
                        prefix="$"
                        suffix="&"
                ></yd-countup>
                <span slot="right">添加前后符号</span>
            </yd-cell-item>

            <yd-cell-item>
                <yd-countup
                        slot="left"
                        :startnum="0"
                        :endnum="9998"
                        :duration="2.5"
                        :decimals="2"
                        separator=","
                ></yd-countup>
                <span slot="right">添加分割符</span>
            </yd-cell-item>

            <yd-cell-item>
                <yd-countup
                        slot="left"
                        :startnum="0"
                        :endnum="initnum"
                        separator=","
                        decimal="."
                ></yd-countup>
                <span slot="right"><yd-button @click.native="initnum = 100" type="warning">改变结束值至100</yd-button></span>
            </yd-cell-item>

            <yd-cell-item>
                <yd-countup
                        slot="left"
                        :startnum="0"
                        :endnum="100"
                        :duration="2"
                        suffix="%"
                        :start="start"
                ></yd-countup>
                <span slot="right"><yd-button @click.native="start = true">开始</yd-button></span>
            </yd-cell-item>

        </yd-cell-group>
    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                initnum: 50,
                start: false
            }
        }
    }
</script>
