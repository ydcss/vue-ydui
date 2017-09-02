<template>
    <div class="yd-dialog-black-mask">
        <div class="yd-confirm yd-alert">
            <div class="yd-confirm-bd" v-html="mes"></div>
            <div class="yd-confirm-ft">
                <a href="javascript:;" class="yd-confirm-btn primary" @click.stop="closeAlert">确定</a>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            mes: String,
            callback: Function
        }
    }
</script>

<style lang="less">
    @import "../../../../styles/components/dialog.less";
</style>
