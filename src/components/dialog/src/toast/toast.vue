<template>
    <div class="mask-white-dialog">
        <div class="m-toast" :class="iconsClass == '' ? 'toast-none-icon' : ''">
            <div v-if="iconsClass" :class="iconsClass"></div>
            <p class="toast-content" v-html="mes"></p>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            mes: String,
            icon: String,
            timeout: Number,
            callback: Function
        },
        computed: {
            iconsClass() {
                let _icon = '';
                if (this.icon == 'success' || this.icon == 'error') {
                    _icon = 'toast-' + this.icon + '-icon';
                }
                return _icon;
            }
        }
    }
</script>
