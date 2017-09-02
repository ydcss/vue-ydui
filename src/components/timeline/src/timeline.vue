<template>
    <div class="yd-timeline">
        <ul class="yd-timeline-content">
            <slot></slot>
        </ul>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-timeline',
    }
</script>

<style lang="less">
    @import '../../../styles/components/timeline.less';
</style>
