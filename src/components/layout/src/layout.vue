<template>
    <section class="yd-flexview">
        <slot name="navbar" v-if="showNavbar">
            <yd-navbar :title="title" v-if="!!title">
                <router-link :to="link || '/'" slot="left">
                    <yd-navbar-back-icon></yd-navbar-back-icon>
                </router-link>
            </yd-navbar>
        </slot>

        <slot name="top"></slot>

        <section class="yd-scrollview" ref="scrollView" id="scrollView">
            <slot></slot>
        </section>

        <slot name="bottom"></slot>

        <slot name="tabbar"></slot>
    </section>
</template>

<script type="text/babel">
    export default {
        name: 'yd-layout',
        props: {
            link: String,
            title: String,
            showNavbar: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/layout.less";
</style>
