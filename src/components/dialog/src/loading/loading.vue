<template>
    <div class="mask-white-dialog">
        <div class="m-loading">
            <div class="loading-icon"></div>
            <div class="loading-txt" v-html="title"></div>
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
