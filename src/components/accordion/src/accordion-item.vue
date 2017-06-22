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
                show: false,
                height: 0
            }
        },
        props: {
            title: String
        },
        methods: {
            toggle() {
                this.$parent.toggle(this._uid);
                this.height = (this.show ? this.$refs.content.offsetHeight : 0) + 'px';
            }
        }
    }
</script>
