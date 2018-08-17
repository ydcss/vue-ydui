<template>
    <div class="yd-slider" ref="slider">
        <div class="yd-slider-wrapper" ref="warpper"
             :class="direction === 'vertical' ? 'yd-slider-wrapper-vertical' : ''"
             :style="dragStyleObject"
        >
            <div class="yd-slider-item" v-if="loop" :style="itemHeight" v-html="lastItem"></div>
            <slot></slot>
            <div class="yd-slider-item" v-if="loop" :style="itemHeight" v-html="firstItem"></div>
        </div>
        <div class="yd-slider-pagination" v-if="itemsArr.length > 1 && showPagination"
             :class="direction === 'vertical' ? 'yd-slider-pagination-vertical' : ''">
            <span class="yd-slider-pagination-item"
                  v-for="t, i in itemNums" :key="i"
                  :class="paginationIndex === i ? 'yd-slider-pagination-item-active': ''"
                  :style="{backgroundColor: paginationIndex === i ? paginationActiveColor : paginationColor}"
            ></span>
        </div>
    </div>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-slider',
        data() {
            return {
                firstItem: '',
                lastItem: '',
                currentIndex: 0,
                itemNums: 0,
                itemsArr: [],
                autoPlayTimer: null,
                paginationIndex: 0,
                itemHeight: {
                    height: null
                },
                dragStyleObject: {
                    transform: 0,
                    speed: 0
                },
                touches: {
                    moveTag: 0,
                    moveOffset: 0,
                    touchStartTime: 0,
                    isTouchEvent: false,
                    allowClick: false,
                    isDraging: false
                }
            }
        },
        props: {
            index: {
                default: 0,
                validator(val) {
                    return /^\d*$/.test(val);
                }
            },
            speed: {
                default: 200,
                validator(val) {
                    return /^\d*$/.test(val);
                }
            },
            autoplay: {
                default: 0,
                validator(val) {
                    return /^\d*$/.test(val);
                }
            },
            direction: {
                validator(val) {
                    return ['horizontal', 'vertical'].indexOf(val) > -1;
                },
                default: 'horizontal'
            },
            showPagination: {
                type: Boolean,
                default: true
            },
            callback: {
                type: Function
            },
            loop: {
                type: Boolean,
                default: true
            },
            paginationColor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#B7D0E1'
            },
            paginationActiveColor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#FF0005'
            },
        },
        watch: {
            index(val) {
                val = ~~val;

                if (val > this.itemNums) {
                    val = this.itemNums;
                }

                this.currentIndex = this.loop ? val + 1 : val;

                this.showItem(this.currentIndex);
            },
            currentIndex(val) {
                const itemNums = this.itemNums;
                const tm = (val - 1) % itemNums;
                if (this.loop) {
                    this.paginationIndex = tm < 0 ? itemNums - 1 : tm;
                } else {
                    this.paginationIndex = val;
                }
            }
        },
        methods: {
            init() {
                this.destroy();

                this.isVertical = this.direction === 'vertical';

                this.itemsArr = this.$children.filter(item => item.$options.name === 'yd-slider-item');

                this.itemNums = this.itemsArr.length;

                if (this.loop) {
                    this.currentIndex = 1;
                    if (this.index > 0) {
                        this.currentIndex = ~~this.index + 1;
                    }
                } else {
                    this.currentIndex = 0;
                    if (this.index > 0) {
                        this.currentIndex = ~~this.index;
                    }
                }

                this.cloneItem();

                this.showItem(this.currentIndex);

                this.bindEvents();

                this.autoPlay();
            },
            showItem(index) {
                if (this.isVertical) {
                    this.$refs.slider.style.height = '100%';
                    const height = this.$el.clientHeight;
                    this.itemHeight.height = height + 'px';
                    this.setTranslate(0, -height * index);
                    this.itemsArr.forEach((item) => {
                        item.$el.style.height = height + 'px';
                    });
                } else {
                    this.setTranslate(0, -this.$refs.warpper.offsetWidth * index);
                }
            },
            cloneItem() {
                if (this.itemsArr.length <= 1 || !this.loop) return;

                const itemArr = this.itemsArr;

                this.firstItem = itemArr[0].$el.innerHTML;
                this.lastItem = itemArr[itemArr.length - 1].$el.innerHTML;
            },
            touchStartHandler(event) {
                const touches = this.touches;

                touches.allowClick = true;

                touches.isTouchEvent = event.type === 'touchstart';

                if (!touches.isTouchEvent && 'which' in event && event.which === 3) return;

                if (touches.moveTag === 0) {
                    touches.moveTag = 1;

                    touches.startX = event.touches ? event.touches[0].clientX : event.clientX;
                    touches.startY = event.touches ? event.touches[0].clientY : event.clientY;

                    touches.touchStartTime = Date.now();

                    const itemNums = this.itemNums;

                    if (!this.loop) {
                        if (this.currentIndex === -1) {
                            this.currentIndex = itemNums - 1;
                            this.setTranslate(0, -(itemNums - 1) * (this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth));
                            return;
                        }

                        if (this.currentIndex > itemNums - 1) {
                            this.currentIndex = 1;
                            this.setTranslate(0, this.isVertical ? -this.$el.clientHeight : -this.$refs.warpper.offsetWidth);
                        }
                    } else {
                        if (this.currentIndex === 0) {
                            this.currentIndex = itemNums;
                            this.setTranslate(0, -itemNums * (this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth));
                            return;
                        }

                        if (this.currentIndex > itemNums) {
                            this.currentIndex = 1;
                            this.setTranslate(0, this.isVertical ? -this.$el.clientHeight : -this.$refs.warpper.offsetWidth);
                        }
                    }
                }
            },
            touchMoveHandler(event) {
                if (!this.supportTouch || this.isVertical) {
                    event.preventDefault();
                }

                const touches = this.touches;

                touches.allowClick = false;

                if (touches.isTouchEvent && event.type === 'mousemove') return;

                const currentY = event.touches ? event.touches[0].clientY : event.clientY;
                const currentX = event.touches ? event.touches[0].clientX : event.clientX;

                const touchAngle = Math.atan2(Math.abs(currentY - touches.startY), Math.abs(currentX - touches.startX)) * 180 / Math.PI;

                if ((!this.isVertical ? touchAngle > 45 : (90 - touchAngle > 30)) && this.supportTouch) {
                    touches.moveTag = 3;
                    this.stopAutoplay();
                    this.setTranslate(0, -this.currentIndex * (this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth));
                    return;
                }

                touches.isDraging = true;

                const deltaSlide = touches.moveOffset = this.isVertical ? (currentY - touches.startY) : (currentX - touches.startX);

                if (deltaSlide !== 0 && touches.moveTag !== 0) {
                    if (touches.moveTag === 1) {
                        this.stopAutoplay();
                        touches.moveTag = 2;
                    }

                    if (touches.moveTag === 2) {
                        this.setTranslate(0, -this.currentIndex * (this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth) + deltaSlide / 2);
                    }
                }
            },
            touchEndHandler() {
                const touches = this.touches;
                const moveOffset = touches.moveOffset;
                const warpperSize = this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth;

                if (touches.moveTag === 1) {
                    touches.moveTag = 0;
                }

                setTimeout(() => {
                    touches.allowClick = true;
                    touches.isDraging = false;
                }, this.speed);

                if (touches.moveTag === 2) {
                    touches.moveTag = 0;

                    const timeDiff = Date.now() - touches.touchStartTime;

                    const unloopDrag = (!this.loop && ((this.currentIndex === 0 && moveOffset > 0) || (this.currentIndex >= this.itemNums - 1 && moveOffset < 0)));

                    if (timeDiff > 250 && Math.abs(moveOffset) <= warpperSize * .5 || this.itemsArr.length <= 1 || unloopDrag) {
                        this.setTranslate(this.speed, -this.currentIndex * warpperSize);
                    } else {
                        this.setTranslate(this.speed, -((moveOffset > 0 ? --this.currentIndex : ++this.currentIndex) * warpperSize));
                        this.sendIndex();
                    }
                    this.autoPlay();
                    return;
                }

                if (touches.moveTag === 3) {
                    touches.moveTag = 0;
                    this.autoPlay();
                }
            },
            autoPlay() {
                if (this.autoplay <= 0 || this.itemsArr.length <= 1) return;

                this.autoPlayTimer = setInterval(() => {
                    const size = this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth;

                    if (!this.loop) {
                        if (this.currentIndex + 1 >= this.itemNums) {
                            this.currentIndex = -1;
                        }
                    }

                    if (this.currentIndex > this.itemNums) {
                        this.currentIndex = 1;
                        this.setTranslate(0, -size);
                        setTimeout(() => {
                            this.setTranslate(this.speed, -(++this.currentIndex * size));
                        }, 100);
                        this.callback && this.callback(this.currentIndex);
                        return;
                    }
                    this.setTranslate(this.speed, -(++this.currentIndex * size));

                    this.sendIndex();

                }, this.autoplay);
            },
            sendIndex() {
                if (!this.loop) {
                    this.callback && this.callback(this.currentIndex);
                } else {
                    let _index = this.currentIndex % this.itemNums;
                    this.callback && this.callback(_index === 0 ? this.itemNums - 1 : _index - 1);
                }
            },
            stopAutoplay() {
                clearInterval(this.autoPlayTimer);
            },
            stopDrag(event) {
                this.touches.isDraging && event.preventDefault();
            },
            bindEvents() {
                this.$el.addEventListener('touchstart', this.touchStartHandler);
                this.$el.addEventListener('touchmove', this.touchMoveHandler);
                this.$el.addEventListener('touchend', this.touchEndHandler);

                this.$el.addEventListener('click', (e) => {
                    if (!this.touches.allowClick) {
                        e.preventDefault();
                    }
                });

                window.addEventListener('resize', this.resizeSlides);

                document.body.addEventListener('touchmove', this.stopDrag, {passive: false});
            },
            unbindEvents() {
                this.$el.removeEventListener('touchstart', this.touchStartHandler);
                this.$el.removeEventListener('touchmove', this.touchMoveHandler);
                this.$el.removeEventListener('touchend', this.touchEndHandler);

                window.removeEventListener('resize', this.resizeSlides);

                document.body.removeEventListener('touchmove', this.stopDrag, {passive: false});
            },
            setTranslate(speed, translate) {
                this.dragStyleObject.transitionDuration = speed + 'ms';
                if (this.isVertical) {
                    this.dragStyleObject.transform = 'translate3d(0, ' + translate + 'px, 0)';
                } else {
                    this.dragStyleObject.transform = 'translate3d(' + translate + 'px, 0, 0)';
                }
            },
            resizeSlides() {
                if (this.isVertical) {
                    const height = this.$el.clientHeight;
                    this.dragStyleObject.transform = 'translate3d(0, ' + -this.currentIndex * height + 'px, 0)';
                } else {
                    const width = this.$refs.warpper.offsetWidth;
                    this.dragStyleObject.transform = 'translate3d(' + -this.currentIndex * width + 'px, 0, 0)';
                }
            },
            destroy() {
                this.unbindEvents();
                this.stopAutoplay();
            }
        },
        mounted() {
            this.supportTouch = (window.Modernizr && !!window.Modernizr.touch) || (function () {
                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            })();
        },
        beforeDestroy() {
            this.destroy();
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/slider.less";
</style>
