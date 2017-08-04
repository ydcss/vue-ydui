<template>
    <yd-layout>
        <h1 class="demo-logo"><img src="http://static.ydcss.com/ydui/img/logo.png"></h1>
        <h2 class="demo-detail-title">一只基于Vue2.x的移动端&微信UI。 -YDUI Touch</h2>

        <yd-grids-group rows="4">
            <yd-grids-item v-for="item in list" :link="item.link">
                <i slot="icon" :class="item.icon"></i>
                <span slot="text">{{item.name}}</span>
                <div class="demo-meizu-box" v-if="item.name == 'LightBox'" slot="else">
                    <div class="demo-meizu">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" viewBox="0 0 477 97" enable-background="new 0 0 477 97" xml:space="preserve">
                            <g>
                                <rect x="246.149" y="4.197" fill="#FFFFFF" width="17.462" height="85.039"/>
                                <path fill="#FFFFFF" d="M109.865,4.197H17.212c-7.828,0-14.173,6.345-14.173,14.173v70.866h16.655V23.713
                                    c0-3.13,2.539-5.669,5.67-5.669H55.21v71.192h16.656V18.044h29.846c3.131,0,5.67,2.539,5.67,5.669v65.523h16.656V18.37
                                    C124.038,10.542,117.693,4.197,109.865,4.197z"/>
                                <path fill="#FFFFFF" d="M141.753,18.37v56.693c0,7.827,6.345,14.173,14.173,14.173h72.263V75.389h-64.11
                                    c-3.132,0-5.67-2.538-5.67-5.67V53.647h66.292V39.786h-66.292V23.713c0-3.13,2.538-5.669,5.67-5.669h64.11V4.198l-72.263-0.001
                                    C148.098,4.197,141.753,10.542,141.753,18.37z"/>
                                <path fill="#FFFFFF" d="M356.638,4.198h-74.579v13.846h61.724l-59.201,52.585c-9.497,8.12-3.318,18.608,4.567,18.608h75.426V75.39
                                    H301.64l59.295-52.585C370.501,14.199,364.746,4.198,356.638,4.198z"/>
                                <path fill="#FFFFFF" d="M456.037,4.197v65.522c0,3.131-2.538,5.669-5.669,5.669v0.001h-47.579v-0.001
                                    c-3.132,0-5.67-2.538-5.67-5.669V4.197h-16.608v70.866c0,7.827,6.346,14.173,14.173,14.173h63.837
                                    c7.827,0,14.173-6.346,14.173-14.173V4.197H456.037z"/>
                            </g>
                        </svg>
                    </div>
                </div>
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
                ]
            }
        },
        mounted() {
            if (window.sessionStorage.getItem('meizu') !== 'pro7') {
                this.$dialog.confirm({
                    title: 'RPO7',
                    mes: '双瞳如小窗 佳景观历历',
                    opts: [
                        {txt: '关闭', color: false},
                        {
                            txt: '查看',
                            color: true,
                            callback: () => {
                                location.href = '#/lightbox';
                            }
                        }
                    ]
                });
                window.sessionStorage.setItem('meizu', 'pro7');
            }
        }
    }
</script>
