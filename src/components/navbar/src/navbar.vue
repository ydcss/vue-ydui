<template>
    <header class="yd-navbar navbar-bottom-line-color" :class="classes" :style="{backgroundColor: bgcolor, height: height}">
        <div class="yd-navbar-item">
            <slot name="left"></slot>
        </div>
        <div class="yd-navbar-center-box" :style="{height: height}">
            <div class="yd-navbar-center">
                <slot name="center"><span class="yd-navbar-center-title" :style="{color: color, fontSize: fontsize}">{{title}}</span></slot>
            </div>
        </div>
        <div class="yd-navbar-item">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-navbar',
        props: {
            title: String,
            fixed: Boolean,
            bgcolor: {
                validator(value) {
                    if(!value) return true;
                    return isColor(value);
                },
                default: '#FFF'
            },
            color: {
                validator(value) {
                    if(!value) return true;
                    return isColor(value);
                },
                default: '#5C5C5C'
            },
            fontsize: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '.4rem'
            },
            height: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '1rem'
            }
        },
        computed: {
            classes() {
                return this.fixed ? 'yd-navbar-fixed' : '';
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/navbar.less';
</style>
