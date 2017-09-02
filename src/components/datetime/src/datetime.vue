<template>
    <div @click.stop="open" class="yd-datetime-input">{{value}}</div>
</template>

<script type="text/babel">
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
                    return ['datetime', 'date', 'time'].indexOf(value) > -1;
                },
                default: 'datetime'
            },
            startDate: {
                type: String,
                validator(value) {
                    if (!value) return true;
                    return Utils.isDateTimeString(value);
                }
            },
            endDate: {
                type: String,
                validator(value) {
                    if (!value) return true;
                    return Utils.isDateTimeString(value);
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
            value: {
                type: String,
                validator(value) {
                    if (!value) return true;
                    return Utils.isDateTimeString(value) || Utils.isTimeString(value);
                }
            },
            initEmit: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            value(val) {
                if (this.currentValue != val) {
                    this.render();
                }
            },
            startDate() {
                this.render();
            },
            endDate() {
                this.render();
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
            render() {
                this.removeElement();

                const Picker = Vue.extend(PickerComponent);
                const props = this._props;
                props.parentEL = this.$el;

                this.picker = new Picker({
                    el: document.createElement('div'),
                    data: props
                });

                document.body.appendChild(this.picker.$el);

                this.picker.$on('pickerConfirm', (value) => {
                    if (this.tmpNum > 0 || this.initEmit) {
                        this.currentValue = value;
                        this.$emit('input', value);
                    }
                    this.tmpNum++;
                });
            }
        },
        mounted() {
            this.render();
        },
        beforeDestroy() {
            this.removeElement();
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/datetime.less';
</style>
