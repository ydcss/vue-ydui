<template>
    <div>
        <div ref="dragBox">
            <slot></slot>
            <div class="yd-pullrefresh-dragtip" ref="dragTip"
                 v-show="touches.isDraging"
                 :class="dragTip.animationTiming"
                 :style="{ 'transform': 'translate3d(0, ' + dragTip.translate + 'px, 0)' }"
            >
                <span class="yd-pullrefresh-dragtip-icon">
                    <i :class="dragTip.loadingIcon"
                       :style="{ 'transform': 'rotate(' + dragTip.iconRotate + 'deg)' }"></i>
                    {{dragTip.statusText}}
                </span>
            </div>
        </div>
        <div class="yd-pullrefresh-draghelp" v-if="showHelpTag" @click="showHelpTag = false">
            <div><span>下拉更新</span></div>
        </div>
    </div>
</template>

<script type="text/babel">
    import {getScrollview} from '../../../utils/assist';

    export default {
        name: 'yd-pullrefresh',
        props: {
            callback: {
                type: Function
            },
            stopDrag: {
                type: Boolean,
                default: false
            },
            pullText: {
                type: String,
                default: '下拉刷新'
            },
            dropText: {
                type: String,
                default: '松开加载'
            },
            loadingText: {
                type: String,
                default: '加载中...'
            },
            showInitTip: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                showHelpTag: false,
                dragTip: {
                    statusText: this.pullText,
                    animationTiming: '',
                    translate: 0,
                    distance: 36,
                    iconRotate: 0,
                    loadingIcon: '',
                },
                touches: {
                    loading: false,
                    startClientY: 0,
                    moveOffset: 0,
                    isDraging: false
                },
                limitSpeed: 0,
                isDragToUp: false
            }
        },
        methods: {
            init() {
                this.offsetTop = this.$refs.dragBox.getBoundingClientRect().top;

                this.bindEvents();

                this.$on('ydui.pullrefresh.finishLoad', this.resetParams);

                this.showHelp();
            },
            showHelp() {
                if (!this.showInitTip) return;

                const _key = 'PULLREFRESH-TIP';
                const storage = window.localStorage;

                if (storage.getItem(_key) != 1) {
                    this.showHelpTag = true;
                    setTimeout(() => {
                        this.showHelpTag = false;
                    }, 5000);
                }
                storage.setItem(_key, 1);
            },
            bindEvents() {
                const dragBox = this.$refs.dragBox;

                dragBox.addEventListener('touchstart', this.touchStartHandler);
                dragBox.addEventListener('touchmove', this.touchMoveHandler);
                dragBox.addEventListener('touchend', this.touchEndHandler);

                document.body.addEventListener('touchmove', this.stopDragEvent, {passive: false});
            },
            unbindEvents() {
                const dragBox = this.$refs.dragBox;

                dragBox.removeEventListener('touchstart', this.touchStartHandler);
                dragBox.removeEventListener('touchmove', this.touchMoveHandler);
                dragBox.removeEventListener('touchend', this.touchEndHandler);

                document.body.removeEventListener('touchmove', this.stopDragEvent, {passive: false});
            },
            stopDragEvent(event) {
                this.touches.isDraging && event.preventDefault();
            },
            getScrollTop(element) {
                if (element === window) {
                    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
                } else {
                    return element.scrollTop;
                }
            },
            touchStartHandler(event) {
                if (this.stopDrag) return;

                if (this.touches.loading) {
                    event.preventDefault();
                    return;
                }

                if (this.scrollview.scrollTop > 0 || this.$refs.dragBox.getBoundingClientRect().top < this.offsetTop) {
                    return;
                }

                this.touches.startClientX = event.touches[0].clientX;
                this.touches.startClientY = event.touches[0].clientY;
            },
            touchMoveHandler(event) {
                const touches = this.touches;

                if (this.stopDrag || this.isDragToUp) return;

                if (this.touches.loading) {
                    event.preventDefault();
                    return;
                }

                if (this.scrollview.scrollTop > 0) {
                    this.dragTip.translate = 0;
                    this.resetParams();
                    return;
                }

                const currentY = event.touches[0].clientY;
                const currentX = event.touches[0].clientX;

                if (currentY - touches.startClientY < 0) {
                    this.isDragToUp = true;
                    return;
                }

                if (touches.startClientY > currentY || this.$refs.dragBox.getBoundingClientRect().top < this.offsetTop) {
                    return;
                }

                if (this.getScrollTop(this.scrollview) === 0) {
                    event.preventDefault();
                }

                touches.isDraging = true;

                const touchAngle = Math.atan2(Math.abs(currentY - touches.startClientY), Math.abs(currentX - touches.startClientX)) * 180 / Math.PI;
                if (90 - touchAngle > 45) return;

                let deltaSlide = currentY - touches.startClientY;

                if (deltaSlide >= this.dragTip.distance) {
                    this.dragTip.statusText = this.dropText;
                    deltaSlide = this.dragTip.distance;
                }

                this.dragTip.iconRotate = deltaSlide / 0.25;

                this.limitSpeed += 5;
                if (this.limitSpeed < deltaSlide) {
                    deltaSlide = this.limitSpeed;
                }

                touches.moveOffset = this.dragTip.translate = deltaSlide;
            },
            touchEndHandler(event) {
                if (this.stopDrag) return;

                this.isDragToUp = false;

                const touches = this.touches;

                if (touches.loading) {
                    event.preventDefault();
                    return;
                }

                if (this.$refs.dragBox.getBoundingClientRect().top < this.offsetTop) {
                    return;
                }

                this.dragTip.animationTiming = 'yd-pullrefresh-animation-timing';

                if (touches.moveOffset >= this.dragTip.distance) {
                    this.dragTip.statusText = this.loadingText;
                    this.dragTip.loadingIcon = 'yd-pullrefresh-loading';
                    this.triggerLoad();
                    return;
                }

                this.resetParams();
            },
            triggerLoad() {
                this.touches.loading = true;
                this.callback && this.callback();
            },
            resetParams() {
                this.dragTip.translate = 0;
                setTimeout(() => {
                    const touches = this.touches;
                    const dragTip = this.dragTip;
                    touches.isDraging = false;
                    touches.loading = false;
                    dragTip.animationTiming = '';
                    touches.moveOffset = 0;
                    dragTip.translate = 0;
                    dragTip.statusText = this.pullText;
                    dragTip.loadingIcon = '';
                    dragTip.iconRotate = 0;
                    this.limitSpeed = 0;
                }, 200);
            }
        },
        mounted() {
            this.scrollview = getScrollview(this.$el);

            this.$nextTick(this.init);
        },
        beforeDestroy() {
            this.unbindEvents();
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/pullrefresh.less';
</style>
