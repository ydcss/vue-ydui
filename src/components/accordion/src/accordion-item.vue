<template>
    <div>
        <div class="accordion-title" @click="toggle">
            <span v-if="$slots.title"><slot name="title"></slot></span>
            <span v-else>{{title}}</span>
            <i :class="show ? 'accordion-rotated' : ''"></i>
        </div>
        <div class="accordion-content" :style="{height: height}">
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
                height: 0
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
                this.show = val;
                this.setHeight();
            }
        },
        methods: {
            toggle() {
                this.$parent.open(this._uid);
                this.setHeight();
            },
            setHeight() {
                this.height = (this.show ? this.$refs.content.offsetHeight : 0) + 'px';
            }
        },
        mounted() {
            this.setHeight();
        }
    }
</script>
