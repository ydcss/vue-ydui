<template>
    <div class="yd-dialog-white-mask">
        <div class="yd-loading">
            <div class="yd-loading-icon"></div>
            <div class="yd-loading-txt" v-html="title"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            title: String
        }
    }
</script>
