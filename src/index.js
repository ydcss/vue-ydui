import './styles/index.less';

import Dialog from './components/dialog';
import Layout from './components/layout';
import Button from './components/button';
import Navbar from './components/navbar';
import Cell from './components/cell';
import Switch from './components/switch';
import Grids from './components/grids';
import Icons from './components/icons';
import List from './components/list';
import InfiniteScroll from './components/infinitescroll';
import PullRefresh from './components/pullrefresh';
import Badge from './components/badge';
import TabBar from './components/tabbar';
import Tab from './components/tab';
import ScrollTab from './components/scrolltab';
import ActionSheet from './components/actionsheet';
import SendCode from './components/sendcode';
import KeyBoard from './components/keyboard';
import Slider from './components/slider';
import Spinner from './components/spinner';
import CitySelect from './components/cityselect';
import ProgressBar from './components/progressbar';

window.document.addEventListener('touchstart', function (event) {
    /* Do Nothing */
}, false);

const install = function (Vue) {
    Vue.component(Layout.name, Layout);
    Vue.component(Button.name, Button);
    Vue.component(Button.ButtonGroup.name, Button.ButtonGroup);
    Vue.component(Navbar.name, Navbar);
    Vue.component(Navbar.BackIcon.name, Navbar.BackIcon);
    Vue.component(Navbar.NextIcon.name, Navbar.NextIcon);
    Vue.component(Cell.CellGroup.name, Cell.CellGroup);
    Vue.component(Cell.CellItem.name, Cell.CellItem);
    Vue.component(Switch.name, Switch);
    Vue.component(Grids.GridsGroup.name, Grids.GridsGroup);
    Vue.component(Grids.GridsItem.name, Grids.GridsItem);
    Vue.component(Icons.name, Icons);
    Vue.component(List.ListTheme.name, List.ListTheme);
    Vue.component(List.ListItem.name, List.ListItem);
    Vue.component(List.ListOther.name, List.ListOther);
    Vue.component(InfiniteScroll.name, InfiniteScroll);
    Vue.component(PullRefresh.name, PullRefresh);
    Vue.component(Badge.name, Badge);
    Vue.component(Badge.BadgeRadius.name, Badge.BadgeRadius);
    Vue.component(TabBar.name, TabBar);
    Vue.component(TabBar.TabBarItem.name, TabBar.TabBarItem);
    Vue.component(Tab.name, Tab);
    Vue.component(Tab.TabPanel.name, Tab.TabPanel);
    Vue.component(ScrollTab.name, ScrollTab);
    Vue.component(ScrollTab.ScrollTabPanel.name, ScrollTab.ScrollTabPanel);
    Vue.component(ActionSheet.name, ActionSheet);
    Vue.component(SendCode.name, SendCode);
    Vue.component(KeyBoard.name, KeyBoard);
    Vue.component(Slider.name, Slider);
    Vue.component(Slider.SliderItem.name, Slider.SliderItem);
    Vue.component(Spinner.name, Spinner);
    Vue.component(CitySelect.name, CitySelect);
    Vue.component(ProgressBar.name, ProgressBar);

    Vue.prototype.$yduiBus = new Vue();
    Vue.prototype.$dialog = Dialog;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    version: '0.0.1',
    Dialog,
    Layout,
    Button,
    Navbar,
    Cell,
    Switch,
    Grids,
    Icons,
    List,
    InfiniteScroll,
    PullRefresh,
    Badge,
    TabBar,
    Tab,
    ScrollTab,
    ActionSheet,
    SendCode,
    KeyBoard,
    Slider,
    Spinner,
    CitySelect,
    ProgressBar
};
