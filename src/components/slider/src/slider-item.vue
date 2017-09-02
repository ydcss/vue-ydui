<template>
    <div class="yd-slider-item">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-slider-item',
        mounted() {
            this.$nextTick(this.$parent.init);
        }
    }
</script>
