<template>
    <div class="scrolltab-content-item">
        <strong class="scrolltab-content-title">{{label}}</strong>
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-scrolltab-panel',
        props: {
            label: String,
            icon: String,
            active: Boolean
        }
    }
</script>
