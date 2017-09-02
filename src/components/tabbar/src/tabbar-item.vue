<template>
    <router-link :to="link" class="yd-tabbar-item" :class="classes" :style="styles" :exact="$parent.exact"
                 :active-class="$parent.activeClass">
        <span class="yd-tabbar-icon">
            <slot name="icon"></slot>
            <span class="yd-tabbar-badge">
                <slot name="badge"></slot>
            </span>
            <span class="yd-tabbar-dot" v-if="dot"></span>
        </span>
        <span class="yd-tabbar-txt">{{title}}</span>
    </router-link>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-tabbar-item',
        props: {
            link: [String, Object],
            title: String,
            active: Boolean,
            dot: Boolean
        },
        computed: {
            classes() {
                return this.active ? 'yd-tabbar-active' : '';
            },
            styles() {
                return !this.active ? {color: this.$parent.color} : {};
            }
        }
    }
</script>
