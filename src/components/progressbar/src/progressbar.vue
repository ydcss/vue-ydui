<template>
    <div class="yd-progressbar">
        <div class="yd-progressbar-content" v-if="type != 'line'"><slot></slot></div>
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
    import {isColor, getScrollview, checkInview} from '../../../utils/assist';

    export default {
        name: 'yd-progressbar',
        data() {
            return {
                viewBox: '0 0 100 100',
                show: false,
                stroke: {
                    dasharray: '',
                    dashoffset: ''
                }
            }
        },
        props: {
            type: {
                validator(value) {
                    return ['circle', 'line'].indexOf(value) > -1;
                },
                default: 'circle'
            },
            fillColor: {
                validator(value) {
                    if (!value) return true;
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
                validator(value) {
                    if (!value) return true;
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
                validator(value) {
                    if (!value) return true;
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

                this.scrollview = getScrollview(this.$el);

                this.show = true;

                if (this.type === 'line') {
                    this.viewBox = '0 0 100 ' + (this.strokeWidth ? this.strokeWidth : this.trailWidth);
                }

                this.$nextTick(() => {
                    this.scrollHandler();
                });

                this.bindEvent();
            },
            scrollHandler() {
                if (checkInview(this.scrollview, this.$el)) {
                    this.stroke.dashoffset = this.length - this.progress * this.length;
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
        watch: {
            progress(val) {
                this.stroke.dashoffset = this.length - val * this.length;
            }
        },
        computed: {
            getPathString() {
                if (this.type === 'line') {
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
