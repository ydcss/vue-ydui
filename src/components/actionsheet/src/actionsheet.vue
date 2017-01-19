<template>
    <div>
        <div class="mask-actionsheet" v-show="show" @click.stop="close"></div>
        <div class="m-actionsheet" :class="show ? 'actionsheet-active' : ''">
            <a v-for="item in items" @click.stop="itemClick(item)" href="javascript:;" class="actionsheet-item" >{{item.label}}</a>
            <a v-if="cancel" @click.stop="close" href="javascript:;" class="actionsheet-action">{{cancel}}</a>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-actionsheet',
        data() {
            return {
                show: false
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            items: {
                type: Array,
                require: true
            },
            cancel: String
        },
        watch: {
            value(val) {
                this.show = val;
            }
        },
        methods: {
            itemClick(item) {
                if(item) {
                    typeof item.method == 'function' && item.method();
                    !item.unclose && this.close();
                }
            },
            close() {
                this.$emit('input', false);
            }
        },
        destroyed() {
            this.close();
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/actionsheet.less";
</style>
