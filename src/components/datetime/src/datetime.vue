<template>
    <div>
        <div class="mask-datatime"></div>
        <div class="m-datetime datetime-active">
            <div class="datetime-header">
                <a href="javascript:;">取消</a>
                <a href="javascript:;">确定</a>
            </div>
            <ul class="datetime-content">
                <li class="datetime-item-box">
                    <div class="datetime-item">
                        <a href="javascript:;" v-for="oldYear in fuckyear">{{oldYear}}</a>
                    </div>
                </li>
                <li class="datetime-item-box">
                    <div class="datetime-item">
                        <a href="javascript:;" v-for="i in 60">{{i}}</a>
                    </div>
                </li>
                <li class="datetime-item-box">
                    <div class="datetime-item">
                        <a href="javascript:;" v-for="i in 60">{{i}}</a>
                    </div>
                </li>
                <li class="datetime-item-box">
                    <div class="datetime-item">
                        <a href="javascript:;" v-for="i in 60">{{i}}</a>
                    </div>
                </li>
                <li class="datetime-item-box">
                    <div class="datetime-item">
                        <a href="javascript:;" v-for="i in 60">{{i}}</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-datetime',
        data() {
            return {
                curYear: '',
                currentValue: '',
                fuckyou: {
                    year: [2008, 2018],
                    month: [1, 12],
                    date: [1, 25],
                    hour: [0, 23],
                    min: [0, 59]
                }
            }
        },
        props: {
            type: {
                type: String,
                default: 'datetime'
            },
            startDate: {
                type: Date,
                default() {
                    return new Date();
                }
            },
            startHour: {
                type: Number,
                default: 0
            },
            yearFormat: {
                type: String,
                default: '{value}'
            },
            monthFormat: {
                type: String,
                default: '{value}'
            },
            dateFormat: {
                type: String,
                default: '{value}'
            },
            hourFormat: {
                type: String,
                default: '{value}'
            },
            minuteFormat: {
                type: String,
                default: '{value}'
            },
        },
        computed: {
            fuckyear() {
                let fuck = [];
                for (var i = this.fuckyou.year[0]; i <= this.fuckyou.year[1]; i++) {
                    fuck.push(i);
                }
                return fuck;
            }
        },
        methods: {
            isLeapYear(year) {
                return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
            },
            isShortMonth(month) {
                return [4, 6, 9, 11].indexOf(month) > -1;
            },
            isDateString(str) {
                return /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/.test(str);
            },
            getYear(value) {
                return this.isDateString(value) ? value.split(' ')[0].split(/-|\/|\./)[0] : value.getFullYear();
            },
            getMonth(value) {
                return this.isDateString(value) ? value.split(' ')[0].split(/-|\/|\./)[1] : value.getMonth() + 1;
            },
            getDate(value) {
                return this.isDateString(value) ? value.split(' ')[0].split(/-|\/|\./)[2] : value.getDate();
            },
            getHour(value) {
                if (this.isDateString(value)) {
                    const str = value.split(' ')[1] || '00:00:00';
                    return str.split(':')[0];
                }
                return value.getHours();
            },
            getMinute(value) {
                if (this.isDateString(value)) {
                    const str = value.split(' ')[1] || '00:00:00';
                    return str.split(':')[1];
                }
                return value.getMinutes();
            },
            init() {
                this.fuckyou.year.forEach((val) =>{
                   console.log(val);
                });
            },
            handleExceededValue() {
                let values = [];
                if (this.type === 'time') {
                    const currentValue = this.currentValue.split(':');
                    values = [
                        this.hourFormat.replace('{value}', currentValue[0]),
                        this.minuteFormat.replace('{value}', currentValue[1])
                    ];
                } else {
                    values = [
                        this.yearFormat.replace('{value}', this.getYear(this.currentValue)),
                        this.monthFormat.replace('{value}', ('0' + this.getMonth(this.currentValue)).slice(-2)),
                        this.dateFormat.replace('{value}', ('0' + this.getDate(this.currentValue)).slice(-2))
                    ];
                    if (this.type === 'datetime') {
                        values.push(
                                this.hourFormat.replace('{value}', ('0' + this.getHour(this.currentValue)).slice(-2)),
                                this.minuteFormat.replace('{value}', ('0' + this.getMinute(this.currentValue)).slice(-2))
                        );
                    }
                }
            }
        },
        created() {
            this.currentValue = this.value;
            if (!this.value) {
                if (this.type.indexOf('date') > -1) {
                    this.currentValue = this.startDate;
                } else {
                    this.currentValue = `${ ('0' + this.startHour).slice(-2) }:00`;
                }
            }
            this.handleExceededValue();
            this.init();
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/datetime.less';
</style>
