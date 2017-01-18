<template>
    <i :class="classes" :style="styles"></i>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-icon',
        props: {
            name: String,
            color: {
                type: String,
                validator(value) {
                    return isColor(value);
                },
                default: '#333'
            },
            size: {
                type: String,
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '.6rem'
            }
        },
        computed: {
            classes() {
                return 'icon-' + this.name;
            },
            styles() {
                const style = {};

                if (!!this.size) {
                    style.fontSize = this.size;
                }

                if (!!this.color) {
                    style.color = this.color;
                }

                return style;
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/icons.less';
</style>
