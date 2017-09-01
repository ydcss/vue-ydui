<template>
    <yd-layout title="ActionSheet">

        <yd-button-group>
            <yd-button @click.native="show1 = true" size="large">带取消</yd-button>
            <yd-button @click.native="show2 = true" size="large" type="warning">不带取消</yd-button>
        </yd-button-group>

        <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>

        <yd-actionsheet :items="myItems2" v-model="show2"></yd-actionsheet>

    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                show1: false,
                show2: false,
                myItems1: [
                    {
                        label: '拍照',
                        callback: () => {
                            this.$dialog.toast({mes: '咔擦，此人太帅！', timeout: 1000});
                            //注意： callback: function() {} 和 callback() {}  这样是无法正常使用当前this的
                        }
                    },
                    {
                        label: '从相册中偷取',
                        callback: () => {
                            this.$dialog.toast({mes: '看到了不该看到的东西！', timeout: 1000});
                        }
                    }
                ],
                myItems2: [
                    {
                        label: '示例菜单一 - 我是不会关闭的',
                        callback: () => {
                            this.$dialog.toast({mes: 'Say: 我是不会关闭的！', timeout: 1000});
                        },
                        stay: true // 不关闭
                    },
                    {
                        label: '示例菜单二 - 自动关闭',
                        callback: () => {
                            this.$dialog.toast({mes: 'Say: 我关闭啦啦啦！', timeout: 1000});
                        }
                    },
                    {label: '示例菜单三 - 自动关闭'},
                    {label: '示例菜单四 - 自动关闭'}
                ]
            }
        }
    }
</script>
