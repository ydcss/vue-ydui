<template>
    <span class="badge" :class="typesClass" :style="{backgroundColor: bgcolor, color: color}">
        <slot></slot>
    </span>
</template>

<script type="text/babel">
    export default {
        name: 'yd-badge',
        props: {
            type: {
                type: String,
                validator(value) {
                    return ['primary', 'danger', 'warning', 'hollow'].indexOf(value) > -1;
                }
            },
            color: {
                type: String,
                validator(value) {
                    return value || isColor(value);
                }
            },
            bgcolor: {
                type: String,
                validator(value) {
                    return value || isColor(value);
                }
            }
        },
        computed: {
            typesClass() {
                if (this.bgcolor) {
                    return '';
                }
                return this.type ? 'badge-' + this.type : '';
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/badge.less';
</style>
