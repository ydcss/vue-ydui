<template>
    <div class="m-tab">
        <ul class="tab-nav">
            <li class="tab-nav-item"
                v-for="item in navList"
                :class="item._uid == activeIndex ? 'tab-active' : ''"
                @click="changeHandler(item._uid, item.label, item.tabkey)">
                <a href="javascript:;">{{item.label}}</a>
            </li>
        </ul>
        <div class="tab-panel">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
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
            change: Function
        },
        methods: {
            init(update) {
                const tabPanels = this.$children.filter(item => item.$options.name === 'yd-tab-panel');

                let num = 0;

                tabPanels.forEach((panel) => {
                    if (!update) {
                        this.navList.push({
                            label: panel.label,
                            _uid: panel._uid,
                            tabkey: panel.tabkey
                        });
                    }

                    if (panel.active) {
                        this.activeIndex = this.tmpIndex = panel._uid;
                        this.changeHandler(panel._uid, panel.label, panel.tabkey);
                    } else {
                        ++num;
                        if (num >= tabPanels.length) this.activeIndex = this.tmpIndex = tabPanels[0]._uid;
                    }
                });
            },
            changeHandler(uid, label, tabkey) {
                if (this.tmpIndex != uid) {
                    typeof this.change == 'function' && this.change(label, tabkey);
                    this.activeIndex = this.tmpIndex = uid;
                }
            }
        },
        mounted() {
            this.init(false);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/tab.less";
</style>
