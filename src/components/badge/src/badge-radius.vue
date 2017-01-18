<template>
    <span class="badge badge-radius" :class="typesClass" :style="{backgroundColor: bgcolor, color: color}">
        <slot></slot>
    </span>
</template>

<script type="text/babel">
    import Badge from './badge.vue';

    export default {
        name: 'yd-badge-radius',
        extends: Badge
    }
</script>
