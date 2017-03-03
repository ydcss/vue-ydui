<template>
    <span>{{str}}</span>
</template>

<script type="text/babel">
    export default {
        name: 'yd-countdown',
        data() {
            return {
                str: '',
                timer: null
            }
        },
        watch: {
            value(val) {
                val && this.run();
            }
        },
        props: {
            time: {
                type: Number
            },
            format: {
                type: String,
                default: '{%d天}{%h时}{%m分}{%s秒}'
            },
            start: {
                type: Boolean,
                default: true
            },
            done: {
                type: Function
            }
        },
        methods: {
            run() {
                this.time = this.time * 1000 + Date.parse(new Date());
                this.timer = setInterval(() => {
                    let l_time = this.time - new Date().getTime();
                    if (l_time > 0) {
                        this.str = this.timestampTotime(this.format, l_time);
                    } else {
                        clearInterval(this.timer);
                    }
                }, 1000);
            },
            timestampTotime(format, time) {
                let t = {}, floor = Math.floor;

                time = floor(time / 1000);
                t.s = time % 60;
                time = floor(time / 60);
                t.m = time % 60;
                time = floor(time / 60);
                t.h = time % 24;
                t.d = floor(time / 24);

                const ment = function (a) {
                    if (a <= 0)  return '';
                    return '$1' + (a < 10 ? '0' + a : a) + '$2';
                };

                format = format.replace(/\{([^{]*?)%d(.*?)\}/g, ment(t.d));
                format = format.replace(/\{([^{]*?)%h(.*?)\}/g, ment(t.h));
                format = format.replace(/\{([^{]*?)%m(.*?)\}/g, ment(t.m));
                format = format.replace(/\{([^{]*?)%s(.*?)\}/g, ment(t.s));

                return format;
            }
        },
        mounted() {
            this.run();
        }
    }
</script>
