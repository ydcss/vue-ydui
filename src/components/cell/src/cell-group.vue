<template>
    <div class="m-cell">
        <div class="m-celltitle" v-if="title">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default{
        name: 'yd-cell-group',
        props: {
            title: String
        }
    }
</script>

<style>

</style>
