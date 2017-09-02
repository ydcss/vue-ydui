<template>
    <div>
        <slot name="list"></slot>

        <div ref="tag" style="height: 1px;"></div>

        <div class="yd-list-loading" v-if="!isDone">
            <div v-show="isLoading">
                <slot name="loadingTip">
                    <loading></loading>
                </slot>
            </div>
        </div>

        <div class="yd-list-donetip" v-show="!isLoading && isDone">
            <slot name="doneTip">没有更多数据了</slot>
        </div>
    </div>
</template>

<script type="text/babel">
    import Loading from './loading.vue';
    import {getScrollview} from '../../../utils/assist';

    export default {
        name: 'yd-infinitescroll',
        components: {Loading},
        data() {
            return {
                isLoading: false,
                isDone: false,
                num: 1
            }
        },
        props: {
            onInfinite: {
                type: Function
            },
            callback: {
                type: Function
            },
            distance: {
                default: 0,
                validator(val) {
                    return /^\d*$/.test(val);
                }
            },
            scrollTop: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            init() {
                this.scrollview = getScrollview(this.$el);

                if (this.scrollTop) {
                    if (this.scrollview === window) {
                        window.scrollTo(0, 0)
                    } else {
                        this.scrollview.scrollTop = 0;
                    }
                }

                this.scrollview.addEventListener('scroll', this.throttledCheck, false);

                this.$on('ydui.infinitescroll.loadedDone', () => {
                    this.isLoading = false;
                    this.isDone = true;
                });

                this.$on('ydui.infinitescroll.finishLoad', (ret) => {
                    this.isLoading = false;
                });

                this.$on('ydui.infinitescroll.reInit', () => {
                    this.isLoading = false;
                    this.isDone = false;
                });
            },
            scrollHandler() {
                if (this.isLoading || this.isDone) return;

                const scrollview = this.scrollview;
                const contentHeight = document.body.offsetHeight;
                const isWindow = scrollview === window;
                const offsetTop = isWindow ? 0 : scrollview.getBoundingClientRect().top;
                const scrollviewHeight = isWindow ? contentHeight : scrollview.offsetHeight;

                if (!scrollview) {
                    console.warn('Can\'t find the scrollview!');
                    return;
                }

                if (!this.$refs.tag) {
                    console.warn('Can\'t find the refs.tag!');
                    return;
                }

                const tagOffsetTop = Math.floor(this.$refs.tag.getBoundingClientRect().top) - 1;
                const distance = !!this.distance && this.distance > 0 ? ~~this.distance : Math.floor(contentHeight / 10);

                if (tagOffsetTop > offsetTop && tagOffsetTop - (distance + offsetTop) * this.num <= contentHeight && this.$el.offsetHeight > scrollviewHeight) {
                    this.isLoading = true;
                    // TODO 参数更名，即将删除
                    this.onInfinite && this.onInfinite();
                    this.callback && this.callback();
                    this.num++;
                }
            },
            throttle(method, context) {
                clearTimeout(method.tId);
                method.tId = setTimeout(() => {
                    method.call(context);
                }, 30);
            },
            throttledCheck() {
                this.throttle(this.scrollHandler);
            }
        },
        mounted() {
            this.$nextTick(this.init);
        },
        destroyed() {
            this.scrollview.removeEventListener('scroll', this.throttledCheck);
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/infinitescroll.less';
</style>
