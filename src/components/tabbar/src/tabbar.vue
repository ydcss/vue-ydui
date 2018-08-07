<template>
    <div :style="{height: barHeight}">
        <footer class="yd-tabbar tabbbar-top-line-color" :class="classes" :style="styles" ref="navbar">
            <slot></slot>
        </footer>
    </div>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-tabbar',
        data() {
            return {
                activeIndex: this.value,
                barHeight: 'auto'
            }
        },
        props: {
            value: Number,
            fixed: Boolean,
            exact: {
                type: Boolean,
                default: true
            },
            activeClass: {
                type: String,
                default: 'router-link-active'
            },
            activeColor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#09BB07'
            },
            bgcolor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#FFF'
            },
            color: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#979797'
            },
            fontsize: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '.24rem'
            }
        },
        computed: {
            classes() {
                return this.fixed ? 'yd-tabbar-fixed' : '';
            },
            styles() {
                return {
                    color: this.activeColor,
                    backgroundColor: this.bgcolor,
                    fontSize: this.fontsize
                }
            }
        },
        methods: {
            setCurrent(index) {
                const tabPanels = this.$children.filter(item => item.$options.name === 'yd-tabbar-item');
                tabPanels.forEach((item, key) => {
                    this.$set(item, 'isCurrent', index === key);
                });
            }
        },
        watch: {
            value(val) {
                this.setCurrent(val);
            }
        },
        mounted() {
            this.setCurrent(this.activeIndex);

            if (this.fixed) {
                this.$nextTick(() => {
                    this.barHeight = this.$refs.navbar.offsetHeight;
                });
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/tabbar.less';
</style>


