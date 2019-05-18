<template>
    <div>
        <lightbox-tip></lightbox-tip>

        <div class="yd-lightbox" :style="bgStyleObject">
            <div class="yd-lightbox-head" :class="show ? '' : 'yd-lightbox-up-hide'">
                <span>{{currentIndex + 1}} / {{imgItems.length}}</span>
                <a href="javascript:;" @click="close">{{closeText}}</a>
            </div>
            <div class="yd-lightbox-img" @click="show = !show" ref="imgbox" :style="dragStyleObject">
                <slider autoplay="0" :show-pagination="false" :loop="false" :callback="changeIndex" :index="index">
                    <slider-item v-for="(item, key) in imgItems" :key="key">
                        <img :src="getImgSrc(item.$el)" style="background-color: #000">
                    </slider-item>
                </slider>
                <div class="yd-lightbox-loading" v-show="showLoaingIcon">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                         preserveAspectRatio="xMidYMid">
                        <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="7" r="47"
                                stroke-dasharray="221.48228207808043 75.82742735936014"
                                transform="rotate(25.5138 50 50)">
                            <animateTransform attributeName="transform" type="rotate" calcMode="linear"
                                              values="0 50 50;360 50 50" keyTimes="0;1" dur="0.8s" begin="0s"
                                              repeatCount="indefinite"></animateTransform>
                        </circle>
                    </svg>
                </div>
            </div>
            <div class="yd-lightbox-foot" :class="show ? '' : 'yd-lightbox-down-hide'" v-if="!!txtHTML"
                 v-html="txtHTML"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    import Slider from '../../slider/src/slider.vue';
    import SliderItem from '../../slider/src/slider-item.vue';
    import LightboxTip from './lightbox-tip.vue';

    export default {
        components: {
            slider: Slider,
            sliderItem: SliderItem,
            lightboxTip: LightboxTip
        },
        data() {
            return {
                index: 1,
                imgItems: [],
                show: true,
                tmpShow: true,
                txtHTML: '',
                closeText: '',
                showLoaingIcon: false,
                touches: {
                    speed: 333,
                    startX: 0,
                    startY: 0,
                    moveOffset: 0,
                    touchStartTime: 0,
                    isDarging: false,
                    isRollBack: false
                },
                bgStyleObject: {
                    backgroundColor: 'rgba(0, 0, 0, 1)'
                },
                dragStyleObject: {}
            }
        },
        methods: {
            close() {
                this.show = false;

                const touches = this.touches;
                const transform = this.getTransform();

                this.setTranslate(touches.speed, transform.x, transform.y, 0, transform.scale);

                setTimeout(() => {
                    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
                    this.show = true;
                    touches.isRollBack = false;
                }, touches.speed);
            },
            changeIndex(index) {
                this.currentIndex = index;
            },
            getImgSrc(el) {
                return el.getAttribute('original') || el.getAttribute('src');
            },
            touchStartHandler(event) {
                const touches = this.touches;

                if (touches.isDarging || this.isRollBack) return;

                touches.startX = event.touches ? event.touches[0].clientX : event.clientX;
                touches.startY = event.touches ? event.touches[0].clientY : event.clientY;

                touches.touchStartTime = Date.now();
            },
            touchMoveHandler(event) {
                event.preventDefault();

                const touches = this.touches;

                if (touches.isRollBack) return;

                const currentY = event.touches ? event.touches[0].clientY : event.clientY;
                const currentX = event.touches ? event.touches[0].clientX : event.clientX;

                const touchAngle = Math.atan2(Math.abs(currentY - touches.startY), Math.abs(currentX - touches.startX)) * 180 / Math.PI;
                const deltaSlide = touches.moveOffset = currentY - touches.startY;

                if (touchAngle > 60 && deltaSlide > 0) {
                    if (!touches.isDarging) {
                        this.tmpShow = this.show;
                        this.show = false;
                    }
                    const maxMoveOffset = document.body.offsetHeight / 10;
                    this.setTranslate(0, 0, deltaSlide, (1 - deltaSlide / 5 / maxMoveOffset), 1);
                    touches.isDarging = true;
                }
            },
            touchEndHandler() {
                const touches = this.touches;

                if (touches.isDarging) {
                    const warpperSize = document.body.offsetHeight;
                    const timeDiff = Date.now() - touches.touchStartTime;

                    touches.isRollBack = true;

                    if (timeDiff <= 200 || Math.abs(touches.moveOffset) >= warpperSize * 0.2) {
                        this.close();
                        return;
                    }

                    this.setTranslate(touches.speed, 0, 0, 1, 1);
                    setTimeout(() => {
                        this.setTranslate(0, 0, 0, 1, 1);
                        touches.isDarging = false;

                        if (this.tmpShow) {
                            this.show = true;
                        }
                        touches.isRollBack = false;
                    }, touches.speed);
                }
            },
            getTransform() {
                const body = document.body;
                const curImg = this.imgItems[this.currentIndex];
                const x = -(body.offsetWidth / 2 - curImg.$el.offsetWidth / 2 - curImg.$el.getBoundingClientRect().left);
                const y = -(body.offsetHeight / 2 - curImg.$el.offsetHeight / 2 - curImg.$el.getBoundingClientRect().top);
                const scale = curImg.$el.offsetWidth / body.offsetWidth;

                return {
                    x, y, scale
                }
            },
            setTranslate(speed, translateX, translateY, opacity, scale) {
                this.dragStyleObject.transitionDuration = speed + 'ms';
                this.dragStyleObject.transform = 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) scale(' + scale + ')';
                this.bgStyleObject.backgroundColor = 'rgba(0, 0, 0, ' + opacity + ')';
            },
            bindEvent() {
                this.$refs.imgbox.addEventListener('touchstart', this.touchStartHandler);
                this.$refs.imgbox.addEventListener('touchmove', this.touchMoveHandler);
                this.$refs.imgbox.addEventListener('touchend', this.touchEndHandler);
            },
            unBindEvent() {
                this.$refs.imgbox.removeEventListener('touchstart', this.touchStartHandler);
                this.$refs.imgbox.removeEventListener('touchmove', this.touchMoveHandler);
                this.$refs.imgbox.removeEventListener('touchend', this.touchEndHandler);
            }
        },
        created() {
            const transform = this.getTransform();

            this.dragStyleObject.transitionDuration = '0ms';
            this.dragStyleObject.transform = 'translate3d(' + transform.x + 'px, ' + transform.y + 'px, 0) scale(' + transform.scale + ')';
            this.bgStyleObject.backgroundColor = 'rgba(0, 0, 0, 0)';
        },
        mounted() {
            this.$nextTick(() => {
                this.bindEvent();

                const speed = this.touches.speed;

                this.dragStyleObject.transitionDuration = speed + 'ms';
                this.dragStyleObject.transform = 'translate3d(0px, 0px, 0) scale(1)';
                this.bgStyleObject.backgroundColor = 'rgba(0, 0, 0, 1)';

                setTimeout(() => {
                    this.showLoaingIcon = true;
                }, speed);
            });
        },
        beforeDestroy() {
            this.unBindEvent();
        }
    }
</script>
