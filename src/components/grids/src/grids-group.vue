<template>
    <div>
        <div class="yd-gridstitle" v-if="title">{{title}}</div>
        <div :class="classes">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default{
        name: 'yd-grids-group',
        data() {
            return {
                height: 55
            }
        },
        props: {
            rows: {
                validator(value) {
                    return ['2', '3', '4', '5'].indexOf(value + '') > -1;
                },
                default: '4'
            },
            title: String,
            itemHeight: {
                validator(value) {
                    if(value == 0) {
                        return true;
                    }
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: 0
            }
        },
        computed: {
            classes() {
                return 'yd-grids-' + this.rows;
            }
        }
    }
</script>
