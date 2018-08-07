<template>
    <div class="yd-preview">
        <slot></slot>
        <div class="yd-preview-footer" v-if="buttons.length > 0">
            <template v-for="item in buttons">
                <template v-if="typeof item.link === 'object'">
                    <router-link :to="item.link" :style="{color: item.color}" @click.native="clickHander(item.click)">{{item.text}}</router-link>
                </template>
                <template v-else>
                    <a :href="item.link ? item.link : 'javascript:;'" :style="{color: item.color}" @click="clickHander(item.click)">{{item.text}}</a>
                </template>
            </template>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-preview',
        props: {
            buttons: [Array]
        },
        methods: {
            clickHander(fn) {
                typeof fn === 'function' && fn();
            }
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/preview.less";
</style>
