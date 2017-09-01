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
                validator(val) {
                    return /^([0]|[1-9]\d*)(\.\d*)?$/.test(val);
                },
                default: 0
            },
            endnum: {
                validator(val) {
                    return /^([0]|[1-9]\d*)(\.\d*)?$/.test(val);
                },
                required: true
            },
            decimals: {
                validator(val) {
                    return /^\d*$/.test(val);
                },
                default: 0
            },
            duration: {
                validator(val) {
                    return /^([0]|[1-9]\d*)(\.\d*)?$/.test(val);
                },
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
                    this.callback && this.callback(this.instance);
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
                        decimal: '.',
                        useEasing: this.useEasing,
                        separator: this.separator,
                        prefix: this.prefix,
                        suffix: this.suffix
                    };

                    this.instance = new CountUp(this.$el, this.startnum, this.endnum, this.decimals, this.duration, options);

                    this.start && this.instance.start(() => {
                        this.callback && this.callback(this.instance);
                    });
                }
            }
        },
        mounted() {
            this.init();
        },
        destroyed() {
            this.instance = null;
        }
    };
</script>
