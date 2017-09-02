<template>
    <div class="yd-flexbox-item" :class="classes">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-flexbox-item',
        props: {
            align: {
                validator(val) {
                    return ['top', 'center', 'bottom'].indexOf(val) > -1;
                },
                default: 'center'
            }
        },
        computed: {
            classes() {
                if (this.align === 'top') {
                    return 'yd-flexbox-item-start';
                } else if (this.align === 'bottom') {
                    return 'yd-flexbox-item-end';
                } else {
                    return 'yd-flexbox-item-center';
                }
            }
        }
    }
</script>
