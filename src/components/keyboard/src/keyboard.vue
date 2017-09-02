<template>
    <div>
        <div class="yd-keyboard-mask" v-if="triggerClose" v-show="show" @click.stop="close"></div>
        <div class="yd-mask-keyboard" v-else v-show="show"></div>
        <div class="yd-keyboard" :class="show ? 'yd-keyboard-active' : ''">
            <div class="yd-keyboard-head">
                <strong>输入数字密码</strong>
            </div>
            <div class="yd-keyboard-error">{{error}}</div>
            <ul class="yd-keyboard-password">
                <li v-for="n in 6"><i v-show="nums.length >= n"></i></li>
            </ul>
            <div class="yd-keyboard-content">
                <div class="yd-keyboard-title">{{title}}</div>
                <ul class="yd-keyboard-numbers">
                    <li v-for="i in 4">
                        <template v-if="triggerClose">
                            <a href="javascript:;" v-if="i == 4" @click.stop="close">取消</a>
                        </template>
                        <template v-else>
                            <a href="javascript:;" v-if="i == 4"></a>
                        </template>
                        <template v-if="isMobile">
                            <a href="javascript:;" v-for="n in numsArr.slice((i - 1) * 3, i * 3)" @touchstart.stop="numclick(n)">{{n}}</a>
                        </template>
                        <template v-else>
                            <a href="javascript:;" v-for="n in numsArr.slice((i - 1) * 3, i * 3)" @click.stop="numclick(n)">{{n}}</a>
                        </template>
                        <a href="javascript:;" v-if="i == 4" @click.stop="backspace"></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import {addClass, removeClass, getScrollview, pageScroll, isIOS} from '../../../utils/assist';

    export default {
        name: 'yd-keyboard',
        data() {
            return {
                nums: '',
                show: this.value,
                error: '',
                numsArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
            }
        },
        props: {
            inputDone: {
                type: Function
            },
            callback: {
                type: Function
            },
            disorder: {
                type: Boolean,
                default: false
            },
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: 'YDUI安全键盘'
            },
            triggerClose: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            value(val) {
                if (isIOS) {
                    if (val) {
                        pageScroll.lock();
                        addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    } else {
                        pageScroll.unlock();
                        removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    }
                }

                this.nums = '';
                this.error = '';
                this.show = val;

                if (this.show && this.disorder) {
                    this.numsArr = this.upsetOrder(this.numsArr);
                }
            },
            nums(val) {
                if (val.length >= 6) {
                    // TODO 参数更名，即将删除
                    this.inputDone && this.inputDone(val);
                    this.callback && this.callback(val);
                }
            }
        },
        methods: {
            init() {
                this.scrollView = getScrollview(this.$el);

                this.$on('ydui.keyboard.error', (error) => {
                    this.setError(error);
                });

                this.$on('ydui.keyboard.close', this.close);
            },
            numclick(num) {
                this.error = '';
                if (this.nums.length >= 6)return;
                this.nums += num;
            },
            backspace() {
                const nums = this.nums;

                if (nums) {
                    this.nums = nums.substr(0, nums.length - 1);
                }
            },
            upsetOrder(arr) {
                const floor = Math.floor;
                const random = Math.random;
                const len = arr.length;

                let i, j, temp, n = floor(len / 2) + 1;

                while (n--) {
                    i = floor(random() * len);
                    j = floor(random() * len);
                    if (i !== j) {
                        temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
                return arr;
            },
            close() {
                isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');

                this.$emit('input', false);
            },
            setError(error) {
                this.error = error;
                this.nums = '';
            }
        },
        created() {
            const ua = window.navigator && window.navigator.userAgent || '';

            this.isMobile = !!ua.match(/AppleWebKit.*Mobile.*/) || 'ontouchstart' in document.documentElement;

            this.$nextTick(this.init);
        },
        destroyed() {
            this.close();
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/keyboard.less";
</style>
