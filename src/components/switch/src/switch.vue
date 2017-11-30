<template>
    <input type="checkbox"
           class="yd-switch"
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
            }
        },
        watch: {
            checked(val) {
                this.$emit('input', val);
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
