<template>
    <div class="mask-black-dialog">
        <div class="m-confirm">
            <div class="confirm-hd"><strong class="confirm-title" v-html="title"></strong></div>
            <div class="confirm-bd" v-html="mes"></div>
            <template v-if="typeof opts == 'function'">
                <div class="confirm-ft">
                    <a href="javascript:;" class="confirm-btn default" @click="closeConfirm(false)">取消</a>
                    <a href="javascript:;" class="confirm-btn primary" @click="closeConfirm(false, opts)">确定</a>
                </div>
            </template>
            <template v-else>
                <div class="confirm-ft">
                    <a href="javascript:;" class="confirm-btn"
                       v-for="item in opts"
                       :class="typeof item.color == 'boolean' ? (item.color ? 'primary' : 'default') : ''"
                       :style="{color: item.color}"
                       @click="closeConfirm(item.stay, item.callback)"
                    >{{item.txt}}</a>
                </div>
            </template>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            title: String,
            mes: String,
            opts: {
                type: [Array, Function],
                default: () => {
                }
            }
        }
    }
</script>
