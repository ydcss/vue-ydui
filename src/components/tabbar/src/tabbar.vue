<template>
    <footer class="m-tabbar" :class="classes" :style="{color: activeColor}">
        <slot></slot>
    </footer>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-tabbar',
        props: {
            fixed: Boolean,
            activeColor: {
                type: String,
                validator(value) {
                    if(!value) return true;
                    return isColor(value);
                },
                default: '#09BB07'
            }
        },
        computed: {
            classes() {
                return this.fixed ? 'tabbar-fixed' : '';
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/tabbar.less';
</style>
