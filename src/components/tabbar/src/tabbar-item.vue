<template>
    <router-link :to="link" class="tabbar-item" :class="classes" :style="styles" :exact="$parent.exact"
                 :active-class="$parent.activeClass">
        <span class="tabbar-icon">
            <slot name="icon"></slot>
            <span class="tabbar-badge">
                <slot name="badge"></slot>
            </span>
            <span class="tabbar-dot" v-if="dot"></span>
        </span>
        <span class="tabbar-txt">{{title}}</span>
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
                return this.active ? 'tabbar-active' : '';
            },
            styles() {
                return !this.active ? {color: this.$parent.color} : {};
            }
        }
    }
</script>
