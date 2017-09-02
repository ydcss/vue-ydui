<template>
    <div>
        <div class="yd-accordion-title" @click="toggle">
            <span v-if="$slots.title"><slot name="title"></slot></span>
            <span v-else>{{title}}</span>
            <i :class="show ? 'accordion-rotated' : ''"></i>
        </div>
        <div class="yd-accordion-content" :style="styleHeight">
            <div ref="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-accordion-item',
        data() {
            return {
                show: this.open,
                height: 0,
                styleHeight: {height: 0}
            }
        },
        props: {
            title: String,
            open: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            open(val) {
                val ? this.$parent.open(this._uid) : this.closeItem();
            }
        },
        methods: {
            toggle() {
                this.$parent.open(this._uid);
            },
            openItem() {
                this.$parent.opening = true;
                this.styleHeight = {height: this.$refs.content.offsetHeight + 'px'};
                setTimeout(() => {
                    this.styleHeight = {};
                    this.$parent.opening = false;
                }, 200);
                this.show = true;
            },
            closeItem() {
                if (this.styleHeight.height === undefined) {
                    this.styleHeight = {height: this.$refs.content.offsetHeight + 'px'};
                    setTimeout(() => {
                        this.styleHeight = {height: 0};
                    }, 50);
                } else {
                    this.styleHeight = {height: 0};
                }
                this.show = false;
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.open && this.openItem();
            });
        }
    }
</script>
