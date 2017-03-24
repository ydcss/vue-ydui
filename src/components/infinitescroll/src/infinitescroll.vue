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

                this.$yduiBus.$on('ydui.infinitescroll.loadedDone', () => {
                    this.isLoading = false;
                    this.isDone = true;
                });

                this.$yduiBus.$on('ydui.infinitescroll.finishLoad', () => {
                    this.isLoading = false;
                });
            },
            scrollHandler() {
                if (this.isLoading || this.isDone)return;

                const scrollview = this.scrollview;
                const contentHeight = scrollview == window ? document.body.offsetHeight : scrollview.offsetHeight;
                const offsetTop = scrollview == window ? 0 : scrollview.getBoundingClientRect().top;

                if (this.$refs.tag.getBoundingClientRect().top <= offsetTop + contentHeight + contentHeight / 10) {
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
            Vue.prototype.$yduiBus = this.$yduiBus || new Vue();
            this.$nextTick(this.init);
        },
        destroyed() {
            this.scrollview.removeEventListener('scroll', this.scrollHandler);
        }
    }
</script>
