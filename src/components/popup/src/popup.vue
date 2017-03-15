<template>
    <div>
        <div class="m-popup-mask" v-show="show" @click.stop="close"></div>
        <div :class="classes()" :style="styles()">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    import {addClass, removeClass, getScrollview} from '../../../utils/assist';

    export default {
        name: 'yd-popup',
        data() {
            return {
                show: false
            }
        },
        props: {
            position: {
                type: String,
                validator(value) {
                    return ['bottom', 'center', 'left', 'right'].indexOf(value) > -1;
                },
                default: 'bottom'
            },
            height: {
                type: String,
                default: '50%'
            },
            width: {
                type: String,
                default: '50%'
            },
            value: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            value(val) {
                val && this.isIOS && addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');

                this.show = val;
            }
        },
        methods: {
            styles() {
                if (this.position == 'left' || this.position == 'right') {
                    return {width: this.width};
                } else if (this.position == 'bottom') {
                    return {width: '100%', height: this.height};
                } else {
                    return {width: this.width};
                }
            },
            classes() {
                return (this.position == 'center' ? 'm-popup-center ' : 'm-popup ') +
                        (this.show ? 'popup-show ' : '') +
                        'popup-' + this.position;
            },
            close() {
                this.isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');

                this.show = false;
                this.$emit('input', false);
            }
        },
        mounted() {
            this.scrollView = getScrollview(this.$el);

            this.isIOS = !!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/popup.less';
</style>
