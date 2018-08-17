<template>
    <div class="yd-cell-box">
        <div class="yd-cell-title" v-if="title">{{title}}</div>
        <div class="yd-cell">
            <slot></slot>
        </div>
        <slot name="bottom"></slot>
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
