<template>
    <router-link class="yd-grids-item" :to="link || ''" :style="styles" :class="$parent.itemHeight != 0 ? 'yd-grids-item-center' : ''" v-if="type == 'link'">
        <div class="yd-grids-icon" v-if="checkIcon">
            <slot name="icon"></slot>
        </div>
        <div class="yd-grids-txt" v-if="checkText">
            <slot name="text"></slot>
        </div>
        <slot name="else"></slot>
    </router-link>
    <a class="yd-grids-item" :href="link || ''" :style="styles" :class="$parent.itemHeight != 0 ? 'yd-grids-item-center' : ''" v-else>
        <div class="yd-grids-icon" v-if="checkIcon">
            <slot name="icon"></slot>
        </div>
        <div class="yd-grids-txt" v-if="checkText">
            <slot name="text"></slot>
        </div>
        <slot name="else"></slot>
    </a>
</template>

<script type="text/babel">
    export default {
        name: "yd-grids-item",
        props: {
            type: {
                validator(value) {
                    return ["link", "a"].indexOf(value) > -1;
                },
                default: "link"
            },
            link: [String, Object]
        },
        computed: {
            checkIcon() {
                return !!this.$slots.icon;
            },
            checkText() {
                return !!this.$slots.text;
            },
            styles() {
                if (this.$parent.itemHeight != 0) {
                    return {
                        height: this.$parent.itemHeight,
                        padding: 0
                    };
                }
            }
        }
    };
</script>

<style lang="less">
    @import "../../../styles/components/grids.less";
</style>
