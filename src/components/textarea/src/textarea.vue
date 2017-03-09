<template>
    <div class="m-textarea">
        <textarea v-model="fuck"
                  :placeholder="placeholder"
                  :maxlength="maxlength"
                  :readonly="readonly"
        ></textarea>
        <div class="textarea-counter" v-if="showCounter">{{num}}/{{maxlength}}</div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-textarea',
        data() {
            return {
                num: 0,
                fuck: ''
            }
        },
        props: {
            maxlength: {
                type: [Number, String],
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                }
            },
            placeholder: {
                type: String
            },
            readonly: {
                type: Boolean,
                default: false
            },
            value: {
                type: String
            },
            showCounter: {
                type: Boolean,
                default: true
            },
            change: {
                type: Function
            }
        },
        watch: {
            fuck(val) {
                this.$emit('input', val);
                typeof this.change == 'function' && this.change();
                if (this.showCounter) this.num = val.length;
            }
        },
        mounted() {
            this.$nextTick(() => {
                const v = this.value;
                if (!v)return;
                this.fuck = v.length > this.maxlength ? v.substr(v, this.maxlength) : v;
            });
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/textarea.less';
</style>
