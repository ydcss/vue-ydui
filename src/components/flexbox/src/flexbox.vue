<template>
    <div class="yd-flexbox" :class="direction == 'vertical' ? 'yd-flexbox-vertical' : 'yd-flexbox-horizontal'">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-flexbox',
        props: {
            direction: {
                validator(value) {
                    return ['horizontal', 'vertical'].indexOf(value) > -1;
                },
                default: 'horizontal'
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/flexbox.less';
</style>
