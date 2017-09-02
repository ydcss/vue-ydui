<template>

    <yd-layout title="Cell">

        <yd-cell-group class="demo-small-pitch">
            <yd-cell-item>
                <span slot="left">姓名：</span>
                <input slot="right" type="text" placeholder="请输入您的姓名">
            </yd-cell-item>

            <yd-cell-item arrow>
                <input slot="right" type="text" placeholder="请输入您的姓名">
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">配送方式</span>
                <span slot="right">顺丰快递</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="带图标的">
            <yd-cell-item>
                <i slot="icon" class="demo-icons-phone"></i>
                <input slot="right" type="number" pattern="[0-9]*" placeholder="请输入手机号码" autocomplete="off">
                <yd-button slot="right" type="warning">获取短信验证码</yd-button>
            </yd-cell-item>

            <yd-cell-item href="#" type="link">
                <i slot="icon" class="demo-icons-like"></i>
                <span slot="left">我的收藏</span>

                <span slot="right"><yd-badge type="danger">8</yd-badge></span>
            </yd-cell-item>

            <yd-cell-item arrow href="tel:400-888-8888" type="a">
                <i slot="icon" class="demo-icons-tel"></i>
                <span slot="left">联系客服</span>

                <span slot="right">400-888-8888</span>
            </yd-cell-item>

            <yd-cell-item href="#" arrow>
                <i slot="icon" class="demo-icons-order"></i>
                <span slot="left">我的订单</span>

                <span slot="right">查看全部订单</span>
            </yd-cell-item>

            <yd-cell-item href="#" arrow type="link">
                <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png">
                <span slot="left">图标</span>

                <span slot="right">图标是image</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="下拉框">
            <yd-cell-item arrow type="label">
                <select slot="right">
                    <option value="">支付方式</option>
                    <option value="1">支付宝</option>
                    <option value="2">微信</option>
                    <option value="3">财付通</option>
                </select>
            </yd-cell-item>

            <yd-cell-item arrow>
                <span slot="left">性别：</span>
                    <select slot="right">
                        <option value="">请选择性别</option>
                        <option value="1">男</option>
                        <option value="2">女</option>
                        <option value="3">未知</option>
                    </select>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="多选">
            <yd-cell-item type="checkbox">
                <span slot="left">多选一</span>
                <input slot="right" type="checkbox" value="Han MeiMei" v-model="checkedNames"/>
            </yd-cell-item>

            <yd-cell-item type="checkbox">
                <span slot="left">多选二</span>
                <input slot="right" type="checkbox" value="Li Lei" v-model="checkedNames"/>
            </yd-cell-item>

            <yd-cell-item type="checkbox">
                <span slot="left">多选三</span>
                <input slot="right" type="checkbox" value="Jim Green" v-model="checkedNames"/>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">选中的值：</span>
                <span slot="right">{{checkedNames}}</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="单选">
            <yd-cell-item type="radio">
                <span slot="left">单选一</span>
                <input slot="right" type="radio" value="Lili" v-model="picked"/>
            </yd-cell-item>

            <yd-cell-item type="radio">
                <span slot="left">单选二</span>
                <input slot="right" type="radio" value="Lucy" v-model="picked"/>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">选中的值：</span>
                <span slot="right">{{picked}}</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="复选框">
            <yd-cell-item type="label">
                <div slot="left">设为默认地址 - {{ydswitch}}</div>
                <yd-switch slot="right" v-model="ydswitch"></yd-switch>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="文本域">
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="请输入您的银行卡卡号和密码" maxlength="100"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

    </yd-layout>

</template>

<script type="text/babel">
    export default {
        data() {
            return {
                checkedNames: ['Han MeiMei'],
                picked: 'Lucy',
                ydswitch: true
            }
        }
    }
</script>
