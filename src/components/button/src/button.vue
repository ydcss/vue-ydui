<template>
    <button :disabled="disabled" :class="classes" :style="{backgroundColor: bgcolor, color: color}">
        <slot></slot>
    </button>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-button',
        props: {
            disabled: Boolean,
            type: {
                type: String,
                validator(value) {
                    return ['primary', 'danger', 'warning', 'hollow', 'disabled'].indexOf(value) > -1;
                },
                default: 'primary'
            },
            size: {
                type: String,
                validator(value) {
                    return ['small', 'large'].indexOf(value) > -1;
                }
            },
            bgcolor: {
                type: String,
                validator(value) {
                    return value || isColor(value);
                }
            },
            color: {
                type: String,
                validator(value) {
                    return isColor(value);
                }
            }
        },
        computed: {
            classes() {
                let s = this.size == 'large' ? 'btn-block' : 'btn';
                let b = 'btn-' + this.type;
                if (this.disabled) {
                    b = 'btn-disabled';
                }

                if (this.bgcolor) {
                    b = '';
                }
                return s + ' ' + b;
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/button.less';
</style>
