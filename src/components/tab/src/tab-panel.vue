<template>
    <div class="tab-panel-item" :class="classes">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-tab-panel',
        props: {
            label: String,
            active: Boolean
        },
        computed: {
            classes() {
                return this.$parent.activeIndex == this._uid ? 'tab-active' : '';
            }
        }
    }
</script>
