<template>
    <div class="yd-mask" :style="styles"><slot></slot></div>
</template>

<script type="text/babel">
    import {addClass, removeClass, getScrollview, isIOS} from '../../../utils/assist';

    export default {
        name: 'yd-mask',
        data() {
            return {
                show: this.value
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            bgcolor: {
                type: String,
                default: '#000'
            },
            zindex: {
                default: 1500
            },
            opacity: {
                default: .5
            },
            animated: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            value(val) {
                this.show = val;
                if (isIOS) {
                    if (val) {
                        addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    } else {
                        setTimeout(() => {
                            removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                        }, 200);
                    }
                }
            }
        },
        computed: {
            styles() {
                const style = {'z-index': this.zindex, 'background-color': this.bgcolor};
                if (this.show) {
                    style['opacity'] = this.opacity;
                    style['pointer-events'] = 'auto';
                }
                return style;
            }
        },
        mounted() {
            this.scrollView = getScrollview(this.$el);
        },
        beforeDestroy() {
            isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/mask.less';
</style>
