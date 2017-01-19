<template>
    <yd-button :size="size"
               :type="type"
               :disabled="start"
               :class="start ? 'btn-disabled' : ''"
               :style="{backgroundColor: bgcolor, color: color}"
    >
        {{tmpStr}}
    </yd-button>
</template>

<script type="text/babel">
    import Button from '../../button/src/button.vue';

    export default {
        name: 'yd-sendcode',
        extends: Button,
        data() {
            return {
                tmpStr: '获取短信验证码',
                timer: null,
                start: false
            }
        },
        props: {
            initStr: String,
            second: {
                default: 60,
                validator(val) {
                    return /^\d*$/.test(val);
                }
            },
            runStr: {
                type: String,
                default: '{%s}秒后重新获取'
            },
            resetStr: {
                type: String,
                default: '重新获取验证码'
            },
            value: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            run() {
                let second = this.second;
                this.tmpStr = this.getStr(this.second);
                this.timer = setInterval(() => {
                    second--;
                    this.tmpStr = this.getStr(second);
                    second <= 0 && this.stop();
                }, 1000);
            },
            stop() {
                this.tmpStr = this.resetStr;
                this.$emit('input', false);
                clearInterval(this.timer);
            },
            getStr(second) {
                return this.runStr.replace(/\{([^{]*?)%s(.*?)\}/g, second);
            }
        },
        watch: {
            value(val) {
                this.start = val;
                val && this.run();
            }
        },
        mounted() {
            if (this.initStr) this.tmpStr = this.initStr;
        },
        destroyed() {
            this.stop();
        }
    }
</script>
