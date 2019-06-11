<template>
    <div @click.stop="open" class="yd-datetime-input">
        <template v-if="!!value">{{value}}</template>
        <template v-else><span class="yd-datetime-placeholder">{{placeholder}}</span></template>
    </div>
</template>

<script type="text/babel">
    import {pageScroll} from '../../../utils/assist';
    import Vue from 'vue';
    import Utils from './utils';
    import PickerComponent from './picker.vue';

    export default {
        name: 'yd-datetime',
        data() {
            return {
                picker: null,
                currentValue: this.value,
                tmpNum: 0
            }
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                validator(value) {
                    return ['datetime', 'date', 'time', 'month', 'day', 'datetime_full'].indexOf(value) > -1;
                },
                default: 'datetime'
            },
            startDate: {
                type: String,
                validator(value) {
                    if (!value) return true;
                    return Utils.isDateTimeString(value) || Utils.isTimeString(value) || Utils.isMonthString(value) || Utils.isDayString(value);
                }
            },
            endDate: {
                type: String,
                validator(value) {
                    if (!value) return true;
                    return Utils.isDateTimeString(value) || Utils.isTimeString(value) || Utils.isMonthString(value) || Utils.isDayString(value);
                }
            },
            startYear: {
                validator(val) {
                    return /^\d{4}|0$/.test(val);
                },
                default: 0
            },
            endYear: {
                validator(val) {
                    return /^\d{4}|0$/.test(val);
                },
                default: 0
            },
            startHour: {
                validator(val) {
                    return /^(0|[1-9]|1[0-9]|2[0-3])?$/.test(val);
                },
                default: 0
            },
            endHour: {
                validator(val) {
                    return /^([1-9]|1[0-9]|2[0-3])?$/.test(val);
                },
                default: 23
            },
            yearFormat: {
                type: String,
                default: '{value}年'
            },
            monthFormat: {
                type: String,
                default: '{value}月'
            },
            dayFormat: {
                type: String,
                default: '{value}日'
            },
            hourFormat: {
                type: String,
                default: '{value}时'
            },
            minuteFormat: {
                type: String,
                default: '{value}分'
            },
            secondFormat: {
                type: String,
                default: '{value}秒'
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            confirmText: {
                type: String,
                default: '确定'
            },
            value: {
                type: String,
                validator(value) {
                    if (!value) return true;
                    return Utils.isDateTimeString(value) || Utils.isTimeString(value) || Utils.isMonthString(value) || Utils.isDayString(value) || Utils.isDateTimeFullString(value);
                }
            },
            initEmit: {
                type: Boolean,
                default: true
            },
            placeholder: String,
            callback: Function,
            maskerOpacity: {
                validator(val) {
                    return /^([0]|[1-9]\d*)?(\.\d*)?$/.test(val);
                },
                default: .5
            }
        },
        watch: {
            value(val) {
                if (this.currentValue != val) {
                   this.render(false);
                }
            },
            startDate() {
                this.render(true);
            },
            endDate() {
                this.render(true);
            }
        },
        methods: {
            open() {
                if (this.readonly) return;
                this.picker.open();
            },
            close() {
                this.picker.close();
            },
            removeElement() {
                if (this.picker && this.picker.$el) document.body.removeChild(this.picker.$el);
            },
            render(reloadMonth) {
                this.removeElement();

                const Picker = Vue.extend(PickerComponent);
                const props = this._props;

                props.reloadMonth = reloadMonth;

                this.picker = new Picker({
                    el: document.createElement('div'),
                    data: props
                });

                document.body.appendChild(this.picker.$el);

                this.picker.$on('pickerConfirm', (value) => {
                    if (this.tmpNum > 0 || this.initEmit) {
                        this.currentValue = value;
                        this.$emit('input', value);
                        this.callback && this.callback(value);
                    }
                    this.tmpNum++;
                });
            }
        },
        mounted() {
            this.render();
        },
        beforeDestroy() {
            pageScroll.unlock();
            this.removeElement();
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/datetime.less';
</style>
