<template>
    <div>
        <div class="mask-actionsheet" v-show="show" @click.stop="close"></div>
        <div class="m-actionsheet" :class="show ? 'actionsheet-active' : ''">
            <a v-for="item in items" @click.stop="itemClick(item)" href="javascript:;" class="actionsheet-item" >{{item.label}}</a>
            <a v-if="cancel" @click.stop="close" href="javascript:;" class="actionsheet-action">{{cancel}}</a>
        </div>
    </div>
</template>

<script type="text/babel">
    import {addClass, removeClass, getScrollview, pageScroll} from '../../../utils/assist';

    export default {
        name: 'yd-actionsheet',
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
            items: {
                type: Array,
                require: true
            },
            cancel: String
        },
        watch: {
            value(val) {
                if (this.isIOS) {
                    if (val) {
                        pageScroll.lock();
                        addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    } else {
                        pageScroll.unlock();
                        removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    }
                }

                this.show = val;
            }
        },
        methods: {
            itemClick(item) {
                if(item) {
                    typeof item.method == 'function' && item.method(item);
                    !item.stay && this.close();
                }
            },
            close() {
                this.isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');

                this.$emit('input', false);
            }
        },
        destroyed() {
            this.close();
        },
        mounted() {
            this.scrollView = getScrollview(this.$el);

            this.isIOS = !!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/actionsheet.less";
</style>
