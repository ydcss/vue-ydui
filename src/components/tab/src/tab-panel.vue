<template>
    <div class="yd-tab-panel-item" :class="classes">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-tab-panel',
        props: {
            label: String,
            active: Boolean,
            tabkey: [String, Number]
        },
        computed: {
            classes() {
                return this.$parent.activeIndex == this._uid ? 'yd-tab-active' : '';
            }
        },
        watch: {
            active() {
                this.$parent.init(true);
            },
            label() {
                this.$parent.init('label')
            }
        }
    }
</script>
