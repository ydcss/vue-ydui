<template>
    <yd-layout>
        <h1 class="demo-logo"><img src="http://static.ydcss.com/ydui/img/logo.png"></h1>
        <h2 class="demo-detail-title">一只基于Vue2.x的移动端&微信UI。 -YDUI Touch</h2>

        <yd-grids-group rows="4">
            <yd-grids-item v-for="item in list" :link="item.link">
                <i slot="icon" :class="item.icon"></i>
                <span slot="text">{{item.name}}</span>
            </yd-grids-item>
        </yd-grids-group>
    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                list: [
                    {icon: 'demo-icons-button', name: 'Button', link: '/button'},
                    {icon: 'demo-icons-dialog', name: 'Dialog', link: '/dialog'},
                    {icon: 'demo-icons-cell', name: 'Cell', link: '/cell'},
                    {icon: 'demo-icons-icons', name: 'Icons', link: '/icons'},
                    {icon: 'demo-icons-grids', name: 'Grids', link: '/grids'},
                    {icon: 'demo-icons-list', name: 'List', link: '/list'},
                    {icon: 'demo-icons-badge', name: 'Badge', link: '/badge'},
                    {icon: 'demo-icons-tabbar', name: 'AsideBar', link: '/asidebar'},
                    {icon: 'demo-icons-tabs', name: 'Tabs', link: '/tabs'},
                    {icon: 'demo-icons-actionsheet', name: 'ActionSheet', link: '/actionsheet'},
                    {icon: 'demo-icons-sendcode', name: 'SendCode', link: '/sendcode'},
                    {icon: 'demo-icons-progressbar', name: 'ProgressBar', link: '/progressbar'},
                    {icon: 'demo-icons-keyboard', name: 'KeyBoard', link: '/keyboard'},
                    {icon: 'demo-icons-slider', name: 'Slider', link: '/slider'},
                    {icon: 'demo-icons-spinner', name: 'Spinner', link: '/spinner'},
                    {icon: 'demo-icons-cityselect', name: 'CitySelect', link: '/cityselect'},
                    {icon: 'demo-icons-countup', name: 'CountUp', link: '/countup'},
                    {icon: 'demo-icons-rate', name: 'Rate', link: '/rate'},
                    {icon: 'demo-icons-countdown', name: 'CountDown', link: '/countdown'},
                    {icon: 'demo-icons-popup', name: 'Popup', link: '/popup'},
                    {icon: 'demo-icons-rollnotice', name: 'RollNotice', link: '/rollnotice'},
                    {icon: 'demo-icons-input', name: 'Input', link: '/input'},
                    {icon: 'demo-icons-flexbox', name: 'FlexBox', link: '/flexbox'},
                    {icon: 'demo-icons-cr', name: 'C&R', link: '/cr'},
                    {icon: 'demo-icons-backtop', name: 'BackTop', link: '/backtop'},
                    {icon: 'demo-icons-accordion', name: 'Accordion', link: '/accordion'},
                    {icon: 'demo-icons-datetime', name: 'DateTime', link: '/datetime'},
                    {icon: 'demo-icons-lightbox', name: 'LightBox', link: '/lightbox'},
                    {icon: 'demo-icons-timeline', name: 'TimeLine', link: '/timeline'},
                    {icon: 'demo-icons-step', name: 'Step', link: '/step'},
                    {icon: 'demo-icons-checklist', name: 'CheckList', link: '/checklist'},
                ]
            }
        }
    }
</script>
