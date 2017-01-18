<template>
    <div class="m-notify" :class="classes" v-html="mes"></div>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                classes: ''
            }
        },
        props: {
            mes: String,
            timeout: Number,
            callback: Function
        }
    }
</script>
