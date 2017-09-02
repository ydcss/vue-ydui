<template>
    <div v-show="show" @click.stop="backtop">
        <slot v-if="!!$slots.default"></slot>
        <div v-else class="yd-backtop"></div>
    </div>
</template>

<script type="text/babel">
    import {scrollTop, getScrollview} from '../../../utils/assist';

    export default {
        name: 'yd-backtop',
        data() {
            return {
                show: false
            }
        },
        methods: {
            backtop() {
                const top = this.scrollView === window ? document.body.scrollTop : this.scrollView.scrollTop;
                scrollTop(this.scrollView, top, 0);
            },
            scrollHandler() {
                let offsetTop = window.pageYOffset;
                let offsetHeight = window.innerHeight;

                if (this.scrollView !== window) {
                    offsetTop = this.scrollView.scrollTop;
                    offsetHeight = this.scrollView.offsetHeight;
                }

                this.show = offsetTop >= offsetHeight / 2;
            },
            throttle(method, context) {
                clearTimeout(method.tId);
                method.tId = setTimeout(() => {
                    method.call(context);
                }, 50);
            },
            throttledCheck() {
                this.throttle(this.scrollHandler);
            }
        },
        mounted() {
            this.scrollView = getScrollview(this.$el);

            this.scrollView.addEventListener('scroll', this.throttledCheck, false);
            this.scrollView.addEventListener('resize', this.scrollHandler, false);
        },
        destroyed() {
            this.scrollView.removeEventListener('scroll', this.throttledCheck, false);
            this.scrollView.removeEventListener('resize', this.scrollHandler, false);
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/backtop.less';
</style>
