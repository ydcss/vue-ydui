<template>
    <div class="m-accordion">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-accordion',
        methods: {
            toggle(uid) {
                this.$children.forEach(item => {
                    if (item._uid == uid) {
                        item.show = !item.show;
                    } else {
                        item.show = false;
                        item.height = 0;
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/accordion.less";
</style>
