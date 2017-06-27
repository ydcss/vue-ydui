<template>
    <yd-layout title="Popup">

        <yd-button-group>
            <yd-button size="large" type="primary" @click.native="show1 = true">中间弹出</yd-button>
            <yd-button size="large" type="warning" @click.native="show2 = true">下部弹出</yd-button>
            <yd-button size="large" type="danger" @click.native="show3 = true">左侧弹出</yd-button>
            <yd-button size="large" type="danger" @click.native="show4 = true">右侧弹出</yd-button>
        </yd-button-group>

        <yd-popup v-model="show1" position="center" width="90%">
            <p>
                我为什么喜欢在京东买东西，因为今天买明天就可以送到。我为什么每个商品的评价都一样，因为在京东买的东西太多太多了，
                导致积累了很多未评价的订单，所以我统一用段话作为评价内容。京东购物这么久，有买到很好的产品，也有买到比较坑的产品，
                如果我用这段话来评价，说明这款产品没问题，至少85分以上，而比较垃圾的产品，我绝对不会偷懒到复制粘贴评价，我绝对会用心的差评，
                这样其他消费者在购买的时候会作为参考，会影响该商品销量，而商家也会因此改进商品质牌质量非常好，与卖家描述的完全一致，
                非常满意，真的很喜欢。
            </p>
            <p style="color:#F00;margin-top: 10px;">
                呐~你也看到了，这只是一个普通弹窗，未设置内外边距。
            </p>
            <p style="text-align: center;">
                <yd-button @click.native="show1 = false">Close Center Popup</yd-button>
            </p>
        </yd-popup>

        <yd-popup v-model="show2" position="bottom" height="60%">
            <div slot="top" style="height: 30px;line-height: 30px;background-color:#E8E8E8;">top</div>
            <div>
                <p v-for="n in 30" style="height: 30px;line-height: 30px;">该容器超出内容出现滚动条，IOS上禁止滚动底层容器{{n}}</p>
            </div>
            <div slot="bottom" style="height: 30px;line-height: 30px;background-color:#E8E8E8;">bottom</div>
        </yd-popup>

        <yd-popup v-model="show3" position="left" width="60%">
            <yd-button type="danger" style="margin: 20px;" @click.native="show3 = false">Close Left Popup</yd-button>
        </yd-popup>

        <yd-popup v-model="show4" position="right">
            <yd-button type="danger" style="margin: 20px;" @click.native="show4 = false">Close Right Popup</yd-button>
        </yd-popup>

    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                show1: false,
                show2: false,
                show3: false,
                show4: false
            }
        }
    }
</script>
