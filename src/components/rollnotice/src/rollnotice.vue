<template>
    <div class="m-rollnotice" :style="{height: height + 'px'}">
        <div class="rollnotice-box" :style="styles">
            <div class="rollnotice-item" v-html="lastItem"></div>
            <slot></slot>
            <div class="rollnotice-item" v-html="firtstItem"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-rollnotice',
        data() {
            return {
                timer: null,
                index: 1,
                totalNum: 0,
                lastItem: '',
                firtstItem: '',
                styles: {
                    transform: 0,
                    transitionDuration: 0
                },
            }
        },
        props: {
            ready: {
                type: Boolean,
                default: false
            },
            height: {
                validator(val) {
                    return /^\d*$/.test(val);
                },
                default: 30
            },
            speed: {
                validator(val) {
                    return /^\d*$/.test(val);
                },
                default: 500
            },
            autoplay: {
                validator(val) {
                    return /^\d*$/.test(val);
                },
                default: 3000
            },
        },
        methods: {
            init() {
                this.items = this.$children.filter(item => item.$options.name === 'yd-rollnotice-item');

                this.totalNum = this.items.length;

                if (this.totalNum <= 0) return;

                this.cloneItem();

                this.autoPlay();
            },
            cloneItem() {
                const itemArr = this.items;
                this.firtstItem = itemArr[0].$el.innerHTML;
                this.lastItem = itemArr[itemArr.length - 1].$el.innerHTML;

                this.setTranslate(0, -this.height);
            },
            autoPlay() {
                this.timer = setInterval(() => {

                    if (this.index > this.totalNum) {
                        this.index = 1;
                        this.setTranslate(0, -this.height);
                        setTimeout(() => {
                            this.setTranslate(this.speed, -(++this.index * this.height));
                        }, 10);
                        return;
                    }
                    this.setTranslate(this.speed, -(++this.index * this.height));
                }, this.autoplay);
            },
            setTranslate(speed, translate) {
                this.styles.transitionDuration = speed + 'ms';
                this.styles.transform = 'translate3d(0, ' + translate + 'px, 0)';
            }
        },
        mounted() {
            this.$nextTick(this.init);
        },
        destroyed() {
            clearInterval(this.timer);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/rollnotice.less";
</style>
