<template>
    <div class="yd-scrolltab">
        <div class="yd-scrolltab-nav" ref="navbox">
            <a href="javascript:;"
               class="yd-scrolltab-item"
               v-for="item, key in navList"
               :key="key"
               :ref="`tabitem_${key}`"
               :class="activeIndex == key ? 'yd-scrolltab-active' : ''"
               @click="moveHandler(key)">
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
                activeIndex: this.index,
                timer: null,
                navtop: 0
            }
        },
        props: {
            index: {
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                },
                default: 0
            },
            callback: {
                type: Function
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
                this.getPanels().every((panel, index) => {
                    if (this.activeIndex === index) {
                        this.moveHandler(index);
                        return false;
                    }
                    return true;
                });
            },
            moveHandler(index) {
                this.activeIndex = index;

                this.scrollContent(index);
            },
            scrollContent(index) {
                if (this.scrolling) return;
                this.scrolling = true;

                const itemOffsetTop = this.getPanels()[index].$el.getBoundingClientRect().top;
                this.scrollView.scrollTop = itemOffsetTop + this.scrollView.scrollTop - this.contentOffsetTop + 2;

                setTimeout(() => {
                    this.scrolling = false;
                }, 10);
            },
            navInView(index = 0) {
                const navitem = this.$refs['tabitem_' + index][0];
                const height = ~~navitem.offsetHeight;

                if (navitem.offsetTop - height <= this.navtop) {
                    this.navtop -= height;
                } else {
                    if (navitem.offsetTop + height * 3 >= this.scrollView.offsetHeight) {
                        this.navtop += height;
                    }
                }

                this.$refs.navbox.scrollTop = this.navtop;
            },
            scrollHandler() {
                if (this.scrolling) return;

                const panels = this.getPanels();
                const panelsLength = panels.length;
                const scrollBox = this.scrollView;
                const scrollBoxHeight = scrollBox.offsetHeight;
                const scrollBoxTop = scrollBox.scrollTop;
                const panelItemHeight = panels[0].$el.offsetHeight;

                if (scrollBoxTop >= panelItemHeight * panelsLength - scrollBoxHeight) {
                    this.activeIndex = panelsLength - 1;
                    return;
                }

                panels.forEach((panel, index) => {
                    if (panel.$el.getBoundingClientRect().top <= this.contentOffsetTop) {
                        this.activeIndex = index;
                    }
                });
            }
        },
        watch: {
            navList() {
                this.setDefault();
            },
            activeIndex(index) {
                this.navInView(index);
                this.callback && this.callback(index);
            },
            index(index) {
                this.scrollContent(index);
                this.activeIndex = index;
            }
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.scrollView.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/scrolltab.less";
</style>
