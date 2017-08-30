<template>
    <yd-sendcode-button
            :size="size"
            :type="type"
            :disabled="start"
            :class="start ? 'btn-disabled' : ''"
            :style="{backgroundColor: bgcolor, color: color}"
    >{{tmpStr}}
    </yd-sendcode-button>
</template>

<script type="text/babel">
    import Button from '../../button/src/button.vue';

    export default {
        name: 'yd-sendcode',
        extends: Button,
        components: {
            'yd-sendcode-button': Button
        },
        data() {
            return {
                tmpStr: '获取短信验证码',
                timer: null,
                start: false,
                runSecond: this.second
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
            },
            storageKey: {
                type: String
            }
        },
        methods: {
            run(lastSecond) {
                let second = lastSecond ? lastSecond : this.runSecond;

                if (this.storageKey) {
                    const runSecond = new Date().getTime() + second * 1000;
                    window.sessionStorage.setItem(this.storageKey, runSecond);
                }

                if (!lastSecond) {
                    this.tmpStr = this.getStr(second);
                }

                this.timer = setInterval(() => {
                    second--;
                    this.tmpStr = this.getStr(second);
                    second <= 0 && this.stop();
                }, 1000);
            },
            stop() {
                this.tmpStr = this.resetStr;
                this.start = false;
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
        created() {
            const lastSecond = ~~((window.sessionStorage.getItem(this.storageKey) - new Date().getTime()) / 1000);
            if (lastSecond > 0 && this.storageKey) {
                this.tmpStr = this.getStr(lastSecond);
                this.start = true;
                this.run(lastSecond);
            } else {
                if (this.initStr) this.tmpStr = this.initStr;
            }
        },
        destroyed() {
            !this.storageKey && this.stop();
        }
    }
</script>
