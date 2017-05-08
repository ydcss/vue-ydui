<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="Switch">
            <router-link to="/cr" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <div class="demo-cr demo-small-pitch">
            <yd-switch v-model="switch1"></yd-switch>
            <span>值为：{{switch1}}</span>
        </div>

        <div class="demo-cr demo-small-pitch">
            <yd-switch v-model="switch2" disabled></yd-switch>
            <span>禁用：{{switch2}}</span>
        </div>

        <div class="demo-cr demo-small-pitch">
            <yd-switch v-model="switch3" color="#F00"></yd-switch>
            <span>自定义颜色：{{switch3}}</span>
        </div>

        <yd-cell-group title="结合Cell组件" class="demo-small-pitch">
            <yd-cell-item type="label">
                <span slot="left">值为：{{switch4}}</span>
                <yd-switch slot="right" v-model="switch4"></yd-switch>
            </yd-cell-item>
            <p slot="bottom" style="text-align:right;padding: .05rem .24rem;color:#555;">设置属性type为label即可点击整行控制switch组件</p>
        </yd-cell-group>
    </yd-layout>

</template>

<script type="text/babel">
    export default {
        data() {
            return {
                switch1: false,
                switch2: true,
                switch3: true,
                switch4: true
            }
        }
    }
</script>
