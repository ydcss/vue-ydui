<template>
    <article class="m-list" :class="classes">
        <slot></slot>
    </article>
</template>

<script type="text/babel">
    export default {
        name: 'yd-list',
        props: {
            theme: [Number, String],
            validator(value){
                return ['1', '2', '3', '4', '5'].indexOf(value + '') > -1;
            },
            default: '2'
        },
        computed: {
            classes() {
                return 'list-theme' + this.theme;
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/list.less';
</style>
