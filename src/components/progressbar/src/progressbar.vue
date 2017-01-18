<template>
    <div class="m-progressbar">
        <div class="progressbar-content" v-if="type != 'line'">{{progress * 100}}%</div>
        <svg :viewBox="viewBox" v-show="show" :preserveAspectRatio="type == 'line' ? 'none' : ''">
            <path :fill-opacity="!!fillColor ? 1 : 0"
                  :d="getPathString"
                  :fill="fillColor"
                  :stroke="strokeColor"
                  :stroke-width="trailWidth"
            ></path>
            <path fill-opacity="0" ref="trailPath"
                  :d="getPathString"
                  :stroke="trailColor"
                  :stroke-width="strokeWidth ? strokeWidth : trailWidth"
                  :style="{strokeDasharray: stroke.dasharray, strokeDashoffset: stroke.dashoffset}"
            ></path>
        </svg>
    </div>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-progressbar',
        data() {
            return {
                viewBox: '0 0 100 100',
                show: false,
                stroke: {
                    dasharray: '',
                    dashoffset: '',
                }
            }
        },
        props: {
            type: {
                type: String,
                validator(value) {
                    return ['circle', 'line'].indexOf(value) > -1;
                },
                default: 'circle'
            },
            fillColor: {
                type: String,
                validator(value) {
                    return isColor(value);
                }
            },
            strokeWidth: {
                validator(val) {
                    return /^\d*$/.test(val);
                },
                default: 0
            },
            strokeColor: {
                type: String,
                validator(value) {
                    return isColor(value);
                },
                default: '#E5E5E5'
            },
            trailWidth: {
                validator(val) {
                    return /^\d*$/.test(val);
                },
                default: 0,
                require: true
            },
            trailColor: {
                type: String,
                validator(value) {
                    return isColor(value);
                },
                default: '#646464'
            },
            progress: {
                validator(val) {
                    return /^(0(.\d+)?|1(\.0+)?)$/.test(val);
                },
                default: 0
            }
        },
        methods: {
            init() {
                const length = this.length = this.$refs.trailPath.getTotalLength();
                this.stroke.dashoffset = length;
                this.stroke.dasharray = length + ',' + length;

                this.scrollview = this.getScrollview();

                this.show = true;

                if (this.type == 'line') {
                    this.viewBox = '0 0 100 ' + (this.strokeWidth ? this.strokeWidth : this.trailWidth);
                }

                setTimeout(() => {
                    this.checkInview();
                }, 0);

                this.bindEvent();
            },
            getScrollview() {
                const overflowY = document.defaultView.getComputedStyle(this.$el.parentNode).overflowY;

                if (overflowY == 'scroll' || overflowY == 'auto') {
                    return this.$el.parentNode;
                } else if (this.$parent.$refs.scrollview) {
                    return this.$parent.$refs.scrollview;
                } else {
                    return window;
                }
            },
            checkInview() {
                const scrollView = this.scrollview;
                const contentHeight = scrollView == window ? document.body.offsetHeight : scrollView.offsetHeight;
                const contentTop = scrollView === window ? 0 : scrollView.getBoundingClientRect().top;

                const post = this.$el.getBoundingClientRect().top - contentTop;
                const posb = post + this.$el.offsetHeight;

                if ((post >= 0 && post < contentHeight) || (posb > 0 && posb <= contentHeight)) {
                    this.stroke.dashoffset = this.length - this.progress * this.length;
                }
            },
            bindEvent() {
                this.scrollview.addEventListener('scroll', this.checkInview);
                this.scrollview.addEventListener('resize', this.checkInview);
            },
            unbindEvent() {
                this.scrollview.removeEventListener('scroll', this.checkInview);
                this.scrollview.removeEventListener('resize', this.checkInview);
            }
        },
        watch: {
            progress(val) {
                this.stroke.dashoffset = this.length - val * this.length;
            }
        },
        computed: {
            getPathString() {
                if (this.type == 'line') {
                    return 'M 0,{R} L 100,{R}'.replace(/\{R\}/g, this.trailWidth / 2);
                } else {
                    const r = 50 - (this.strokeWidth ? this.strokeWidth : this.trailWidth) / 2;
                    return 'M 50,50 m 0,-{R} a {R},{R} 0 1 1 0,{2R} a {R},{R} 0 1 1 0,-{2R}'.replace(/\{R\}/g, r).replace(/\{2R\}/g, 2 * r);
                }
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

<style lang="less">
    @import "../../../styles/components/progressbar.less";
</style>
