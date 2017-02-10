<template>
    <label class="cell-item" v-if="type == 'label' || type == 'choose'">
        <div class="cell-left" v-if="checkLeft">
            <span class="cell-icon"><slot name="icon"></slot></span>
            <slot name="left"></slot>
        </div>
        <div class="cell-right" :class="classes">
            <slot name="right"></slot>
        </div>
    </label>
    <router-link class="cell-item" :to="href" v-else-if="type == 'link' || !!href">
        <div class="cell-left" v-if="checkLeft">
            <span class="cell-icon"><slot name="icon"></slot></span>
            <slot name="left"></slot>
        </div>
        <div class="cell-right" :class="classes">
            <slot name="right"></slot>
        </div>
    </router-link>
    <div class="cell-item" v-else>
        <div class="cell-left" v-if="checkLeft">
            <span class="cell-icon"><slot name="icon"></slot></span>
            <slot name="left"></slot>
        </div>
        <div class="cell-right" :class="classes">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-cell-item',
        props: {
            type: {
                type: String,
                validator (value) {
                    return ['link', 'label', 'div', 'choose'].indexOf(value) > -1;
                }
            },
            arrow: {
                type: Boolean,
                default: false
            },
            href: {
                type: String
            }
        },
        computed: {
            checkLeft() {
                return !!this.$slots.left || !!this.$slots.icon;
            },
            classes() {
                let _class = '';
                if (this.type == 'choose') {
                    _class += 'cell-choose ';
                }
                return _class += (this.arrow ? 'cell-arrow' : '');
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/cell.less';
</style>
