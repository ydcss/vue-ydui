<template>
    <div class="yd-checklist" :style="{color: color}" :class="align == 'right' ? 'yd-checklist-alignright' : ''">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'yd-checklist',
        data() {
            return {
                isCheckAll: false
            }
        },
        props: {
            value: {
                type: Array
            },
            color: {
                validator(value) {
                    return isColor(value);
                },
                default: '#4CD864'
            },
            align: {
                type: String,
                validator(value) {
                    return ['left', 'right'].indexOf(value) > -1;
                },
                default: 'left'
            },
            label: {
                type: Boolean,
                default: true
            },
            callback: {
                type: Function
            }
        },
        methods: {
            checkItem() {
                const childrens = this.$children.filter(item => item.$options.name === 'yd-checklist-item');
                childrens.forEach(item => {
                    item.checked = this.contains(this.value, item.val);
                    item.label = this.label;
                });
            },
            contains(arr, obj) {
                let i = arr.length;
                while (i--) {
                    if (arr[i] == obj) return true;
                }
                return false;
            },
            emitInput(setValue, check) {
                const arr = [];
                const childrens = this.$children.filter(item => item.$options.name === 'yd-checklist-item');
                childrens.forEach(item => {
                    if (setValue) item.checked = check;
                    item.checked && arr.push(item.val);
                });
                this.isCheckAll = arr.length >= childrens.length;
                this.$emit('input', arr);
            },
            checkAll(check) {
                this.emitInput(true, check);
            }
        },
        watch: {
            value(val) {
                this.callback && this.callback(val, this.isCheckAll);
                this.$nextTick(this.checkItem);
            }
        },
        mounted() {
            this.$on('ydui.checklist.checkall', this.checkAll);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/checklist.less";
</style>
