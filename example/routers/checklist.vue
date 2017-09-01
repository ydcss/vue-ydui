<template>
    <yd-layout title="CheckList">

        <div style="padding-left:12px;margin-bottom: 10px;" class="demo-small-pitch">
            <yd-checkbox v-model="isCheckAll" shape="circle" @click.native="checkAll">全选 {{isCheckAll}} - <span style="font-size: 12px;">结合yd-checkbox组件实现全选</span></yd-checkbox>
        </div>
        <yd-checklist v-model="checklist1" ref="checklistDemo" :callback="change">
            <yd-checklist-item val="1">
                <div style="height: 50px;line-height: 50px;">1 -- 值：{{checklist1}}</div>
            </yd-checklist-item>
            <yd-checklist-item val="2">
                <div style="height: 50px;line-height: 50px;">2</div>
            </yd-checklist-item>
            <yd-checklist-item val="3">
                <div style="height: 50px;line-height: 50px;">3</div>
            </yd-checklist-item>
        </yd-checklist>

        <yd-checklist v-model="checklist2" class="demo-small-pitch" :label="false">
            <yd-checklist-item val="aaa">
                <yd-flexbox style="padding: 15px 0;">
                    <img src="//img12.360buyimg.com/n1/jfs/t2122/170/1006550413/171711/de099a6f/56399d01N67907749.jpg" class="demo-checklist-img">
                    <yd-flexbox-item align="top">
                        [aaa] 类似购物车 / 类似购物车<br/>
                        <span style="color: blue;">点击这边的内容是禁止选中的</span><br/>
                        <p style="color:#F00;">选中值：{{checklist2}}</p>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-checklist-item>
            <yd-checklist-item val="bbb">
                <yd-flexbox style="padding: 15px 0;">
                    <img src="//img10.360buyimg.com/n1/jfs/t6925/75/2382158459/437865/f3931d24/598be5b1N24d949fe.jpg" class="demo-checklist-img">
                    <yd-flexbox-item align="top">
                        [bbb] 南非进口红西柚 6个 单果重约300-330g 新鲜水果
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-checklist-item>
            <yd-checklist-item val="ccc">
                <yd-flexbox style="padding: 15px 0;">
                    <img src="//img14.360buyimg.com/n1/jfs/t3232/69/539717695/176729/cf1ff3d8/57baa5d1N901ffea5.jpg" class="demo-checklist-img">
                    <yd-flexbox-item align="top">
                        [ccc] 展卉 越南进口红心火龙果 3个装中果 单果约300~350g 新鲜水果
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-checklist-item>
        </yd-checklist>

    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                checklist1: [1],
                checklist2: [],
                isCheckAll: false
            }
        },
        methods: {
            change(value, isCheckAll) {
                this.isCheckAll = isCheckAll;
            },
            checkAll() {
                this.isCheckAll = !this.isCheckAll;
                this.$refs.checklistDemo.$emit('ydui.checklist.checkall', this.isCheckAll);
            }
        }
    }
</script>
