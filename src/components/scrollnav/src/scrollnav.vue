<template>
    <div class="yd-scrollnav">
        <div class="yd-scrollnav-tab" :style="{color: color, backgroundColor: bgcolor}" ref="navbox">
            <div class="yd-scrollnav-unfold" :class="toggle ? 'yd-scrollnav-unfold-active' : ''">
                <div class="yd-scrollnav-unfold-header" :style="{height: height, borderColor: borderColor}">
                    <div v-html="toggleText" :style="{backgroundColor: bgcolor}"></div>
                    <span></span>
                </div>
                <ul :style="{color: currentColor, backgroundColor: bgcolor}">
                    <li :style="{color: color}"
                        v-for="item, i in navList" :key="i"
                        @click.stop="scrollContent(i)"
                        :class="activeIndex === i ? 'yd-scrollnav-current' : ''"
                    >{{item.label}}
                    </li>
                </ul>
            </div>
            <ul class="yd-scrollnav-tab-item" ref="nav"
                :style="{color: currentColor, height: height}">
                <li :style="{color: color}"
                    v-for="item, i in navList" :key="i"
                    :class="activeIndex === i  ? 'yd-scrollnav-current' : ''"
                    :ref="'navitem_' + i"
                    @click.stop="scrollContent(i)"
                ><i></i><span>{{item.label}}</span>
                </li>
            </ul>
            <div class="yd-scrollnav-toggle" :class="toggle ? 'yd-scrollnav-toggle-active' : ''"
                 @click="toggle = !toggle"></div>
        </div>
        <div class="yd-scrollnav-content" ref="scrollView">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    import {isColor, scrollTop} from '../../../utils/assist';

    export default {
        name: 'yd-scrollnav',
        data() {
            return {
                toggle: false,
                activeIndex: this.index,
                navList: [],
                currentOffset: 0,
                currentPosition: 0,
                scrolling: false
            }
        },
        props: {
            index: {
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                },
                default: 0
            },
            height: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '.9rem'
            },
            color: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#333'
            },
            currentColor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#F00'
            },
            toggleText: {
                type: String,
                default: '切换分类'
            },
            bgcolor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#FFF'
            },
            borderColor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#EFEFEF'
            },
            callback: {
                type: Function
            }
        },
        watch: {
            activeIndex(val) {
                this.scrollNav(this.navList[val]._uid);
            },
            index(index) {
                this.activeIndex = index;
                this.scrollContent(index);
            }
        },
        methods: {
            init() {
                this.scrollView = this.$refs.scrollView;

                this.contentOffsetTop = this.scrollView.getBoundingClientRect().top;

                this.bindEvent();

                if (this.index > 0) {
                    this.scrollNav(this.navList[this.index]._uid, false);
                    this.scrollContent(this.index, false);
                }
            },
            addItem(panel) {
                this.navList.push(panel);
            },
            bindEvent() {
                this.scrollView.addEventListener('scroll', this.scrollHandler);
                window.addEventListener('resize', this.scrollHandler);
            },
            getPanels() {
                return this.$children.filter(item => item.$options.name === 'yd-scrollnav-panel');
            },
            scrollHandler() {
                if (this.scrolling) return;

                const panels = this.getPanels();
                const panelsLength = panels.length;
                const scrollBox = this.scrollView;

                if (scrollBox.scrollTop >= panels[0].$el.offsetHeight * panelsLength - scrollBox.offsetHeight) {
                    this.activeIndex = panelsLength - 1;
                    return;
                }

                panels.forEach((panel, index) => {
                    if (panel.$el.getBoundingClientRect().top <= scrollBox.offsetHeight / 2 + this.contentOffsetTop) {
                        this.activeIndex = index;
                    }
                });
            },
            scrollNav(_uid, animate = true) {
                const navWidth = ~~this.$refs.nav.offsetWidth / 2;

                this.navList.every((item, index) => {
                    if (item._uid === _uid) {
                        const navitem = this.$refs['navitem_' + index][0];
                        const scrollOffset = navitem.offsetLeft - navWidth + navitem.offsetWidth / 2;

                        this.scrollLeft(this.currentOffset, scrollOffset, animate, () => {
                            this.callback && this.callback(index);
                        });
                        return false;
                    }
                    return true;
                });
            },
            scrollContent(index, animate = true) {
                this.toggle = false;
                this.activeIndex = index;
                this.scrolling = true;

                const panel = this.getPanels()[index].$el;
                const speed = animate && (window.navigator && window.navigator.userAgent || '').indexOf('MicroMessenger') < 0 ? 500 : 0;

                scrollTop(this.scrollView, this.currentPosition, panel.offsetTop - this.$refs.navbox.offsetHeight, speed, () => {
                    this.scrolling = false;
                });

                this.currentPosition = panel.offsetTop - this.$refs.navbox.offsetHeight;
            },
            scrollLeft(from, to, animate, callback) {
                const difference = Math.abs(from - to);
                const step = animate ? Math.ceil(difference / 600 * 50) : difference;
                const self = this;

                function scroll(start, end, step) {
                    if (start === end) {
                        callback && callback();
                        return;
                    }

                    let d = (start + step > end) ? end : start + step;
                    if (start > end) {
                        d = (start - step < end) ? end : start - step;
                    }
                    self.$refs.nav.scrollLeft = d;
                    self.currentOffset = d;
                    window.requestAnimationFrame(() => scroll(d, end, step));
                }

                scroll(from, to, step);
            }
        },
        mounted() {
            this.$nextTick(this.init);
        },
        beforeDestroy() {
            this.scrollView.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/scrollnav.less";
</style>
