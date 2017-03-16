<template>
    <img :src="defaultSrc" :datasrc="src">
</template>

<script type="text/babel">
    // TODO 还未完善
    import {getScrollview, checkInview} from '../../../utils/assist';

    export default {
        name: 'yd-lazyimg',
        props: {
            src: {
                type: String
            },
            defaultSrc: {
                type: String,
                default: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
            }
        },
        methods: {
            init() {
                this.scrollview = getScrollview(this.$el);

                this.scrollHandler();

                this.bindEvent();
            },
            scrollHandler() {
                if (checkInview(this.scrollview, this.$el)) {
                    this.$el.setAttribute('src', this.$el.getAttribute('datasrc'));
                    this.unbindEvent();
                }
            },
            bindEvent() {
                this.scrollview.addEventListener('scroll', this.scrollHandler);
                window.addEventListener('resize', this.scrollHandler);
            },
            unbindEvent() {
                this.scrollview.removeEventListener('scroll', this.scrollHandler);
                window.removeEventListener('resize', this.scrollHandler);
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.init();
            });
        },
        destoryed() {
            this.unbindEvent();
        }
    }
</script>
