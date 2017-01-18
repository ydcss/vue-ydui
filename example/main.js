import Vue from 'vue';
import VueRouter from 'vue-router';
import Resource from 'vue-resource';

import YDUI from '../src/index';
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

import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Resource);
Vue.use(YDUI);

document.addEventListener('DOMContentLoaded', function() {
    typeof FastClick == 'function' && FastClick.attach(document.body);
}, false);

const router = new VueRouter({
    routes: [
        {path: '/', component: Index},
        {path: '/button', component: Button},
        {path: '/dialog', component: Dialog},
        {path: '/cell', component: Cell},
        {path: '/grids', component: Grids},
        {path: '/icons', component: Icons},
        {path: '/list', component: List},
        {path: '/list.theme/:id', component: ListTheme},
        {path: '/list.infinitescroll', component: ListInfinitescroll},
        {path: '/list.pullrefresh', component: ListPullRefresh},
        {path: '/badge', component: Badge},
        {path: '/asidebar', component: AsideBar},
        {path: '/tabbar', component: TabBar},
        {path: '/navbar', component: NavBar},
        {path: '/tabs', component: Tabs},
        {path: '/tab', component: Tab},
        {path: '/scrolltab', component: ScrollTab},
        {path: '/actionsheet', component: ActionSheet},
        {path: '/sendcode', component: SendCode},
        {path: '/progressbar', component: ProgressBar},
        {path: '/keyboard', component: KeyBoard},
        {path: '/slider', component: Slider},
        {path: '/spinner', component: Spinner},
        {path: '/cityselect', component: CitySelect}
    ]
});

const app = new Vue({
    router: router,
    render: v => v(App)
}).$mount('#app');
