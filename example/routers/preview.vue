<template>
    <yd-layout title="Preview">

        <yd-preview class="demo-small-pitch" :buttons="btns">
            <yd-preview-header>
                <div slot="left">付款金额</div>
                <div slot="right">¥2400.00</div>
            </yd-preview-header>

            <yd-preview-item>
                <div slot="left">商品</div>
                <div slot="right">啦啦啦啦啦啦啦</div>
            </yd-preview-item>
            <yd-preview-item>
                <div slot="left">商品</div>
                <div slot="right">啦啦啦啦啦啦啦</div>
            </yd-preview-item>
            <yd-preview-item>
                <div slot="left">商品商品</div>
                <div slot="right">啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</div>
            </yd-preview-item>
        </yd-preview>

    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                btns: [
                    {
                        text: '辅助操作',
                        click: () => {
                            alert('辅助操作');
                        }
                    },
                    {
                        color: '#F00',
                        text: '跳转首页',
                        link: {path: '/'}
                    }
                ]
            }
        }
    }
</script>
