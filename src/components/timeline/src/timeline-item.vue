<template>
    <li :class="!!$slots.icon ? 'yd-timeline-custom-item' : 'yd-timeline-item'">
        <template v-if="!!$slots.icon">
            <span class="yd-timeline-icon"><slot name="icon"></slot></span>
        </template>
        <template v-else>
            <em class="yd-timeline-icon"></em>
        </template>
        <slot></slot>
    </li>
</template>

<script type="text/babel">
    export default {
        name: 'yd-timeline-item'
    }
</script>
