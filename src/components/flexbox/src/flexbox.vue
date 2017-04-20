<template>
    <div class="m-flexbox" :class="direction == 'vertical' ? 'flexbox-vertical' : 'flexbox-horizontal'">
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
