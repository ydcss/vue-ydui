<template>
    <div class="m-rollnotice" :style="{height: height + 'px'}">
        <div class="rollnotice-box" :style="styles" :class="'align-' + align">
            <slot></slot>
            <p class="rollnotice-item" v-html="firtstItem"></p>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-rollnotice',
        data() {
            return {
                timer: null,
                index: 0,
                totalNum: 0,
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
                default: true
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
            align: {
                validator(value) {
                    return ['left', 'center', 'right'].indexOf(value) > -1;
                },
                default: 'left'
            }
        },
        watch: {
            ready(val) {
                val && setTimeout(this.init, 0);
            }
        },
        methods: {
            init() {
                if (!this.ready) return;

                this.items = this.$children.filter(item => item.$options.name === 'yd-rollnotice-item');

                this.totalNum = this.items.length;

                if (this.totalNum <= 0) return;

                this.firtstItem = this.items[0].$el.innerHTML;

                this.autoPlay();
            },
            autoPlay() {
                this.timer = setInterval(() => {
                    this.setTranslate(this.speed, -(++this.index * this.height));

                    if (this.index >= this.totalNum) {
                        this.index = 0;
                        setTimeout(() => {
                            this.setTranslate(0, 0);
                        }, this.speed);
                    }

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
