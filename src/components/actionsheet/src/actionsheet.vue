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
    import {addClass, removeClass, getScrollview, pageScroll, isIOS} from '../../../utils/assist';

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
                if (isIOS) {
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
                    // TODO 参数更名，即将删除
                    typeof item.method === 'function' && item.method(item);
                    typeof item.callback === 'function' && item.callback(item);
                    !item.stay && this.close();
                }
            },
            close() {
                isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');

                this.$emit('input', false);
            }
        },
        destroyed() {
            this.close();
        },
        mounted() {
            this.scrollView = getScrollview(this.$el);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/actionsheet.less";
</style>
