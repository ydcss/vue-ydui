<template>
    <label class="yd-checkbox" :class="shape == 'circle' ? 'yd-checkbox-circle' : ''">
        <template v-if="group">
            <input type="checkbox" v-model="model" :value="val" @change="changeHandler" :disabled="disabled" />
        </template>
        <template v-else>
            <input type="checkbox"
                   v-model="checked"
                   v-checkall="update"
                   :disabled="disabled"
                   :true-value="trueValue"
                   :false-value="falseValue"
            />
        </template>

        <span class="yd-checkbox-icon" :style="iconStyles()"><i :style="checkIconStyles()"></i></span>

        <template v-if="!$slots.default">
            <span class="yd-checkbox-text">{{val}}</span>
        </template>
        <template v-else>
            <span class="yd-checkbox-text"><slot></slot></span>
        </template>
    </label>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-checkbox',
        data() {
            return {
                model: [],
                group: false,
                checked: this.value,
                update: this.change
            }
        },
        directives: {
            checkall: {
                bind(el, binding) {
                    el.addEventListener('click', binding.value);
                }
            }
        },
        props: {
            change: {
                type: Function
            },
            value: {
                type: [Boolean, String, Number],
                default: false
            },
            val: {
                type: [Boolean, String, Number]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            color: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#4CD864'
            },
            size: {
                validator(val) {
                    return /^([1-9]\d*)$/.test(val);
                },
                default: 20
            },
            shape: {
                validator(value) {
                    return ['square', 'circle'].indexOf(value) > -1;
                },
                default: 'square'
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            }
        },
        methods: {
            changeHandler() {
                if (this.disabled) return;
                setTimeout(() => {
                    this.$parent.change(this.model);
                }, 0);
            },
            iconStyles() {
                const size = (this.group ? this.$parent.size : this.size) + 'px';
                const color = this.group ? this.$parent.color : this.color;

                return {
                    width: size,
                    height: size,
                    color: color
                };
            },
            checkIconStyles() {
                const size = this.group ? this.$parent.size : this.size;

                return {
                    width: Math.round(size / 3.2) + 'px',
                    height: Math.round(size / 1.7) + 'px'
                }
            }
        },
        watch: {
            checked(val) {
                this.$emit('input', val);
            },
            value(val) {
                this.checked = val;
            }
        },
        created() {
            if (this.$parent.$options && this.$parent.$options.name === 'yd-checkbox-group') {
                this.group = true;
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/checkbox.less';
</style>
