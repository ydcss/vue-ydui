<template>
    <label class="yd-cell-item" v-if="type == 'label' || type == 'checkbox' || type == 'radio'">
        <span class="yd-cell-left" v-if="checkLeft">
            <span class="yd-cell-icon"><slot name="icon"></slot></span>
            <slot name="left"></slot>
        </span>
        <label class="yd-cell-right" :class="classes">
            <slot name="right"></slot>
            <i v-if="type == 'checkbox'" class="yd-cell-checkbox-icon"></i>
            <i v-if="type == 'radio'" class="yd-cell-radio-icon"></i>
        </label>
    </label>
    <router-link class="yd-cell-item" :to="href" v-else-if="type == 'link'">
        <div class="yd-cell-left" v-if="checkLeft">
            <span class="yd-cell-icon"><slot name="icon"></slot></span>
            <slot name="left"></slot>
        </div>
        <div class="yd-cell-right" :class="classes">
            <slot name="right"></slot>
        </div>
    </router-link>
    <a class="yd-cell-item" :href="href" v-else-if="type == 'a'">
        <div class="yd-cell-left" v-if="checkLeft">
            <span class="yd-cell-icon"><slot name="icon"></slot></span>
            <slot name="left"></slot>
        </div>
        <div class="yd-cell-right" :class="classes">
            <slot name="right"></slot>
        </div>
    </a>
    <div class="yd-cell-item" v-else>
        <div class="yd-cell-left" v-if="checkLeft">
            <span class="yd-cell-icon"><slot name="icon"></slot></span>
            <slot name="left"></slot>
        </div>
        <div class="yd-cell-right" :class="classes">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-cell-item',
        props: {
            type: {
                validator (value) {
                    return ['link', 'a', 'label', 'div', 'checkbox', 'radio'].indexOf(value) > -1;
                },
                default: 'div'
            },
            arrow: {
                type: Boolean,
                default: false
            },
            href: {
                type: [String, Object]
            }
        },
        computed: {
            checkLeft() {
                return !!this.$slots.left || !!this.$slots.icon;
            },
            classes() {
                return this.arrow ? 'yd-cell-arrow' : '';
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/cell.less';
</style>
