<template>
    <div>
        <yd-mask v-model="show" @click.native="close" ref="mask" :opacity="maskerOpacity"></yd-mask>
        <div class="yd-cityselect" :class="show ? 'yd-cityselect-active' : ''">
            <div class="yd-cityselect-header">
                <p class="yd-cityselect-title" @touchstart.stop.prevent="">{{title}}</p>
                <div v-show="ready" class="yd-cityselect-nav">
                    <a href="javascript:;"
                       :key="key"
                       v-for="index, key in columnNum"
                       v-show="!!nav['txt' + index]"
                       @click.stop="navEvent(index)"
                       :class="index == navIndex ? 'yd-cityselect-nav-active' : ''"
                    >{{nav['txt' + index]}}</a>
                </div>
            </div>
            <div v-if="!ready" class="yd-cityselect-loading">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <path stroke="none" d="M3 50A47 47 0 0 0 97 50A47 49 0 0 1 3 50" fill="#bababa"
                          transform="rotate(317.143 50 51)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="linear"
                                          values="0 50 51;360 50 51" keyTimes="0;1" dur="0.6s" begin="0s"
                                          repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
            </div>
            <ul v-show="ready" class="yd-cityselect-content" :class="activeClasses">
                <li class="yd-cityselect-item" v-for="index, key in columnNum" :ref="'itemBox' + index" :key="key">
                    <template v-if="columnsObj['columnItems' + index] && columnsObj['columnItems' + index].length > 0">
                        <div class="yd-cityselect-item-box">
                            <a href="javascript:;"
                               :key="key"
                               v-for="item, key in columnsObj['columnItems' + index]"
                               :class="currentClass(item.v, item.n, index)"
                               @click.stop="itemEvent(index, item.n, item.v, item.c)"
                            ><span>{{item.n}}</span></a>
                        </div>
                    </template>
                    <template v-else>
                        <div class="yd-cityselect-item-box" @touchstart.stop.prevent=""></div>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/babel">
    import {isIOS, pageScroll} from '../../../utils/assist';
    import Mask from '../../mask/src/mask.vue';

    export default {
        name: 'yd-cityselect',
        components: {
            'yd-mask': Mask
        },
        data() {
            return {
                show: this.value,
                navIndex: 1,
                nav: {
                    txt1: this.chooseTitle,
                    txt2: '',
                    txt3: ''
                },
                columnsObj: {
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
            callback: Function,
            title: {
                type: String,
                default: '所在地区'
            },
            chooseTitle: {
                type: String,
                default: '请选择'
            },
            value: {
                type: Boolean,
                default: false
            },
            items: {
                type: Array,
                required: true
            },
            columns: {
                validator(val) {
                    return /^\d*$/.test(val);
                }
            },
            maskerOpacity: {
                validator(val) {
                    return /^([0]|[1-9]\d*)?(\.\d*)?$/.test(val);
                },
                default: .5
            }
        },
        watch: {
            value(val) {
                if (isIOS) {
                    val ? pageScroll.lock(this.$refs.mask.$el) : pageScroll.unlock(this.$refs.mask.$el);
                }
                this.show = val;
            },
            ready(val) {
                val && this.init();
            }
        },
        methods: {
            init() {
                if (!this.ready || !(this.items && this.items[0]) || !this.isArray(this.items)) return;

                if (this.columns && ~~this.columns > 1) {
                    this.columnNum = ~~this.columns;
                } else {
                    this.getColumsNum(this.items[0]);
                }

                this.columnsObj.columnItems1 = this.items;

                this.provance && this.$nextTick(() => {
                    this.setDefalutValue(this.items, 'provance', 1);
                });

                this.$on('ydui.cityselect.reset', () => {
                    for (let i = 1; i <= this.columnNum; i++) {

                        this.active['itemValue' + i] = '';
                        this.active['itemName' + i] = '';

                        if ((i - 1) === 0) {
                            this.navIndex = i;
                            this.nav['txt' + i] = this.chooseTitle;
                            this.$refs['itemBox' + i][0].scrollTop = 0;
                            this.backoffView(false);
                        } else {
                            this.nav['txt' + i] = '';
                            this.columnsObj['columnItems' + i] = [];
                        }

                        if (i === this.columnNum) {
                            this.returnValue();
                        }
                    }
                });
            },
            navEvent(index) {
                if (this.columnNum > 2) {
                    if (index >= this.columnNum) {
                        this.forwardView(true);
                    } else {
                        this.backoffView(true);
                    }
                }
                this.navIndex = index;
            },
            itemEvent(index, name, value, children) {
                this.active['itemValue' + index] = value;
                this.active['itemName' + index] = name;
                this.nav['txt' + index] = name;
                this.columnsObj['columnItems' + (index + 1)] = children;

                if (index > 1 && children && children.length > 0 && this.columnNum > 2) {
                    this.forwardView(true);
                }

                this.clearNavTxt(index);

                if (index === this.columnNum || children.length <= 0) {
                    if (index !== this.columnNum) {
                        for (let i = this.columnNum; i >= 0; i--) {
                            if (i > index) {
                                this.active['itemValue' + i] = '';
                                this.active['itemName' + i] = '';
                                this.nav['txt' + i] = '';
                            }
                        }
                    }
                    this.navIndex = index;
                    this.returnValue();
                } else {
                    this.navIndex = index + 1;
                    this.nav['txt' + (index + 1)] = this.chooseTitle;
                }
            },
            currentClass(v, n, index) {
                return (v && v == this.active['itemValue' + index]) || (n && n === this.active['itemName' + index]) ? 'yd-cityselect-item-active' : '';
            },
            clearNavTxt(index) {
                for (let i = 0; i <= this.columnNum; i++) {
                    if (i > index) {
                        this.nav['txt' + (i + 1)] = '';
                        this.active['itemValue' + i] = '';
                        this.active['itemName' + i] = '';
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
                        const childrenItems = this.columnsObj['columnItems' + (index + 1)] = item.c;
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
                this.callback && this.callback(this.active);
                this.close();
            },
            close() {
                this.$emit('input', false);
                this.show = false;
            },
            backoffView(animate) {
                this.activeClasses = (animate ? 'yd-cityselect-move-animate' : '') + ' yd-cityselect-prev';
            },
            forwardView(animate) {
                this.activeClasses = (animate ? 'yd-cityselect-move-animate' : '') + ' yd-cityselect-next';
            }
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.close();
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/cityselect.less";
</style>
