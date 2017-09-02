<template>
    <div class="yd-scrolltab">
        <div class="yd-scrolltab-nav">
            <a href="javascript:;" class="yd-scrolltab-item"
               v-for="item in navList"
               :class="activeIndex == item._uid ? 'yd-scrolltab-active' : ''"
               @click="moveHandler(item._uid)">
                <div class="yd-scrolltab-icon"><i :class="item.icon"></i></div>
                <div class="yd-scrolltab-title">{{item.label}}</div>
            </a>
        </div>
        <div class="yd-scrolltab-content" ref="scrollView">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-scrolltab',
        data() {
            return {
                scrolling: false,
                navList: [],
                activeIndex: 0,
                timer: null
            }
        },
        methods: {
            init() {
                this.scrollView = this.$refs.scrollView;

                this.contentOffsetTop = this.scrollView.getBoundingClientRect().top;

                this.bindEvent();
            },
            addItem(panel) {
                this.navList.push(panel);
            },
            getPanels() {
                return this.$children.filter(item => item.$options.name === 'yd-scrolltab-panel');
            },
            bindEvent() {
                this.scrollView.addEventListener('scroll', this.scrollHandler);
                window.addEventListener('resize', this.scrollHandler);
            },
            setDefault() {
                const panels = this.getPanels();

                let num = 0;
                panels.forEach((panel) => {
                    if (panel.active) {
                        this.activeIndex = panel._uid;
                        this.moveHandler(panel._uid);
                    } else {
                        ++num;
                        if (num >= panels.length)
                            this.activeIndex = panels[0]._uid;
                    }
                });
            },
            moveHandler(uid) {
                if (this.scrolling)return;
                this.scrolling = true;

                const panels = this.getPanels();
                const itemOffsetTop = panels.filter(item => item._uid == uid)[0].$el.getBoundingClientRect().top;

                this.scrollView.scrollTop = itemOffsetTop + this.scrollView.scrollTop - this.contentOffsetTop + 2;
                this.activeIndex = uid;

                setTimeout(() => {
                    this.scrolling = false;
                }, 6);
            },
            scrollHandler() {
                if (this.scrolling)return;

                const panels = this.getPanels();
                const panelsLength = panels.length;
                const scrollBox = this.scrollView;
                const scrollBoxHeight = scrollBox.offsetHeight;
                const scrollBoxTop = scrollBox.scrollTop;
                const panelItemHeight = panels[0].$el.offsetHeight;

                if (scrollBoxTop >= panelItemHeight * panelsLength - scrollBoxHeight) {
                    this.activeIndex = panels[panelsLength - 1]._uid;
                    return;
                }

                panels.forEach((panel) => {
                    if (panel.$el.getBoundingClientRect().top <= this.contentOffsetTop) {
                        this.activeIndex = panel._uid;
                    }
                });
            }
        },
        watch: {
            navList() {
                this.setDefault();
            }
        },
        mounted() {
            this.init();
        },
        destroyed() {
            this.scrollView.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/scrolltab.less";
</style>
