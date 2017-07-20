<template>
    <div>
        <div class="mask-cityselect" v-show="show" @click.stop="close"></div>
        <div class="m-cityselect" :class="show ? 'cityselect-active' : ''">
            <div class="cityselect-header">
                <p class="cityselect-title">{{title}}</p>
                <div v-show="ready" class="cityselect-nav">
                    <a href="javascript:;"
                       v-for="index in columnNum"
                       v-show="!!nav['txt' + index]"
                       @click.stop="navEvent(index)"
                       :class="index == navIndex ? 'cityselect-nav-active' : ''"
                    >{{nav['txt' + index]}}</a>
                </div>
            </div>
            <div v-show="!ready" class="cityselect-loading">加载中</div>
            <ul v-show="ready" class="cityselect-content" :class="activeClasses">
                <li class="cityselect-item" v-for="index in columnNum" :ref="'itemBox' + index">
                    <div class="cityselect-item-box">
                        <a href="javascript:;"
                           :data="item.v" :data2="active['itemValue' + index]"
                           v-for="item in columns['columnItems' + index]"
                           :class="currentClass(item.v, item.n, index)"
                           @click.stop="itemEvent(index, item.n, item.v, item.c)"
                        ><span>{{item.n}}</span></a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/babel">
    import {addClass, removeClass, getScrollview, isIOS} from '../../../utils/assist';

    export default {
        name: 'yd-cityselect',
        data() {
            return {
                show: this.value,
                navIndex: 1,
                nav: {
                    txt1: '请选择',
                    txt2: '',
                    txt3: ''
                },
                columns: {
                    columnItems1: this.items,
                    columnItems2: [],
                    columnItems3: []
                },
                active: {},
                activeClasses: '',
                itemHeight: 40,
                columnNum: 1
            }
        },
        props: {
            ready: {
                type: Boolean,
                default: true
            },
            provance: String,
            city: String,
            area: String,
            done: Function,
            title: {
                type: String,
                default: '所在地区'
            },
            value: {
                type: Boolean,
                default: false
            },
            items: {
                type: Array,
                required: true
            }
        },
        watch: {
            value(val) {
                if (isIOS) {
                    if (val) {
                        addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    } else {
                        removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    }
                }

                this.show = val;
            },
            ready(val) {
                val && setTimeout(this.init, 0);
            }
        },
        methods: {
            init() {
                this.scrollView = getScrollview(this.$el);

                if (!this.ready)return;

                this.isArray(this.items) && this.provance && this.setDefalutValue(this.items, 'provance', 1);
            },
            navEvent(index) {
                if (this.columnNum > 2) {
                    if (index >= this.columnNum) {
                        this.forwardView(true);
                    } else {
                        this.backoffView();
                    }
                }

                this.navIndex = index;
            },
            itemEvent(index, name, value, children) {
                this.active['itemValue' + index] = value;
                this.active['itemName' + index] = name;
                this.nav['txt' + index] = name;
                this.columns['columnItems' + (index + 1)] = children;

                if (index > 1 && children && this.columnNum > 2) {
                    this.forwardView(true);
                }

                this.clearNavTxt(index);

                if (index === this.columnNum || children.length <= 0) {
                    this.navIndex = index;
                    this.returnValue();
                } else {
                    this.navIndex = index + 1;
                    this.nav['txt' + (index + 1)] = '请选择';
                }
            },
            currentClass(v, n, index) {
                return (v && v == this.active['itemValue' + index]) || (n && n === this.active['itemName' + index]) ? 'cityselect-item-active' : '';
            },
            clearNavTxt(index) {
                for (let i = 0; i < this.columnNum; i++) {
                    if (i > index) {
                        this.nav['txt' + (i + 1)] = '';
                    }
                }
            },
            getColumsNum(arr) {
                if (this.isArray(arr.c)) {
                    this.columnNum++;
                    this.getColumsNum(arr.c[0]);
                }
            },
            isArray(arr) {
                return arr && arr.constructor === Array && arr.length > 0;
            },
            setDefalutValue(items, currentValue, index) {
                items.every((item, key) => {
                    if (item.v == this[currentValue] || item.n === this[currentValue]) {
                        const childrenItems = this.columns['columnItems' + (index + 1)] = item.c;
                        const itemBox = this.$refs['itemBox' + index][0];

                        itemBox.scrollTop = key * this.itemHeight - itemBox.offsetHeight / 3;

                        this.active['itemValue' + index] = item.v;
                        this.active['itemName' + index] = item.n;

                        this.nav['txt' + index] = item.n;
                        this.navIndex = index;

                        ++index;

                        index >= this.columnNum && this.columnNum > 2 && this.forwardView(false);

                        this.isArray(childrenItems) && this.setDefalutValue(childrenItems, ['', 'provance', 'city', 'area'][index], index);

                        return false;
                    }
                    return true;
                });
            },
            returnValue() {
                this.done(this.active);
                this.close();
            },
            close() {
                isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');

                this.$emit('input', false);
                this.show = false;
            },
            backoffView() {
                this.activeClasses = 'cityselect-move-animate cityselect-prev';
            },
            forwardView(animate) {
                this.activeClasses = (animate ? 'cityselect-move-animate' : '') + ' cityselect-next';
            }
        },
        created() {
            this.items && this.items[0] && this.getColumsNum(this.items[0]);
        },
        mounted() {
            this.init();
        },
        destroyed() {
            this.close();
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/cityselect.less";
</style>
