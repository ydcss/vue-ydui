<template>
    <input type="checkbox"
           class="yd-switch"
           :class="`yd-switch-${size}`"
           :true-value="trueValue"
           :false-value="falseValue"
           :disabled="disabled"
           v-model="checked"
           :style="{color: color}"
    />
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    /**
     * 不兼容鸟包火狐
     */
    export default {
        name: 'yd-switch',
        data() {
            return {
                checked: this.value
            }
        },
        props: {
            value: [String, Number, Boolean],
            disabled: {
                type: Boolean,
                default: false
            },
            color: {
                validator(value) {
                    if(!value) return true;
                    return isColor(value);
                },
                default: '#4CD864'
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
            size: {
                validator(val) {
                    return ['small', 'normal', 'large'].indexOf(val) > -1;
                },
                default: 'normal'
            },
            val: {
                type: [Boolean, String, Number]
            },
            callback: {
                type: Function,
                default: () => {}
            }
        },
        watch: {
            checked(val) {
                this.$emit('input', val);
                this.callback(val, this.val);
            },
            value(val) {
                this.checked = val;
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/switch.less';
</style>
