<template>
    <div>
        <yd-mask v-model="show" @click.native="close" :opacity="maskerOpacity"></yd-mask>
        <div class="yd-datetime" :class="show ? 'yd-datetime-active' : ''">
            <div class="yd-datetime-head">
                <a href="javascript:;" @click.stop="close">{{cancelText}}</a>
                <a href="javascript:;" @click.stop="setValue">{{confirmText}}</a>
            </div>
            <div class="yd-datetime-content">
                <div class="yd-datetime-item" v-for="column, key in columns" :key="key">
                    <div class="yd-datetime-item-box" :ref="'Component_' + column">
                        <div class="yd-datetime-item-content" :ref="'Content_' + column">
                            <span v-for="item, key in items[column]"
                                  :data-value="item.value"
                                  v-html="item.name"
                                  :key="key"
                            ></span>
                        </div>
                    </div>
                </div>
                <div class="yd-datetime-shade"></div>
                <div class="yd-datetime-indicator"><span></span></div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import {isIOS, pageScroll} from '../../../utils/assist';
    import Mask from '../../mask/src/mask.vue';
    import Scroller from './scroller';
    import Utils from './utils';

    export default {
        data() {
            return {
                itemHeight: 38,
                value: '',
                reloadMonth: false,
                show: false,
                parentEL: null,
                columns: [],
                scroller: [],
                type: '',
                cancelText: '',
                confirmText: '',
                items: {
                    Year: [],
                    Month: [],
                    Day: [],
                    Hour: [],
                    Minute: [],
                    Second: [],
                },
                scrolling: {
                    Year: false,
                    Month: false,
                    Day: false,
                    Hour: false,
                    Minute: false,
                    Second: false,
                },
                readonly: false,
                currentYear: '',
                currentMonth: '',
                currentDay: '',
                currentHour: '',
                currentMinute: '',
                currentValue: '',
                yearFormat: '{value}年',
                monthFormat: '{value}月',
                dayFormat: '{value}日',
                hourFormat: '{value}时',
                minuteFormat: '{value}分',
                secondFormat: '{value}秒',
                startYear: 0,
                endYear: 0,
                startHour: 0,
                endHour: 23,
                maskerOpacity: .5
            }
        },
        components: {
            'yd-mask': Mask
        },
        watch: {
            currentYear(val) {
                this.setMonths(val);
            },
            currentMonth(val) {
                this.setDays(val);
            },
            currentDay(val) {
                this.setHours(val);
            },
            currentHour(val) {
                this.setMinutes(val);
            },
            currentMinute(val) {
                this.setSeconds(val);
            }
        },
        methods: {
            init() {
                const _this = this;

                let currentValue = _this.currentValue = _this.value.replace(/-/g, '/');

                if (_this.startDate && new Date(currentValue).getTime() < new Date(_this.startDate).getTime()) {
                    currentValue = _this.currentValue = _this.startDate;
                }

                if (_this.endDate && new Date(currentValue).getTime() > new Date(_this.endDate).getTime()) {
                    currentValue = _this.currentValue = _this.endDate;
                }

                const currentDate = new Date(currentValue);
                let _currentYear = currentDate.getFullYear();
                let _currentMonth = currentDate.getMonth() + 1;
                let _currentDay = currentDate.getDate();
                let _currentHour = currentDate.getHours();
                let _currentMinutes = currentDate.getMinutes();
                let _currentSeconds = currentDate.getSeconds();

                if (_this.type !== 'time') {
                    const _yearItems = _this.items['Year'] = Utils.getYearItems({
                        format: _this.yearFormat,
                        startDate: _this.startDate,
                        endDate: _this.endDate,
                        startYear: _this.startYear,
                        endYear: _this.endYear
                    });
                    if (!currentValue) {
                        _currentYear = _yearItems[0].value;
                    }

                    const _monthItems = Utils.getMonthItems({
                        format: _this.monthFormat,
                        currentYear: _currentYear,
                        startDate: _this.startDate,
                        endDate: _this.endDate
                    });
                    if (!currentValue) {
                        _currentMonth = _monthItems[0].value;
                    }

                    const _dayItems = Utils.getDayItems({
                        format: _this.dayFormat,
                        currentYear: _currentYear,
                        currentMonth: _currentMonth,
                        startDate: _this.startDate,
                        endDate: _this.endDate
                    });
                    if (!currentValue) {
                        _currentDay = _dayItems[0].value;
                    }

                    if (currentValue) {
                        _this.currentYear = _currentYear;
                        if (!_this.inDatas(_yearItems, _this.currentYear)) {
                            _this.currentYear = _yearItems[0].value;
                        }

                        this.reloadMonth && this.setMonths(_this.currentYear);

                        _this.currentMonth = Utils.mentStr(_currentMonth);
                        if (!_this.inDatas(_monthItems, _this.currentMonth)) {
                            _this.currentMonth = _monthItems[0].value;
                        }

                        _this.currentDay = Utils.mentStr(_currentDay);
                        if (!_this.inDatas(_dayItems, _this.currentDay)) {
                            _this.currentDay = _dayItems[0].value;
                        }
                    } else {
                        _this.currentYear = _currentYear;
                        _this.currentMonth = _currentMonth;
                        _this.currentDay = _currentDay;
                    }
                }

                if (_this.type === 'datetime' || _this.type === 'time' || _this.type === 'datetime_full') {
                    const _hourItems = Utils.getHourItems({
                        format: _this.hourFormat,
                        currentYear: _currentYear,
                        currentMonth: _currentMonth,
                        currentDay: _currentDay,
                        startDate: _this.startDate,
                        endDate: _this.endDate,
                        startHour: _this.startHour,
                        endHour: _this.endHour
                    });
                    if(!currentValue) {
                        _currentHour = _hourItems[0].value
                    }

                    const _minuteItems = Utils.getMinuteItems({
                        format: _this.minuteFormat,
                        currentYear: _currentYear,
                        currentMonth: _currentMonth,
                        currentDay: _currentDay,
                        currentHour: _currentHour,
                        startDate: _this.startDate,
                        endDate: _this.endDate
                    });
                    if(!currentValue) {
                        _currentMinutes = _minuteItems[0].value
                    }

                    const _secondItems = Utils.getSecondItems({
                        format: _this.secondFormat,
                        currentYear: _currentYear,
                        currentMonth: _currentMonth,
                        currentDay: _currentDay,
                        currentHour: _currentHour,
                        startDate: _this.startDate,
                        endDate: _this.endDate
                    });
                    if(!currentValue) {
                        _currentSeconds = _secondItems[0].value
                    }

                    if (_this.type === 'time') {
                        _this.items['Hour'] = _hourItems;
                    }

                    if (currentValue) {
                        if (Utils.isDateTimeString(currentValue)) {
                            _this.currentHour = Utils.mentStr(_currentHour);
                            _this.currentMinute = Utils.mentStr(_currentMinutes);
                            _this.currentSecond = Utils.mentStr(_currentMinutes);
                        } else {
                            const timeArr = currentValue.split(':');
                            _this.currentHour = Utils.mentStr(timeArr[0]);
                            _this.currentMinute = Utils.mentStr(timeArr[1]);
                            _this.currentSecond = Utils.mentStr(timeArr[2]);
                        }
                        if (!_this.inDatas(_hourItems, _this.currentHour)) {
                            _this.currentHour = _hourItems[0].value;
                        }
                        if (!_this.inDatas(_minuteItems, _this.currentMinute)) {
                            _this.currentMinute = _minuteItems[0].value;
                        }
                        if (!_this.inDatas(_secondItems, _this.currentSecond)) {
                            _this.currentSecond = _secondItems[0].value;
                        }
                    } else {
                        _this.currentHour = _currentHour;
                        _this.currentMinute = _currentMinutes;
                        _this.currentSecond = _currentSeconds;
                    }
                }

                if (_this.type === 'datetime') {
                    _this.columns = ['Year', 'Month', 'Day', 'Hour', 'Minute'];
                } else if (_this.type === 'month') {
                    _this.columns = ['Year', 'Month'];
                } else if (_this.type === 'day') {
                    _this.columns = ['Month', 'Day'];
                } else if (_this.type === 'date') {
                    _this.columns = ['Year', 'Month', 'Day'];
                } else if (_this.type === 'datetime_full') {
                    _this.columns = ['Year', 'Month', 'Day', 'Hour', 'Minute', 'Second'];
                } else {
                    _this.columns = ['Hour', 'Minute'];
                }
            },
            render() {
                const _this = this;

                _this.columns.forEach((item) => {
                    const component = _this.$refs['Component_' + item][0];
                    const content = _this.$refs['Content_' + item][0];

                    _this.scroller[item] = new Scroller(component, content, {
                        itemHeight: _this.itemHeight,
                        onSelect(value) {
                            _this['current' + item] = value;
                            _this.scrolling[item] = false;
                        },
                        callback(top, isDragging) {
                            if (isDragging) {
                                _this.scrolling[item] = true;
                            }
                            content.style.webkitTransform = 'translate3d(0, ' + (-top) + 'px, 0)'
                        }
                    });

                    const len = _this.items[item].length;
                    _this.scroller[item].setDimensions(7 * _this.itemHeight, len * _this.itemHeight, len);
                    _this.scroller[item].select(_this['current' + item], false);
                    _this.scrolling[item] = false;
                });

                _this.setValue();
            },
            setMonths(currentYear) {
                const _this = this;

                const allMonths = _this.items['Month'] = Utils.getMonthItems({
                    format: _this.monthFormat,
                    currentYear: currentYear,
                    startDate: _this.startDate,
                    endDate: _this.endDate
                });

                _this.scrolloToPosition('Month', allMonths, () => {
                    _this.setDays(_this.currentMonth);
                });
            },
            setDays(currentMonth) {
                const _this = this;

                const allDays = _this.items['Day'] = Utils.getDayItems({
                    format: _this.dayFormat,
                    currentYear: _this.currentYear,
                    currentMonth: currentMonth,
                    startDate: _this.startDate,
                    endDate: _this.endDate
                });

                _this.scrolloToPosition('Day', allDays, () => {
                    _this.setHours(_this.currentDay);
                });
            },
            setHours(currentDay) {
                const _this = this;

                const allHour = _this.items['Hour'] = Utils.getHourItems({
                    format: _this.hourFormat,
                    currentYear: _this.currentYear,
                    currentMonth: _this.currentMonth,
                    currentDay: currentDay,
                    startDate: _this.startDate,
                    endDate: _this.endDate,
                    startHour: _this.startHour,
                    endHour: _this.endHour
                });

                _this.scrolloToPosition('Hour', allHour, () => {
                    _this.setMinutes(_this.currentHour);
                });
            },
            setMinutes(currentHour) {
                const _this = this;

                const allMinute = _this.items['Minute'] = Utils.getMinuteItems({
                    format: _this.minuteFormat,
                    currentYear: _this.currentYear,
                    currentMonth: _this.currentMonth,
                    currentDay: _this.currentDay,
                    currentHour: currentHour,
                    startDate: _this.startDate,
                    endDate: _this.endDate
                });

                _this.scrolloToPosition('Minute', allMinute);
            },
            setSeconds(currentSecond) {
                const _this = this;

                const allSecond = _this.items['Second'] = Utils.getSecondItems({
                    format: _this.secondFormat,
                    currentYear: _this.currentYear,
                    currentMonth: _this.currentMonth,
                    currentDay: _this.currentDay,
                    currentHour: _this.currentHour,
                    currentSecond: currentSecond,
                    startDate: _this.startDate,
                    endDate: _this.endDate
                });

                _this.scrolloToPosition('Second', allSecond);
            },
            scrolloToPosition(type, allDatas, callback) {
                const _this = this;

                const scroller = _this.scroller[type];
                if (!scroller) return;

                const len = allDatas.length;
                scroller.setDimensions(7 * _this.itemHeight, len * _this.itemHeight, len);

                setTimeout(() => {
                    const indatas = _this.inDatas(allDatas, _this['current' + type]);
                    if (!_this.scrolling[type]) {
                        scroller.select(indatas ? _this['current' + type] : allDatas[0].value, false);
                    }
                    typeof callback === 'function' && callback();
                }, 0);
            },
            setValue() {
                let value = '';

                if (this.type === 'datetime') {
                    value = `${this.currentYear}-${this.currentMonth}-${this.currentDay} ${this.currentHour}:${this.currentMinute}`;
                } else if (this.type === 'month') {
                    value = `${this.currentYear}-${this.currentMonth}`;
                } else if (this.type === 'day') {
                    value = `${this.currentMonth}-${this.currentDay}`;
                } else if (this.type === 'date') {
                    value = `${this.currentYear}-${this.currentMonth}-${this.currentDay}`;
                } else if (this.type === 'datetime_full') {
                    value = `${this.currentYear}-${this.currentMonth}-${this.currentDay} ${this.currentHour}:${this.currentMinute}:${this.currentSecond}`;
                } else {
                    value = `${this.currentHour}:${this.currentMinute}`;
                }

                this.currentValue = value;
                this.$emit('pickerConfirm', value);
                this.close();
            },
            inDatas(items, key) {
                let b = false;
                items.forEach((item) => {
                    if (item.value == key) b = true;
                });
                return b;
            },
            open() {
                if (this.readonly) return;
                this.show = true;
                isIOS && pageScroll.lock();
            },
            close() {
                this.show = false;
                isIOS && pageScroll.unlock();
            }
        },
        created() {
            this.init();
        },
        mounted() {
            this.$nextTick(this.render);
        },
        beforeDestroy() {
            this.columns.forEach((item) => {
                this.scroller[item] = null;
            });
        }
    }
</script>
