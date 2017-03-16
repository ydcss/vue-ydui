<template>
    <span></span>
</template>

<script>
    import CountUp from './countup.js';

    export default {
        name: 'yd-countup',
        data() {
            return {
                instance: null
            }
        },
        props: {
            start: {
                type: Boolean,
                default: true
            },
            startnum: {
                type: Number,
                default: 0
            },
            endnum: {
                type: Number,
                required: true
            },
            decimals: {
                type: Number,
                default: 0
            },
            duration: {
                type: Number,
                default: 2
            },
            useEasing: {
                type: Boolean,
                default: false
            },
            separator: {
                type: String,
                default: ''
            },
            decimal: {
                type: String,
                default: '.'
            },
            prefix: {
                type: String,
                default: ''
            },
            suffix: {
                type: String,
                default: ''
            },
            callback: {
                type: Function
            }
        },
        watch: {
            start(val) {
                val && this.instance.start(() => {
                    typeof this.callback == 'function' && this.callback(this.instance);
                });
            },
            endnum(value) {
                this.instance && this.instance.update && this.instance.update(value);
            }
        },
        methods: {
            init() {
                if (!this.instance) {

                    const options = {
                        decimal: this.decimal,
                        useEasing: this.useEasing,
                        separator: this.separator,
                        prefix: this.prefix,
                        suffix: this.suffix
                    };

                    this.instance = new CountUp(this.$el, this.startnum, this.endnum, this.decimals, this.duration, options);

                    this.start && this.instance.start(() => {
                        typeof this.callback == 'function' && this.callback(this.instance);
                    });
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.init();
            });
        },
        destroyed() {
            this.instance = null;
        },
//        start(callback) {
//            if (this.instance && this.instance.start) {
//                this.instance.start(() => {
//                    callback && callback(this.instance);
//                });
//            }
//        },
//        pauseResume() {
//            if (this.instance && this.instance.pauseResume) {
//                this.instance.pauseResume();
//            }
//        },
//        reset() {
//            if (this.instance && this.instance.reset) {
//                this.instance.reset();
//            }
//        },
//        update(newEndVal) {
//            if (this.instance && this.instance.update) {
//                this.instance.update(newEndVal);
//            }
//        }
    };
</script>
