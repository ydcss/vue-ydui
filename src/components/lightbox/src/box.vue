<template>
    <div>
        <div class="yd-lightbox">
            <div class="yd-lightbox-head" :class="show ? '' : 'yd-lightbox-up-hide'">
                <span>{{currentIndex}} / {{imgItems.length}}</span>
                <a href="javascript:;" @click="close">关闭</a>
            </div>
            <div class="yd-lightbox-img" @click="show = !show">
                <slider autoplay="0" :showPagination="false" :callback="changeIndex" :index="index">
                    <slider-item v-for="item in imgItems">
                        <img :src="getImgSrc(item.$el)">
                    </slider-item>
                </slider>
                <div class="yd-lightbox-loading">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="7" r="47" stroke-dasharray="221.48228207808043 75.82742735936014" transform="rotate(25.5138 50 50)">
                            <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="0.8s" begin="0s" repeatCount="indefinite"></animateTransform>
                        </circle>
                    </svg>
                </div>
            </div>
            <div class="yd-lightbox-foot" :class="show ? '' : 'yd-lightbox-down-hide'" v-if="!!txtHTML" v-html="txtHTML"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    import Slider from '../../slider/src/slider.vue';
    import SliderItem from '../../slider/src/slider-item.vue';

    export default {
        components: {
            slider: Slider,
            sliderItem: SliderItem
        },
        data() {
            return {
                currentIndex: 1,
                index: 1,
                imgItems: [],
                show: true,
                txtHTML: ''
            }
        },
        methods: {
            close() {
                this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
            },
            changeIndex(index) {
                this.currentIndex = index;
            },
            getImgSrc(el) {
                return el.getAttribute('original') || el.getAttribute('src');
            }
        }
    }
</script>
