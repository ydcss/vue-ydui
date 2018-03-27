<template>
    <div class="yd-tab-panel-item" :class="classes">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-tab-panel',
        data() {
            return {
                isCurrent: false
            }
        },
        props: {
            label: String,
            active: Boolean,
            tabkey: [String, Number]
        },
        computed: {
            classes() {
                return this.$parent.activeIndex === this._uid || this.isCurrent ? 'yd-tab-active' : '';
            }
        },
        watch: {
            active() {
                this.$parent.init();
            },
            label() {
                this.$parent.init();
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$parent.init();
            });
        }
    }
</script>
