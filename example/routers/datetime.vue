<template>
    <yd-layout title="DateTime">

        <yd-cell-group title="常规" class="demo-small-pitch">
            <yd-cell-item arrow>
                <span slot="left">Time：</span>
                <yd-datetime type="date" :value="datetime1" :init-emit="false" @input="submitAs" slot="right"></yd-datetime>
            </yd-cell-item>
        </yd-cell-group>

    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                datetime1: ''
            }
        },
        methods: {
            submitAs(val) {
                console.log(val);
                this.$emit('submit-as', val);
            }
        }
    }
</script>
