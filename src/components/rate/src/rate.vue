<template>
    <span class="yd-rate" :style="{fontSize: size, color: color}">
        <a href="javascript:;" v-for="item in ~~count"
           :class="index >= item ? 'rate-active' : ''"
           :style="{color: index >= item ? activeColor : color, paddingRight: padding}"
           @click="!readonly && choose(item)"
        ></a>
        <span class="yd-rate-text" v-if="!!str" v-html="str"></span>
    </span>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-rate',
        data() {
            return {
                index: 0,
                str: ''
            }
        },
        watch: {
            value(val) {
                this.choose(val);
            }
        },
        props: {
            count: {
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                },
                default: 5
            },
            size: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '.5rem'
            },
            color: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#CCC'
            },
            activeColor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#FF5D50'
            },
            value: {
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                }
            },
            showText: {
                type: Array
            },
            readonly: {
                type: Boolean,
                default: false
            },
            padding: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '.06rem'
            }
        },
        methods: {
            choose(index) {
                this.index = index;
                this.$emit('input', index);
                if (!!this.showText) {
                    this.str = (this.showText[index - 1] || '').replace('$', index);
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.choose(this.value);
            });
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/rate.less";
</style>
