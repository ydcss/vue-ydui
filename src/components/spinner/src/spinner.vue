<template>
    <span class="yd-spinner" :style="{height: height, width: width}">
        <a href="javascript:;" ref="minus"></a>
        <input type="text" ref="numInput" class="spinner-input" :readonly="readonly" v-model="counter" placeholder=""/>
        <a href="javascript:;" ref="add"></a>
    </span>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'yd-spinner',
        data() {
            return {
                counter: 0,
                tapParams: {
                    timer: null,
                    tapStartTime: 0
                },
                parms: {
                    max: 0,
                    min: -1
                }
            }
        },
        watch: {
            value() {
                this.setDefalutValue();
            }
        },
        props: {
            unit: {
                default: 1,
                validator(val) {
                    return /^([1-9]\d*)$/.test(val);
                }
            },
            max: {
                default: 0,
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                }
            },
            min: {
                default: -1,
                validator(val) {
                    return /^((-?([1-9]\d*))|0)$/.test(val);
                }
            },
            longpress: {
                type: Boolean,
                default: true
            },
            readonly: {
                type: Boolean,
                default: false
            },
            value: {
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                }
            },
            width: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '2rem'
            },
            height: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '.6rem'
            }
        },
        methods: {
            init() {
                if (!this.checkParameters())return;

                this.setDefalutValue();

                this.bindEvents();
            },
            checkParameters() {
                const max = ~~this.max;
                const unit = ~~this.unit;
                const min = ~~this.min;

                if (max < unit && max != 0) {
                    console.error('[YDUI warn]: The parameter \'max\'(' + max + ') must be greater than or equal to \'unit\'(' + unit + ').');
                    return false;
                }

                if (max % unit != 0) {
                    console.error('[YDUI warn]: The parameter \'max\'(' + max + ') and \'unit\'(' + unit + ') must be multiple.');
                    return false;
                }

                if (min % unit != 0 && min >= 0) {
                    console.error('[YDUI warn]: The parameter \'min\'(' + min + ') and \'unit\'(' + unit + ') must be multiple.');
                    return false;
                }

                if (max < min && max != 0) {
                    console.error('[YDUI warn]: The parameter \'max\'(' + max + ') must be greater than to \'min\'(' + min + ').');
                    return false;
                }

                return true;
            },
            setDefalutValue() {
                const unit = ~~this.unit;
                const min = ~~this.min;
                const value = ~~this.value;

                if (~~value > 0) {
                    this.setValue(value);
                    return;
                }

                this.setValue(min < 0 ? unit : min);
            },
            calculation(type) {
                const max = ~~this.max;
                const min = ~~this.min < 0 ? ~~this.unit : ~~this.min;
                const unit = ~~this.unit;

                if (this.readonly)return;

                let val = ~~this.counter;
                let newval;

                if (type == 'add') {
                    newval = val + unit;
                    if (max != 0 && newval > max)return;
                } else {
                    newval = val - unit;
                    if (newval < min)return;
                }

                this.setValue(newval);

                if (this.longpress) {
                    this.longpressHandler(type);
                }
            },
            setValue(val) {
                const max = ~~this.max;
                const min = ~~this.min < 0 ? ~~this.unit : ~~this.min;
                const unit = ~~this.unit;

                if (!/^(([1-9]\d*)|0)$/.test(val)) val = unit;

                if (val > max && max != 0) val = max;

                if (val % unit > 0) {
                    val = val - val % unit + unit;
                    if (val > max && max != 0) val -= unit;
                }

                if (val < min) val = min - min % unit;

                this.counter = val;
                this.$emit('input', val);
            },
            longpressHandler(type) {
                const currentDate = new Date().getTime() / 1000;

                let intervalTime = currentDate - this.tapParams.tapStartTime;

                if (intervalTime < 1) intervalTime = 0.5;

                let secondCount = intervalTime * 10;
                if (intervalTime == 30) secondCount = 50;
                if (intervalTime >= 40) secondCount = 100;

                this.tapParams.timer = setTimeout(() => {
                    this.calculation(type);
                }, 1000 / secondCount);
            },
            clearTapTimer() {
                clearTimeout(this.tapParams.timer);
            },
            bindEvents() {
                const add = this.$refs.add;
                const minus = this.$refs.minus;
                const events = {
                    mousedownEvent: 'touchstart',
                    mouseupEvent: 'touchend'
                };

                const isMobile = (window.Modernizr && !!window.Modernizr.touch) || (function () {
                            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
                        })();

                if (!isMobile) {
                    events.mousedownEvent = 'mousedown';
                    events.mouseupEvent = 'mouseup';
                }

                add.addEventListener(events.mousedownEvent, (e) => {
                    if (this.longpress) {
                        e.preventDefault();
                        e.stopPropagation();

                        this.tapParams.tapStartTime = new Date().getTime() / 1000;

                        add.addEventListener(events.mouseupEvent, this.clearTapTimer);
                    }

                    this.calculation('add');
                });

                minus.addEventListener(events.mousedownEvent, (e) => {
                    if (this.longpress) {
                        e.preventDefault();
                        e.stopPropagation();

                        this.tapParams.tapStartTime = new Date().getTime() / 1000;

                        minus.addEventListener(events.mouseupEvent, this.clearTapTimer);
                    }

                    this.calculation('minus');
                });

                this.$refs.numInput.addEventListener('change', () => {
                    this.setValue(~~this.counter);
                });
            }
        },
        mounted() {
            this.$nextTick(this.init);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/spinner.less";
</style>
