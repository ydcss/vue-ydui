<template>
    <div class="flexbox-item" :class="classes">
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
                    return 'flexbox-item-start';
                } else if (this.align === 'bottom') {
                    return 'flexbox-item-end';
                } else {
                    return 'flexbox-item-center';
                }
            }
        }
    }
</script>
