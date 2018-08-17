<template>
    <yd-layout title="BackTop">
        <p v-for="n in 150" style="padding: .1rem .24rem;">{{n}} - 啦啦啦啦啦啦啦啦</p>

        <yd-backtop></yd-backtop>

        <yd-backtop right="80px">
            <div class="demo-backtop">
                <span>自定义图片</span>
                <img src="https://storage.360buyimg.com/i.imageUpload/d7a8caf4c9e8bcc631343933373831333530383530_mid.jpg">
            </div>
        </yd-backtop>
    </yd-layout>
</template>
