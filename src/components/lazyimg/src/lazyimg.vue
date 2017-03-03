<template>
    <img :dataSrc="src">
</template>

<script type="text/babel">
    import {getScrollview, checkInview} from '../../../utils/assist';

    export default {
        name: 'yd-lazyimg',
        props: {
            src: {
                type: String
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
                    this.$el.setAttribute('src', this.$el.getAttribute('dataSrc'));
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
            this.init();
        },
        destoryed() {
            this.unbindEvent();
        }
    }
</script>
