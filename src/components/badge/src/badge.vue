<template>
    <span class="badge" :class="typesClass" :style="{backgroundColor: bgcolor, color: color}">
        <slot></slot>
    </span>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-badge',
        props: {
            type: {
                validator(value) {
                    return ['primary', 'danger', 'warning', 'hollow'].indexOf(value) > -1;
                }
            },
            shape: {
                validator(value) {
                    return ['circle', 'square'].indexOf(value) > -1;
                }
            },
            color: {
                validator(value) {
                    if(!value) return true;
                    return isColor(value);
                }
            },
            bgcolor: {
                validator(value) {
                    if(!value) return true;
                    return isColor(value);
                }
            }
        },
        computed: {
            typesClass() {
                if (this.bgcolor) {
                    if (this.shape == 'square') {
                        return ' badge-radius';
                    }
                    return '';
                }
                return (this.type ? 'badge-' + this.type : '') + (this.shape == 'square' ? ' badge-radius' : '');
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/badge.less';
</style>
