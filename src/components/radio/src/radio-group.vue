<template>
    <div>
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-radio-group',
        data () {
            return {
                currentValue: this.value
            }
        },
        props: {
            value: {
                type: [String, Number],
                default: ''
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
            }
        },
        methods: {
            updateValue() {
                const value = this.value;
                this.childrens = this.$children.filter(item => item.$options.name === 'yd-radio');

                if (this.childrens) {
                    this.childrens.forEach(child => {
                        child.checked = value == child.val;
                    });
                }
            },
            change(val) {
                this.currentValue = val;
                this.updateValue();
                this.$emit('input', val);
            }
        },
        watch: {
            value() {
                this.updateValue();
            }
        },
        mounted() {
            this.$nextTick(this.updateValue);
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/radio.less';
</style>
