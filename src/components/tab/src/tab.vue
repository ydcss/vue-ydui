<template>
    <div id="J_Tab" class="m-tab">
        <ul class="tab-nav">
            <li class="tab-nav-item"
                v-for="item in navList"
                :class="item._uid == activeIndex ? 'tab-active' : ''"
                @click="changeHandler(item._uid, item.label)">
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
                activeIndex: 0
            }
        },
        props: {
            change: Function
        },
        methods: {
            init() {
                const tabPanels = this.$children.filter(item => item.$options.name === 'yd-tab-panel');

                let num = 0;

                tabPanels.forEach((panel) => {
                    this.navList.push({
                        label: panel.label,
                        _uid: panel._uid
                    });
                    if (panel.active) {
                        this.activeIndex = panel._uid;
                    } else {
                        ++num;
                        if (num >= tabPanels.length) this.activeIndex = tabPanels[0]._uid;
                    }
                });
            },
            changeHandler(uid, label) {
                typeof this.change == 'function' && this.change(label);
                this.activeIndex = uid;
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/tab.less";
</style>
