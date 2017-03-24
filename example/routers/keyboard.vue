<template>
    <yd-layout title="KeyBoard">

        <yd-button-group>
            <yd-button size="large" type="primary" @click.native="show1 = true">打开</yd-button>
            <yd-button size="large" type="primary" @click.native="show2 = true">打开 - 打乱键盘顺序</yd-button>
        </yd-button-group>

        <yd-keyboard v-model="show1" :input-done="done1"></yd-keyboard>

        <yd-keyboard v-model="show2" :input-done="done2" disorder></yd-keyboard>
    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                show1: false,
                show2: false
            }
        },
        methods: {
            done1(val) {
                console.log('输入的密码是：' + val);
                this.$dialog.loading.open('验证支付密码');

                setTimeout(() => {
                    this.$yduiBus.$emit('ydui.keyboard.error', '对不起，您的支付密码不正确，请重新输入。');
                    this.$dialog.loading.close();
                }, 2000);
            },
            done2(val) {
                console.log('输入的密码是：' + val + ' - 无序');
                this.$dialog.loading.open('验证支付密码');

                setTimeout(() => {
                    this.$yduiBus.$emit('ydui.keyboard.error', '对不起，您的支付密码不正确，请重新输入。');
                    this.$dialog.loading.close();
                }, 2000);
            }
        }
    }
</script>
