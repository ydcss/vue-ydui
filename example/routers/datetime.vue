<template>
    <yd-layout title="DateTime">

        <yd-cell-group title="常规" class="demo-small-pitch">
            <yd-cell-item arrow>
                <span slot="left">Time：</span>
                <yd-datetime type="time" v-model="datetime1" slot="right"></yd-datetime>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">Date：</span>
                <yd-datetime type="date" v-model="datetime2" slot="right"></yd-datetime>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">DateTime：</span>
                <yd-datetime v-model="datetime3" type="datetime" slot="right"></yd-datetime>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">自定义模板：</span>
                <yd-datetime :yearFormat="yearFormat" :monthFormat="monthFormat" :dayFormat="dayFormat" type="date" v-model="datetime4" slot="right"></yd-datetime>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="可选时间" class="demo-small-pitch">
            <yd-cell-item arrow>
                <span slot="left">开始/结束年份：</span>
                <yd-datetime startYear="1990" endYear="2020" type="date" v-model="datetime5" slot="right"></yd-datetime>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">开始/结束小时：</span>
                <yd-datetime startHour="9" endHour="18" type="time" v-model="datetime6" slot="right"></yd-datetime>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="限制时间" class="demo-small-pitch">
            <yd-cell-item arrow>
                <span slot="left">时间段范围：</span>
                <yd-datetime ref="datetime" startDate="2012-03-16 15:13" endDate="2019-10-21 22:21" v-model="datetime7" slot="right"></yd-datetime>
            </yd-cell-item>
            <p slot="bottom" class="demo-cell-bottom-tip">( 2012-03-16 15:13 ~ 2019-10-21 22:21 )</p>
        </yd-cell-group>

        <yd-button-group>
            <yd-button size="large" @click.native="open">手动打开</yd-button>
        </yd-button-group>
    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                datetime1: '05:21',
                datetime2: '2018-03-29',
                datetime3: '2016-06-06 06:06',
                datetime4: '2017-05-11',
                datetime5: '',
                datetime6: '10:20',
                datetime7: '',
                yearFormat: '<span style="color:#F00;">{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
                monthFormat: '<span style="color:#0BB20C;">{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
                dayFormat: '<span style="color:#FFB400;">{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>'
            }
        },
        methods: {
            open() {
                this.$refs.datetime.open();
            }
        }
    }
</script>
