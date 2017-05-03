<template>
    <yd-layout title="Input">

        <yd-cell-group class="demo-small-pitch">
            <yd-cell-item>
                <span slot="left">用户名：</span>
                <yd-input slot="right" required v-model="input1" max="20" placeholder="请输入用户名"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">密码：</span>
                <yd-input slot="right" type="password" v-model="input2" placeholder="请输入密码"></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="验证 - 内置正则">
            <yd-cell-item>
                <span slot="left">邮箱：</span>
                <yd-input slot="right" v-model="input3" regex="email" placeholder="请输入邮箱地址"></yd-input>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">手机号：</span>
                <yd-input slot="right" v-model="input4" regex="mobile" placeholder="请输入手机号码"></yd-input>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">银行卡号：</span>
                <yd-input slot="right" v-model="input5" regex="bankcard" placeholder="请输入银行卡号"></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="验证 - 自定义正则">
            <yd-cell-item>
                <span slot="left">QQ：</span>
                <yd-input slot="right" v-model="input6" regex="^\d{5,12}$" placeholder="请输入您的QQ号码"></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="不显示清空图标">
            <yd-cell-item>
                <span slot="left">姓名：</span>
                <yd-input slot="right" v-model="input7" required :showClearIcon="false" placeholder="请输入您的姓名"></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="不显示正确或错误图标">
            <yd-cell-item>
                <span slot="left">手机号：</span>
                <yd-input slot="right" v-model="input8" required :showSuccessIcon="false" :showErrorIcon="false" regex="mobile" placeholder="请输入手机号码"></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="获取验证结果">
            <yd-cell-item>
                <span slot="left">手机号：</span>
                <yd-input slot="right" v-model="input9" ref="input9" required regex="mobile" placeholder="请输入手机号码"></yd-input>
            </yd-cell-item>
            <p slot="bottom" style="color:#F00;padding: 0 .3rem;" v-html="result"></p>
        </yd-cell-group>

        <yd-button-group>
            <yd-button size="large" @click.native="clickHander">显示上方手机号验证结果</yd-button>
        </yd-button-group>
    </yd-layout>

</template>

<script type="text/babel">
    export default {
        data() {
            return {
                input1: '',
                input2: '',
                input3: 'ydui@qq.com',
                input4: '',
                input5: '',
                input6: '',
                input7: '',
                input8: '',
                input9: '',
                result: ''
            }
        },
        methods: {
            clickHander() {
                const input = this.$refs.input9;
                this.result = `{<br />&nbsp;&nbsp;valid：${input.valid}，<br />&nbsp;&nbsp;errorMes：'${input.errorMsg}'，<br />&nbsp;&nbsp;errorCode：'${input.errorCode}'<br />}`;
            }
        }
    }
</script>
