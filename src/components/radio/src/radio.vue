<template>
    <label class="yd-radio">
        <input type="radio" @change="changeHandler" :disabled="disabled" :checked="checked"/>
        <span class="yd-radio-icon" :style="[{color: $parent.color}, styles(1)]"><i :style="styles(2)"></i></span>
        <span class="yd-radio-text" v-if="!$slots.default">{{val}}</span>
        <span class="yd-radio-text" v-else><slot></slot></span>
    </label>
</template>

<script type="text/babel">
    export default {
        name: 'yd-radio',
        data() {
            return {
                checked: false
            }
        },
        props: {
            val: [String, Number],
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            changeHandler (event) {
                if (this.disabled) return;

                this.checked = event.target.checked;

                this.$parent.change(this.val);
            },
            styles(size) {
                return {
                    width: this.$parent.size / size + 'px',
                    height: this.$parent.size / size + 'px'
                };
            }
        }
    }
</script>
