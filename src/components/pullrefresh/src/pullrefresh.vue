<template>
    <div>
        <div ref="dragBox">
            <slot></slot>
            <div class="pullrefresh-dragtip" ref="dragTip"
                 :class="dragTip.animationTiming"
                 :style="{ 'transform': 'translate3d(0, ' + dragTip.translate + 'px, 0) scale(' + dragTip.scale + ')' }"
            >
                <span :class="dragTip.loadingIcon"
                      :style="{ 'transform': 'rotate(' + dragTip.iconRotate + 'deg)', opacity: dragTip.iconOpacity }"
                ></span>
            </div>
        </div>
        <div class="pullrefresh-draghelp" v-if="showHelpTag" @click="showHelpTag = false">
            <div><span>下拉更新</span></div>
        </div>
    </div>
</template>

<script type="text/babel">
    import Vue from 'vue';

    window.$yduiBus = window.$yduiBus || new Vue();

    export default {
        name: 'yd-pullrefresh',
        props: {
            onInfinite: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                showHelpTag: false,
                dragTip: {
                    iconOpacity: 0.5,
                    iconRotate: 0,
                    loadingIcon: '',
                    animationTiming: '',
                    scale: 1,
                    translate: 0,
                    distance: 100
                },
                touches: {
                    loading: false,
                    startClientY: 0,
                    moveOffset: 0,
                    isDraging: false
                }
            }
        },
        methods: {
            init() {
                this.offsetTop = this.$refs.dragBox.getBoundingClientRect().top;

                this.bindEvents();

                window.$yduiBus.$on('ydui.pullrefresh.finishLoad', this.finishLoad);

                this.showHelp();
            },
            showHelp() {
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

                document.body.addEventListener('touchmove', this.stopWeixinDrag);
            },
            unbindEvents() {
                const dragBox = this.$refs.dragBox;

                dragBox.removeEventListener('touchstart', this.touchStartHandler);
                dragBox.removeEventListener('touchmove', this.touchMoveHandler);
                dragBox.removeEventListener('touchend', this.touchEndHandler);

                document.body.removeEventListener('touchmove', this.stopWeixinDrag);
            },
            stopWeixinDrag(event) {
                this.touches.isDraging && event.preventDefault();
            },
            touchStartHandler(event) {
                if (this.touches.loading) {
                    event.preventDefault();
                    return;
                }

                if (this.$refs.dragBox.getBoundingClientRect().top < this.offsetTop) {
                    return;
                }

                this.touches.startClientY = event.touches[0].clientY;
            },
            touchMoveHandler(event) {
                const touches = event.touches[0];

                if (this.touches.loading) {
                    event.preventDefault();
                    return;
                }

                if (this.touches.startClientY > touches.clientY || this.$refs.dragBox.getBoundingClientRect().top < this.offsetTop || this.touches.loading) {
                    return;
                }

                this.touches.isDraging = true;

                let deltaSlide = touches.clientY - this.touches.startClientY;

                this.dragTip.iconOpacity = deltaSlide / 100;

                if (deltaSlide >= this.dragTip.distance) {
                    deltaSlide = this.dragTip.distance;
                }

                this.dragTip.iconRotate = deltaSlide / 0.25;

                this.touches.moveOffset = this.dragTip.translate = deltaSlide;
            },
            touchEndHandler(event) {
                const touches = this.touches;

                if (touches.loading) {
                    event.preventDefault();
                    return;
                }

                if (this.$refs.dragBox.getBoundingClientRect().top < this.offsetTop) {
                    return;
                }

                this.dragTip.animationTiming = 'pullrefresh-animation-timing';

                if (touches.moveOffset >= this.dragTip.distance) {
                    this.dragTip.translate = this.dragTip.distance / 1.5;
                    this.dragTip.loadingIcon = 'pullrefresh-loading';
                    this.triggerLoad();
                    return;
                }

                this.dragTip.translate = 0;
                this.resetParams();
            },
            triggerLoad() {
                this.touches.loading = true;
                this.onInfinite();
            },
            finishLoad() {
                setTimeout(() => {
                    this.dragTip.iconRotate = 0;
                    this.dragTip.scale = 0;
                    this.resetParams();
                }, 200);
            },
            resetParams() {
                setTimeout(() => {
                    const touches = this.touches;
                    const dragTip = this.dragTip;
                    touches.isDraging = false;
                    touches.loading = false;
                    touches.moveOffset = 0;
                    dragTip.animationTiming = '';
                    dragTip.iconOpacity = 0.5;
                    dragTip.translate = 0;
                    dragTip.scale = 1;
                    dragTip.loadingIcon = '';
                }, 150);
            }
        },
        mounted() {
            this.$nextTick(this.init);
        },
        destroyed() {
            this.unbindEvents();
        }
    }
</script>
