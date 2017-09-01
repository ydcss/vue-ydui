import Vue from 'vue';
import VueRouter from 'vue-router';
import Resource from 'vue-resource';

import YDUI from '../src/ydui.js';

import Index from './routers/index.vue';
import Button from './routers/button.vue';
import Dialog from './routers/dialog.vue';
import Cell from './routers/cell.vue';
import Grids from './routers/grids.vue';
import Icons from './routers/icons.vue';
import List from './routers/list.vue';
import ListTheme from './routers/list.theme.vue';
import ListInfinitescroll from './routers/list.infinitescroll.vue';
import ListPullRefresh from './routers/list.pullrefresh.vue';
import Badge from './routers/badge.vue';
import AsideBar from './routers/asidebar.vue';
import TabBar from './routers/tabbar.vue';
import NavBar from './routers/navbar.vue';
import Tabs from './routers/tabs.vue';
import Tab from './routers/tab.vue';
import ScrollTab from './routers/scrolltab.vue';
import ActionSheet from './routers/actionsheet.vue';
import SendCode from './routers/sendcode.vue';
import ProgressBar from './routers/progressbar.vue';
import KeyBoard from './routers/keyboard.vue';
import Slider from './routers/slider.vue';
import Spinner from './routers/spinner.vue';
import CitySelect from './routers/cityselect.vue';
import CountDown from './routers/countdown.vue';
import Rate from './routers/rate.vue';
import Popup from './routers/popup.vue';
import CountUp from './routers/countup.vue';
import RollNotice from './routers/rollnotice.vue';
import Input from './routers/input.vue';
import FlexBox from './routers/flexbox.vue';
import CR from './routers/cr.vue';
import Switch from './routers/switch.vue';
import Radio from './routers/radio.vue';
import CheckBox from './routers/checkbox.vue';
import BackTop from './routers/backtop.vue';
import Accordion from './routers/accordion.vue';
import DateTime from './routers/datetime.vue';
import LightBox from './routers/lightbox.vue';
import TimeLine from './routers/timeline.vue';
import Step from './routers/step.vue';
import CheckList from './routers/checklist.vue';

import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Resource);
Vue.use(YDUI);

document.addEventListener('DOMContentLoaded', function () {
    typeof FastClick === 'function' && FastClick.attach(document.body);
}, false);

const router = new VueRouter({
    routes: [
        {path: '/', name: 'index', component: Index},
        {path: '/button', name: 'button', component: Button},
        {path: '/dialog', name: 'dialog', component: Dialog},
        {path: '/cell', name: 'cell', component: Cell},
        {path: '/grids', name: 'grids', component: Grids},
        {path: '/icons', name: 'icons', component: Icons},
        {path: '/list', name: 'list', component: List},
        {path: '/list.theme/:id', name: 'list.theme/:id', component: ListTheme},
        {path: '/list.infinitescroll', name: 'list.infinitescroll', component: ListInfinitescroll},
        {path: '/list.pullrefresh', name: 'list.pullrefresh', component: ListPullRefresh},
        {path: '/badge', name: 'badge', component: Badge},
        {path: '/asidebar', name: 'asidebar', component: AsideBar},
        {path: '/tabbar', name: 'tabbar', component: TabBar},
        {path: '/navbar', name: 'navbar', component: NavBar},
        {path: '/tabs', name: 'tabs', component: Tabs},
        {path: '/tab', name: 'tab', component: Tab},
        {path: '/scrolltab', name: 'scrolltab', component: ScrollTab},
        {path: '/actionsheet', name: 'actionsheet', component: ActionSheet},
        {path: '/sendcode', name: 'sendcode', component: SendCode},
        {path: '/progressbar', name: 'progressbar', component: ProgressBar},
        {path: '/keyboard', name: 'keyboard', component: KeyBoard},
        {path: '/slider', name: 'slider', component: Slider},
        {path: '/spinner', name: 'spinner', component: Spinner},
        {path: '/cityselect', name: 'cityselect', component: CitySelect},
        {path: '/countdown', name: 'countdown', component: CountDown},
        {path: '/rate', name: 'rate', component: Rate},
        {path: '/popup', name: 'popup', component: Popup},
        {path: '/countup', name: 'countup', component: CountUp},
        {path: '/rollnotice', name: 'rollnotice', component: RollNotice},
        {path: '/input', name: 'input', component: Input},
        {path: '/flexbox', name: 'flexbox', component: FlexBox},
        {path: '/cr', name: 'C&R', component: CR},
        {path: '/switch', name: 'switch', component: Switch},
        {path: '/radio', name: 'radio', component: Radio},
        {path: '/checkbox', name: 'checkbox', component: CheckBox},
        {path: '/backtop', name: 'backtop', component: BackTop},
		{path: '/accordion', name: 'accordion', component: Accordion},
        {path: '/datetime', name: 'datetime', component: DateTime},
        {path: '/lightbox', name: 'lightbox', component: LightBox},
        {path: '/timeline', name: 'timeline', component: TimeLine},
        {path: '/step', name: 'step', component: Step},
        {path: '/checklist', name: 'checklist', component: CheckList},
    ]
});

const app = new Vue({
    router: router,
    render: v => v(App)
}).$mount('#app');

let scrollTop = 0;

router.beforeEach((route, redirect, next) => {
    if (redirect.path === '/') {
        scrollTop = document.getElementById('scrollView').scrollTop;
    }
    document.title = 'YDUI Touch - ' + route.name;
    next();
});

router.afterEach(route => {
    if (route.path === '/') {
        Vue.nextTick(() => {
            document.getElementById('scrollView').scrollTop = scrollTop;
        });
    } else {
        document.getElementById('scrollView').scrollTop = 0;
    }
});
