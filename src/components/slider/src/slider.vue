<template>
    <div class="yd-slider" ref="slider">
        <div class="yd-slider-wrapper" ref="warpper"
             :class="direction == 'vertical' ? 'yd-slider-wrapper-vertical' : ''"
             :style="dragStyleObject"
        >
            <div class="yd-slider-item" :style="itemHeight" v-html="lastItem"></div>
            <slot></slot>
            <div class="yd-slider-item" :style="itemHeight" v-html="firtstItem"></div>
        </div>
        <div class="yd-slider-pagination" v-if="itemsArr.length > 1 && showPagination"
             :class="direction == 'vertical' ? 'yd-slider-pagination-vertical' : ''">
            <span class="yd-slider-pagination-item"
                  v-for="(t, i) in itemNums"
                  :class="paginationIndex == i ? 'yd-slider-pagination-item-active': ''"
            ></span>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-slider',
        data() {
            return {
                firtstItem: '',
                lastItem: '',
                currentIndex: ~~this.index,
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
                default: 1,
                validator(val) {
                    return /^\d*$/.test(val);
                }
            },
            speed: {
                default: 300,
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
            }
        },
        watch: {
            index(val) {
                val = ~~val;

                if (val > this.itemNums) {
                    val = this.itemNums;
                }

                this.currentIndex = val;
                this.showItem(val);
            },
            currentIndex(val) {
                const itemNums = this.itemNums;
                const tm = (val - 1) % itemNums;
                this.paginationIndex = tm < 0 ? itemNums - 1 : tm;
            }
        },
        methods: {
            init() {
                this.destroy();

                this.isVertical = this.direction === 'vertical';

                this.itemsArr = this.$children.filter(item => item.$options.name === 'yd-slider-item');

                this.itemNums = this.itemsArr.length;

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
                if (this.itemsArr.length <= 1) return;

                const itemArr = this.itemsArr;

                this.firtstItem = itemArr[0].$el.innerHTML;
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

                if ((!this.isVertical ? touchAngle > 45 : (90 - touchAngle > 45)) && this.supportTouch) {
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
                        this.setTranslate(0, -this.currentIndex * (this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth) + deltaSlide);
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

                    if (timeDiff > 300 && Math.abs(moveOffset) <= warpperSize * .5 || this.itemsArr.length <= 1) {
                        this.setTranslate(this.speed, -this.currentIndex * warpperSize);
                    } else {

                        this.setTranslate(this.speed, -((moveOffset > 0 ? --this.currentIndex : ++this.currentIndex) * warpperSize));

                        const f = this.currentIndex % this.itemNums;
                        this.callback && this.callback(f === 0 ? this.itemNums : f);
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

                    if (this.currentIndex > this.itemNums) {
                        this.currentIndex = 1;
                        this.setTranslate(0, -size);
                        setTimeout(() => {
                            this.setTranslate(this.speed, -(++this.currentIndex * size));
                        }, 100);
                        return;
                    }
                    this.setTranslate(this.speed, -(++this.currentIndex * size));

                }, this.autoplay);
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

                document.body.addEventListener('touchmove', this.stopDrag);
            },
            unbindEvents() {
                this.$el.removeEventListener('touchstart', this.touchStartHandler);
                this.$el.removeEventListener('touchmove', this.touchMoveHandler);
                this.$el.removeEventListener('touchend', this.touchEndHandler);

                window.removeEventListener('resize', this.resizeSlides);

                document.body.removeEventListener('touchmove', this.stopDrag);
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
        destroyed() {
            this.destroy();
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/slider.less";
</style>
