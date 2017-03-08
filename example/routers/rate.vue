<template>
    <yd-layout title="Rate">
        <div style="padding: 20px;">
            <yd-rate v-model="rate1"></yd-rate>
        </div>
        <div style="padding: 20px;">
            <yd-rate v-model="rate2" :showText="['很差','勉强','一般','挺好','非常好']"></yd-rate>
        </div>
        <div style="padding: 20px;">
            <yd-rate v-model="rate3" :showText="['1','2','3','4','5']" :disabled="true"></yd-rate>
        </div>
        <div style="padding: 20px;">
            <yd-rate v-model="rate4" :showText="text"></yd-rate>
        </div>
    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                rate1: 3,
                rate2: 4,
                rate3: 2,
                rate4: 0,
                text: ['$分，很差', '<strong>$</strong>分，勉强', '$分，一般', '$分，挺好', '$分，非常好']
            }
        }
    }
</script>
