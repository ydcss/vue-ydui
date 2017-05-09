<template>
    <div>
        <slot name="list"></slot>
        <div ref="tag"></div>

        <div class="list-donetip" v-show="!isLoading && isDone">
            <slot name="doneTip">没有更多数据了</slot>
        </div>

        <div class="list-loading" v-show="isLoading">
            <slot name="loadingTip">加载中</slot>
        </div>
    </div>
</template>

<script type="text/babel">
    import Vue from 'vue';
    import {getScrollview} from '../../../utils/assist';

    export default {
        name: 'yd-infinitescroll',
        data() {
            return {
                isLoading: false,
                isDone: false
            }
        },
        props: {
            onInfinite: {
                type: Function,
                required: true
            }
        },
        methods: {
            init() {
                this.scrollview = getScrollview(this.$el);

                this.scrollview.addEventListener('scroll', () => {
                    this.throttle(this.scrollHandler);
                });

                this.$on('ydui.infinitescroll.loadedDone', () => {
                    this.isLoading = false;
                    this.isDone = true;
                });

                this.$on('ydui.infinitescroll.finishLoad', () => {
                    this.isLoading = false;
                });

                this.$on('ydui.infinitescroll.reInit', () => {
                    this.isLoading = false;
                    this.isDone = false;
                });
            },
            scrollHandler() {
                if (this.isLoading || this.isDone)return;

                const scrollview = this.scrollview;

                let contentHeight = document.body.offsetHeight;
                let offsetTop = 0;

                if(!scrollview) {
                    console.error('Can\'t find the scrollview!');
                    return;
                }

                if(!this.$refs.tag) {
                    console.error('Can\'t find the refs.tag!');
                    return;
                }

                if (scrollview != window) {
                    contentHeight = scrollview.offsetHeight;
                    offsetTop = scrollview.getBoundingClientRect().top;
                }

                const tagOffsetTop = this.$refs.tag.getBoundingClientRect().top;
                if (tagOffsetTop > offsetTop && tagOffsetTop <= offsetTop + contentHeight + contentHeight / 10) {
                    this.isLoading = true;
                    this.onInfinite();
                }
            },
            throttle(method, context) {
                clearTimeout(method.tId);
                method.tId = setTimeout(() => {
                    method.call(context);
                }, 100);
            }
        },
        mounted() {
            this.$nextTick(this.init);
        },
        destroyed() {
            this.scrollview.removeEventListener('scroll', this.scrollHandler);
        }
    }
</script>
