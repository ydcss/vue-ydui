<template>
    <header class="m-navbar" :class="classes">
        <div class="navbar-item">
            <slot name="left"></slot>
        </div>
        <div class="navbar-center-box">
            <div class="navbar-center">
                <slot name="center"><span class="center-title">{{title}}</span></slot>
            </div>
        </div>
        <div class="navbar-item">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script type="text/babel">
    export default {
        name: 'yd-navbar',
        props: {
            title: String,
            fixed: Boolean
        },
        computed: {
            classes() {
                return this.fixed ? 'navbar-fixed' : '';
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/navbar.less';
</style>
