<template>
    <div class="yd-tab-panel-item" :class="classes">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-tab-panel',
        data() {
            return {
                isCurrent: false
            }
        },
        props: {
            badge: String,
            badgeColor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#FFF'
            },
            badgeBgcolor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#F6514B'
            },
            badgeScale: {
                validator(val) {
                    return /^(\d*(.\d+)?)$/.test(val);
                },
                default: .7
            },
            dot: {
                type: Boolean,
                default: false
            },
            dotColor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#F6514B'
            },
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
            },
            badge() {
                this.$parent.init();
            },
            badgeColor() {
                this.$parent.init();
            },
            badgeScale() {
                this.$parent.init();
            },
            badgeBgcolor() {
                this.$parent.init();
            },
            dot() {
                this.$parent.init();
            },
            dotColor() {
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
