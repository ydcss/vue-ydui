<template>
    <div>
        <div class="m-gridstitle" v-if="title">{{title}}</div>
        <div :class="classes">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default{
        name: 'yd-grids-group',
        props: {
            rows: {
                type: [Number, String],
                validator(value) {
                    return ['2', '3', '4', '5'].indexOf(value + '') > -1;
                },
                default: '4'
            },
            title: String
        },
        computed: {
            classes() {
                return 'm-grids-' + this.rows;
            }
        }
    }
</script>
