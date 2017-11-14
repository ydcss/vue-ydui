<template>
    <div class="yd-tab">
        <ul class="yd-tab-nav" :style="{color: activeColor}" v-show="navList.length > 0">
            <li class="yd-tab-nav-item"
                v-for="item, key in navList"
                :key="key"
                :class="item._uid == activeIndex ? 'yd-tab-active' : ''"
                @click="changeHandler(item._uid, item.label, item.tabkey)">
                <a href="javascript:;">{{item.label}}</a>
            </li>
        </ul>
        <div class="yd-tab-panel">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-tab',
        data() {
            return {
                navList: [],
                activeIndex: 0,
                tmpIndex: 0
            }
        },
        props: {
            change: Function,
            callback: Function,
            activeColor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#FF5E53'
            }
        },
        methods: {
            init(update, status) {
                const tabPanels = this.$children.filter(item => item.$options.name === 'yd-tab-panel');

                let num = 0;

                if (!update) {
                    this.navList = [];
                }

                tabPanels.forEach((panel, index) => {
                    if (status === 'label') {
                        return this.navList[index] = panel;
                    }

                    if (!update) {
                        this.navList.push({_uid: panel._uid, label: panel.label, tabkey: panel.tabkey});
                    }

                    if (panel.active) {
                        this.activeIndex = this.tmpIndex = panel._uid;
                    } else {
                        ++num;
                        if (num >= tabPanels.length) {
                            this.activeIndex = this.tmpIndex = tabPanels[0]._uid;
                        }
                    }
                });
            },
            emitChange(label, tabkey) {
                // TODO 参数更名，即将删除
                if (this.change) {
                    this.change(label, tabkey);
                    console.warn('From VUE-YDUI: The parameter "change" is destroyed, please use "callback".');
                }
                this.callback && this.callback(label, tabkey);
            },
            changeHandler(uid, label, tabkey) {
                if (this.tmpIndex != uid) {
                    this.activeIndex = this.tmpIndex = uid;
                    this.emitChange(label, tabkey);
                }
            }
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/tab.less";
</style>
