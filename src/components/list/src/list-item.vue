<template>
    <router-link :to="href" class="list-item" v-if="type == 'link'">
        <div class="list-img">
            <slot name="img"></slot>
        </div>
        <div class="list-mes">
            <div class="list-title">
                <slot name="title"></slot>
            </div>
            <slot name="other"></slot>
        </div>
    </router-link>
    <a :href="href || 'javascript:;'" class="list-item" v-else>
        <div class="list-img">
            <slot name="img"></slot>
        </div>
        <div class="list-mes">
            <div class="list-title">
                <slot name="title"></slot>
            </div>
            <slot name="other"></slot>
        </div>
    </a>
</template>

<script type="text/babel">
    export default {
        name: 'yd-list-item',
        props: {
            type: {
                type: String,
                validator (value) {
                    return ['link', 'a'].indexOf(value) > -1;
                },
                default: 'a'
            },
            href: [String, Object]
        }
    }
</script>
