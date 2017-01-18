<template>
    <input type="checkbox" @change="changeVal" class="m-switch" v-model="checked"/>
</template>

<script type="text/babel">
    /**
     * 不兼容鸟包火狐
     */
    export default {
        name: 'yd-switch',
        data() {
            return {
                checked: false
            }
        },
        props: {
            value: Boolean
        },
        watch: {
            checked(val) {
                this.$emit('input', val);
            }
        },
        methods: {
            changeVal() {
            }
        },
        mounted() {
            this.checked = this.value;
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/switch.less';
</style>
