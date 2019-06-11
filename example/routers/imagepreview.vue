<template>
    <yd-layout title="LightBox">
        <p style="color: #00c3f5;padding-bottom: 5px;padding-left: 5px;font-size: 15px;" class="demo-small-pitch">
            参照 京东APP 和 <a href="http://photoswipe.com/" style="text-decoration: underline;">Photoswipe</a> 功能实现。
        </p>
        <yd-lightbox>
            <div class="demo-lightbox">
                <div>
                    <yd-lightbox-img :src="baseurl + 'scenery_s01.jpg'" :original="baseurl + 'scenery_01.jpg'"></yd-lightbox-img>
                </div>
                <div>
                    <div>
                        <div><yd-lightbox-img :src="baseurl + 'scenery_s02.jpg'" :original="baseurl + 'scenery_02.jpg'"></yd-lightbox-img></div>
                        <div><yd-lightbox-img :src="baseurl + 'scenery_s03.jpg'" :original="baseurl + 'scenery_03.jpg'"></yd-lightbox-img></div>
                    </div>
                    <div>
                        <div><yd-lightbox-img :src="baseurl + 'scenery_s04.jpg'" :original="baseurl + 'scenery_04.jpg'"></yd-lightbox-img></div>
                        <div><yd-lightbox-img :src="baseurl + 'scenery_s05.jpg'" :original="baseurl + 'scenery_05.jpg'"></yd-lightbox-img></div>
                    </div>
                </div>
            </div>

            <yd-lightbox-txt>
                <h1 style="font-size: 15px;margin-bottom: 8px;color: #00c3f5;text-align: right;" slot="top">美丽风景</h1>
                <div slot="content" style="text-align: right;">
                    <p>风景指的是供观赏的自然风光、景物，包括自然景观和人文景观</p>
                    <p>风景是由光对物的反映所显露出来的一种景象</p>
                    <p>犹言风光或景物、景色等，含义广泛</p>
                    <p>而且还有一大部分作品是借景抒情，寓情于景</p>
                </div>
            </yd-lightbox-txt>
        </yd-lightbox>

        <div style="padding:0 0.32rem">
            <yd-button size="large" @click.native="_clickImagePreview(0)">点击显示</yd-button>
            <yd-button size="large" @click.native="_clickImagePreview(1)">点击显示，并且默认显示第2张</yd-button>
            <yd-button size="large" @click.native="_clickImagePreview(images.length - 1)">点击显示，并且默认显示最后张</yd-button>
        </div>

    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                baseurl: 'http://static.ydcss.com/uploads/lightbox/',
                images: [
                    'http://static.ydcss.com/uploads/lightbox/scenery_01.jpg',
                    'http://static.ydcss.com/uploads/lightbox/scenery_02.jpg',
                    'http://static.ydcss.com/uploads/lightbox/scenery_03.jpg',
                    'http://static.ydcss.com/uploads/lightbox/scenery_04.jpg',
                    'http://static.ydcss.com/uploads/lightbox/scenery_05.jpg'
                ]
            }
        },
        methods: {
            // 点击显示
            _clickImagePreview(index = 0) {
                const images = this.images;
                this.$imagePreview({index, images})
            }
        }
    }
</script>
