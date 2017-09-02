<template>
    <div class="yd-step" :class="'yd-step-theme' + theme">
        <ul class="yd-step-content"
            :style="{paddingBottom: hasBottom ? '42px' : '10px', paddingTop: hasTop ? '42px' : '10px', color: currentColor}">
            <slot></slot>
        </ul>
    </div>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-step',
        data() {
            return {
                hasTop: false,
                hasBottom: false
            }
        },
        props: {
            theme: {
                validator(value) {
                    return ['1', '2'].indexOf(value) > -1;
                },
                default: '1'
            },
            current: {
                validator(val) {
                    return /^\d*$/.test(val);
                },
                default: 0
            },
            currentColor: {
                validator(value) {
                    return isColor(value);
                },
                default: '#0DB78A'
            }
        },
        methods: {
            updateChildStatus(reinit) {
                const childrens = this.$children.filter(item => item.$options.name === 'yd-step-item');
                childrens.forEach((item, key) => {
                    item.stepNumber = key + 1;
                    if (key + 1 === childrens.length && this.current >= item.stepNumber) {
                        item.current = item.stepNumber;
                    } else {
                        item.current = this.current;
                    }

                    item.theme = this.theme;
                    if (!!item.$slots.bottom) {
                        this.hasBottom = true;
                    }
                    if (!!item.$slots.top) {
                        this.hasTop = true;
                    }
                    if (!item.loaded || reinit) {
                        item.setCurrentClass();
                        item.loaded = true;
                    }
                });
            }
        },
        watch: {
            current() {
                this.$nextTick(() => {
                    this.updateChildStatus(true);
                });
            }
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/step.less";
</style>
