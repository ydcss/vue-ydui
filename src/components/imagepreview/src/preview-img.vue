<template>
    <img :src="src" :original="src">
</template>

<script type="text/babel">
    export default {
        name: 'yd-preview-img',
        props: {},
        data() {
            return {
                src:'',
            }
        }
    }
</script>
