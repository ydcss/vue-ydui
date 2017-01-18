<template>
    <footer class="m-tabbar" :class="classes">
        <slot></slot>
    </footer>
</template>

<script type="text/babel">
    export default {
        name: 'yd-tabbar',
        props: {
            fixed: Boolean
        },
        computed: {
            classes() {
                return this.fixed ? 'tabbar-fixed' : '';
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/tabbar.less';
</style>
