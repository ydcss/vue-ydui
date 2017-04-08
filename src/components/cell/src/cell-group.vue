<template>
    <div class="m-cell-box">
        <div class="m-cell">
            <div class="cell-title" v-if="title">{{title}}</div>
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
