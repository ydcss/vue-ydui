<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="Radio">
            <router-link to="/cr" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-cell-group class="demo-small-pitch">
            <div class="yd-cell-title">值和标签一致 - 【值：{{radio1}}】</div>
            <yd-cell-item>
                <yd-radio-group v-model="radio1" slot="left">
                    <yd-radio val="啦啦啦"></yd-radio>
                    <yd-radio val="啊啊啊"></yd-radio>
                    <yd-radio val="喔喔喔"></yd-radio>
                </yd-radio-group>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
            <div class="yd-cell-title">值和标签不同 - 【值：{{radio2}}】</div>
            <yd-cell-item>
                <yd-radio-group v-model="radio2" slot="left">
                    <yd-radio val="1">啦啦啦</yd-radio>
                    <yd-radio val="2">啊啊啊</yd-radio>
                    <yd-radio val="3">喔喔喔</yd-radio>
                </yd-radio-group>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="禁用">
            <yd-cell-item>
                <yd-radio-group v-model="radio3" slot="left">
                    <yd-radio val="啦啦啦"></yd-radio>
                    <yd-radio val="啊啊啊"></yd-radio>
                    <yd-radio val="喔喔喔" disabled></yd-radio>
                </yd-radio-group>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="自定义图标颜色">
            <yd-cell-item>
                <yd-radio-group v-model="radio4" color="#F00" slot="left">
                    <yd-radio val="啦啦啦"></yd-radio>
                    <yd-radio val="啊啊啊"></yd-radio>
                    <yd-radio val="喔喔喔"></yd-radio>
                </yd-radio-group>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="自定义图标大小">
            <yd-cell-item>
                <yd-radio-group v-model="radio5" size="30" slot="left">
                    <yd-radio val="1"><span style="font-size: 24px;">男</span></yd-radio>
                    <yd-radio val="2"><span style="font-size: 24px;">女</span></yd-radio>
                    <yd-radio val="3"><span style="font-size: 24px;">未知</span></yd-radio>
                </yd-radio-group>
            </yd-cell-item>
        </yd-cell-group>
    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                radio1: '啦啦啦',
                radio2: 2,
                radio3: '喔喔喔',
                radio4: '啊啊啊',
                radio5: 2
            }
        }
    }
</script>
