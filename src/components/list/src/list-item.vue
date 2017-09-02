<template>
    <router-link :to="href" class="yd-list-item" v-if="type == 'link'">
        <div class="yd-list-img">
            <slot name="img"></slot>
        </div>
        <div class="yd-list-mes">
            <div class="yd-list-title">
                <slot name="title"></slot>
            </div>
            <slot name="other"></slot>
        </div>
    </router-link>
    <a :href="href || 'javascript:;'" class="yd-list-item" v-else-if="type == 'a'">
        <div class="yd-list-img">
            <slot name="img"></slot>
        </div>
        <div class="yd-list-mes">
            <div class="yd-list-title">
                <slot name="title"></slot>
            </div>
            <slot name="other"></slot>
        </div>
    </a>
    <div class="yd-list-item" v-else>
        <div class="yd-list-img">
            <slot name="img"></slot>
        </div>
        <div class="yd-list-mes">
            <div class="yd-list-title">
                <slot name="title"></slot>
            </div>
            <slot name="other"></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-list-item',
        props: {
            type: {
                type: String,
                validator (value) {
                    return ['link', 'a', 'div'].indexOf(value) > -1;
                },
                default: 'a'
            },
            href: [String, Object]
        }
    }
</script>
