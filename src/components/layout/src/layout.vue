<template>
    <section class="g-flexview">
        <slot name="navbar" v-if="showNavbar">
            <yd-navbar :title="title" v-if="!!title">
                <router-link :to="link || '/'" slot="left">
                    <yd-navbar-back-icon></yd-navbar-back-icon>
                </router-link>
            </yd-navbar>
        </slot>

        <section class="g-scrollview" :class="iosScrollBug">
            <slot></slot>
        </section>

        <slot name="tabbar"></slot>
    </section>
</template>

<script type="text/babel">
    export default {
        name: 'yd-layout',
        data() {
            return {
                iosScrollBug: ''
            }
        },
        props: {
            link: String,
            title: String,
            showNavbar: {
                type: Boolean,
                default: true
            }
        },
        mounted() {
            if(!!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                this.iosScrollBug = 'g-fix-ios-overflow-scrolling-bug';
            }
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/layout.less";
</style>
