<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="CheckBox">
            <router-link to="/cr" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <div class="yd-cell-title demo-small-pitch">单独使用 - {{checkbox1}}</div>
        <yd-cell-group>
            <yd-cell-item>
                <yd-checkbox v-model="checkbox1" slot="left">啦啦啦啦</yd-checkbox>
            </yd-cell-item>
        </yd-cell-group>

        <div class="yd-cell-title">true-value & false-value - {{checkbox2}}</div>
        <yd-cell-group>
            <yd-cell-item>
                <yd-checkbox v-model="checkbox2" slot="left" true-value="aaa" false-value="bbb">啦啦啦啦</yd-checkbox>
            </yd-cell-item>
        </yd-cell-group>

        <div class="yd-cell-title">值和标签一致 -> {{checkbox3}}</div>
        <yd-cell-group>
            <yd-cell-item>
                <yd-checkbox-group v-model="checkbox3" slot="left" :callback="fn">
                    <yd-checkbox val="啦啦啦"></yd-checkbox>
                    <yd-checkbox val="啊啊啊"></yd-checkbox>
                    <yd-checkbox val="喔喔喔"></yd-checkbox>
                </yd-checkbox-group>
            </yd-cell-item>
        </yd-cell-group>

        <div class="yd-cell-title">值和标签不同 -> {{checkbox4}}</div>
        <yd-cell-group>
            <yd-cell-item>
                <yd-checkbox-group v-model="checkbox4" slot="left">
                    <yd-checkbox val="1">啦啦啦</yd-checkbox>
                    <yd-checkbox val="2">啊啊啊</yd-checkbox>
                    <yd-checkbox val="3">喔喔喔</yd-checkbox>
                </yd-checkbox-group>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="禁用">
            <yd-cell-item>
                <yd-checkbox-group v-model="checkbox5" slot="left">
                    <yd-checkbox val="1">啦啦啦</yd-checkbox>
                    <yd-checkbox val="2" disabled>啊啊啊</yd-checkbox>
                    <yd-checkbox val="3" disabled>喔喔喔</yd-checkbox>
                </yd-checkbox-group>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="自定义图标颜色">
            <yd-cell-item>
                <yd-checkbox-group v-model="checkbox6" slot="left" color="#F00">
                    <yd-checkbox val="1">啦啦啦</yd-checkbox>
                    <yd-checkbox val="2">啊啊啊</yd-checkbox>
                    <yd-checkbox val="3">喔喔喔</yd-checkbox>
                </yd-checkbox-group>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="圆形图标">
            <yd-cell-item>
                <yd-checkbox-group v-model="checkbox7" slot="left">
                    <yd-checkbox val="1" shape="circle">啦啦啦</yd-checkbox>
                    <yd-checkbox val="2" shape="circle">啊啊啊</yd-checkbox>
                    <yd-checkbox val="3" shape="circle">喔喔喔</yd-checkbox>
                </yd-checkbox-group>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="自定义图标大小">
            <yd-cell-item>
                <yd-checkbox-group v-model="checkbox8" slot="left" size="30">
                    <yd-checkbox val="1"><span style="font-size: 24px;">男</span></yd-checkbox>
                    <yd-checkbox val="2"><span style="font-size: 24px;">女</span></yd-checkbox>
                    <yd-checkbox val="3"><span style="font-size: 24px;">未知</span></yd-checkbox>
                </yd-checkbox-group>
            </yd-cell-item>
        </yd-cell-group>
    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                checkbox1: true,
                checkbox2: 'aaa',
                checkbox3: [],
                checkbox4: ["2"],
                checkbox5: ["1"],
                checkbox6: ["1"],
                checkbox7: ["3"],
                checkbox8: ["3"],
            }
        },
        methods: {
            fn(val) {
                console.log(val);
            }
        }
    }
</script>
