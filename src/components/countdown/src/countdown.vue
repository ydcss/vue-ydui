<template>
    <span>
        <span v-html="str"></span>
        <span ref="tpl" v-if="showTpl"><slot></slot></span>
    </span>
</template>

<script type="text/babel">
    //TODO 开关显示是否需要显示0

    export default {
        name: 'yd-countdown',
        data() {
            return {
                str: '',
                timer: null,
                tempFormat: '',
                showTpl: true
            }
        },
        props: {
            time: {
                type: String
            },
            format: {
                type: String,
                default: '{%d}天{%h}时{%m}分{%s}秒'
            },
            timeout: {
                type: Function
            },
            timeoutText: {
                type: String,
                default: '已结束'
            }
        },
        methods: {
            run() {
                const lastTime = Math.floor(new Date(this.time).getTime() / 1000);
                this.timer = setInterval(() => {
                    let leftTime = lastTime - Math.floor(new Date().getTime() / 1000);
                    if (leftTime > 0) {
                        this.str = this.timestampTotime(leftTime);
                    } else {
                        typeof this.timeout == 'function' && this.timeout();
                        this.str = this.timeoutText;
                        clearInterval(this.timer);
                    }
                }, 1000);
            },
            timestampTotime(time) {
                let format = this.tempFormat;
                let t = {};

                t.s = time % 60;
                time = Math.floor(time / 60);
                t.m = time % 60;
                time = Math.floor(time / 60);
                t.h = time % 24;
                t.d = Math.floor(time / 24);

                const ment = function (a) {
                    if (a <= 0)  return '00';
                    return a < 10 ? '0' + a : a;
                };

                const arr = ['d', 'h', 'm', 's'];

                arr.forEach((val) => {
                    const day = ment(t[val]).toString().split('');
                    format = format.replace('{%' + val + '}', ment(t[val]));
                    format = format.replace('{%' + val + '1}', ~~day[day.length - 2]);
                    format = format.replace('{%' + val + '2}', ~~day[day.length - 1]);
                    format = format.replace('{%' + val + '0}', ~~day[0] != 0 ? day[0] : '');
                });

                return format;
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.tempFormat = !!this.$slots.default ? this.$refs.tpl.innerHTML : this.format;
                this.showTpl = false;
                this.run();
            });
        }
    }
</script>
