<template>
    <div>
        <div class="yd-search">
            <div class="yd-search-input">
                <form action="#" class="search-input" @submit.prevent="submit">
                    <i class="search-icon"></i>
                    <yd-search-input
                            type="search"
                            :placeholder="placeholder"
                            v-model="currentValue"
                            :readonly="fullpage"
                            @click.native="open"
                            ref="search"
                    ></yd-search-input>
                </form>
                <a href="javascript:;" class="cancel-text" v-show="currentValue !== '' && !fullpage" @click="close(false)">{{cancelText}}</a>
            </div>
        </div>

        <template v-if="fullpage">
            <div class="yd-search yd-search-fly" :class="show ? 'yd-search-show' : ''" :style="{top: top}">
                <div class="yd-search-input">
                    <form action="#" class="search-input" @submit.prevent="submit">
                        <i class="search-icon"></i>
                        <yd-search-input
                                type="search"
                                :placeholder="placeholder"
                                v-model="currentValue"
                                ref="search"
                        ></yd-search-input>
                    </form>
                    <a href="javascript:;" class="cancel-text" @click="close(false)">{{cancelText}}</a>
                </div>
                <div class="yd-search-list" :style="{paddingBottom: top}">
                    <p class="yd-search-list-item" v-for="item, key in result" @click="clickHandler(item)" :key="key">
                        {{item.label || item}}</p>
                    <slot></slot>
                </div>

            </div>
        </template>
    </div>
</template>

<script type="text/babel">
    import {addClass, removeClass, getScrollview, isIOS} from '../../../utils/assist';
    import Input from '../../input/src/input.vue';

    export default {
        name: 'yd-search',
        extends: Input,
        components: {
            'yd-search-input': Input
        },
        data() {
            return {
                show: false,
                currentValue: this.value
            }
        },
        props: {
            placeholder: {
                type: String,
                default: '搜 索'
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            result: {
                type: Array,
                default() {
                    return [];
                }
            },
            itemClick: {
                type: Function
            },
            value: {
                type: String,
                default: ''
            },
            fullpage: {
                type: Boolean,
                default: false
            },
            top: {
                validator(value) {
                    return /^-?(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '-1px'
            },
            onSubmit: {
                type: Function
            },
            onCancel: {
                type: Function
            },
            onKeyup: {
                type: Function
            }
        },
        watch: {
            currentValue(val) {
                this.$emit('input', val);
            },
            value(val) {
                this.currentValue = val;
            },
            show(val) {
                if (val) {
                    this.$refs.search.setFocus();
                    if (isIOS) addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                } else {
                    this.$refs.search.setBlur();
                    if (isIOS) removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                }
            }
        },
        methods: {
            open() {
                if (this.fullpage) {
                    this.show = true;
                    this.$refs.search.setFocus();
                }
            },
            close(internalClose) {
                this.show = false;
                if (!internalClose) {
                    this.onCancel && this.onCancel();
                }
            },
            submit() {
                this.$refs.search.setBlur();
                this.onSubmit && this.onSubmit(this.currentValue);
                this.close(true);
            },
            clickHandler(item) {
                this.currentValue = item.label ? item.label : item;
                this.itemClick && this.itemClick(item);
                this.close(true);
            }
        },
        destroyed() {
            isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
        },
        mounted() {
            this.scrollView = getScrollview(this.$el);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/search.less";
</style>
