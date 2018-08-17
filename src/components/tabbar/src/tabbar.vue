<template>
    <footer class="yd-tabbar" :class="classes" :style="styles" ref="navbar">
        <slot></slot>
    </footer>
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
                default: '.22rem'
            },
            padding: {
                validator(value) {
                    if(Number(value) === 0) {
                        return true;
                    }
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '.06rem'
            },
            borderColor: {
                validator(value) {
                    if(!value) return true;
                    return isColor(value);
                },
                default: '#E4E4E4'
            }
        },
        computed: {
            classes() {
                return this.fixed ? 'yd-tabbar-fixed' : '';
            },
            styles() {
                return {
                    color: this.borderColor,
                    backgroundColor: this.bgcolor,
                    fontSize: this.fontsize,
                    padding: `${this.padding} 0`
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
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/tabbar.less';
</style>


