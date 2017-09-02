<template>
    <router-link class="yd-grids-item" :to="link || ''">
        <div class="yd-grids-icon" v-if="checkIcon">
            <slot name="icon"></slot>
        </div>
        <div class="yd-grids-txt" v-if="checkText">
            <slot name="text"></slot>
        </div>
        <slot name="else"></slot>
    </router-link>
</template>

<script type="text/babel">
    export default {
        name: 'yd-grids-item',
        props: {
            link: String
        },
        computed: {
            checkIcon() {
                return !!this.$slots.icon;
            },
            checkText() {
                return !!this.$slots.text;
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/grids.less';
</style>
