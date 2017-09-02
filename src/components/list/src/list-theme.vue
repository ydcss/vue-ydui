<template>
    <article class="yd-list" :class="classes">
        <slot></slot>
    </article>
</template>

<script type="text/babel">
    export default {
        name: 'yd-list',
        props: {
            theme: {
                validator(value){
                    return ['1', '2', '3', '4', '5'].indexOf(value + '') > -1;
                },
                default: '1'
            }
        },
        computed: {
            classes() {
                return 'yd-list-theme' + this.theme;
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/list.less';
</style>
