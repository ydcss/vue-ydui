import './styles/base.less';

import {Confirm, Alert, Toast, Notify, Loading} from './components/dialog';
import {Layout} from './components/layout';
import {Button, ButtonGroup} from './components/button';
import {NavBar, NavBarBackIcon, NavBarNextIcon} from './components/navbar';
import {CellItem, CellGroup} from './components/cell';
import {Switch} from './components/switch';
import {GridsItem, GridsGroup} from './components/grids';
import {Icons} from './components/icons';
import {ListTheme, ListItem, ListOther} from './components/list';
import {InfiniteScroll} from './components/infinitescroll';
import {PullRefresh} from './components/pullrefresh';
import {Badge, BadgeRadius} from './components/badge';
import {TabBar, TabBarItem} from './components/tabbar';
import {Tab, TabPanel} from './components/tab';
import {ScrollTab, ScrollTabPanel} from './components/scrolltab';
import {ActionSheet} from './components/actionsheet';
import {SendCode} from './components/sendcode';
import {KeyBoard} from './components/keyboard';
import {Slider, SliderItem} from './components/slider';
import {Spinner} from './components/spinner';
import {CitySelect} from './components/cityselect';
import {ProgressBar} from './components/progressbar';
import {CountDown} from './components/countdown';
import {Rate} from './components/rate';
import {TextArea} from './components/textarea';
import {Popup} from './components/popup';
import {CountUp} from './components/countup';
import {RollNotice, RollNoticeItem} from './components/rollnotice';
import {Input} from './components/input';
import {FlexBox, FlexBoxItem} from './components/flexbox';
import {Radio, RadioGroup} from './components/radio';
import {CheckBox, CheckBoxGroup} from './components/checkbox';
import {BackTop} from './components/backtop';
import {Accordion, AccordionItem} from './components/accordion';
import {DateTime} from './components/datetime';
import {LightBox, LightBoxImg, LightBoxTxt} from './components/lightbox';
import {TimeLine, TimeLineItem} from './components/timeline';
import {Step, StepItem} from './components/step';
import {CheckList, CheckListItem} from './components/checklist';

window.document.addEventListener('touchstart', function (event) {
    /* Do Nothing */
}, false);

const install = function (Vue) {
    Vue.component(Layout.name, Layout);
    Vue.component(Button.name, Button);
    Vue.component(ButtonGroup.name, ButtonGroup);
    Vue.component(NavBar.name, NavBar);
    Vue.component(NavBarBackIcon.name, NavBarBackIcon);
    Vue.component(NavBarNextIcon.name, NavBarNextIcon);
    Vue.component(CellGroup.name, CellGroup);
    Vue.component(CellItem.name, CellItem);
    Vue.component(Switch.name, Switch);
    Vue.component(GridsItem.name, GridsItem);
    Vue.component(GridsGroup.name, GridsGroup);
    Vue.component(Icons.name, Icons);
    Vue.component(ListTheme.name, ListTheme);
    Vue.component(ListItem.name, ListItem);
    Vue.component(ListOther.name, ListOther);
    Vue.component(InfiniteScroll.name, InfiniteScroll);
    Vue.component(PullRefresh.name, PullRefresh);
    Vue.component(Badge.name, Badge);
    Vue.component(TabBar.name, TabBar);
    Vue.component(TabBarItem.name, TabBarItem);
    Vue.component(Tab.name, Tab);
    Vue.component(TabPanel.name, TabPanel);
    Vue.component(ScrollTab.name, ScrollTab);
    Vue.component(ScrollTabPanel.name, ScrollTabPanel);
    Vue.component(ActionSheet.name, ActionSheet);
    Vue.component(SendCode.name, SendCode);
    Vue.component(KeyBoard.name, KeyBoard);
    Vue.component(Slider.name, Slider);
    Vue.component(SliderItem.name, SliderItem);
    Vue.component(Spinner.name, Spinner);
    Vue.component(CitySelect.name, CitySelect);
    Vue.component(ProgressBar.name, ProgressBar);
    Vue.component(CountDown.name, CountDown);
    Vue.component(Rate.name, Rate);
    Vue.component(TextArea.name, TextArea);
    Vue.component(Popup.name, Popup);
    Vue.component(CountUp.name, CountUp);
    Vue.component(RollNotice.name, RollNotice);
    Vue.component(RollNoticeItem.name, RollNoticeItem);
    Vue.component(Input.name, Input);
    Vue.component(FlexBox.name, FlexBox);
    Vue.component(FlexBoxItem.name, FlexBoxItem);
    Vue.component(Radio.name, Radio);
    Vue.component(RadioGroup.name, RadioGroup);
    Vue.component(CheckBox.name, CheckBox);
    Vue.component(CheckBoxGroup.name, CheckBoxGroup);
    Vue.component(BackTop.name, BackTop);
	Vue.component(Accordion.name, Accordion);
    Vue.component(AccordionItem.name, AccordionItem);
    Vue.component(DateTime.name, DateTime);
    Vue.component(LightBox.name, LightBox);
    Vue.component(LightBoxImg.name, LightBoxImg);
    Vue.component(LightBoxTxt.name, LightBoxTxt);
    Vue.component(TimeLine.name, TimeLine);
    Vue.component(TimeLineItem.name, TimeLineItem);
    Vue.component(Step.name, Step);
    Vue.component(StepItem.name, StepItem);
    Vue.component(CheckList.name, CheckList);
    Vue.component(CheckListItem.name, CheckListItem);

    Vue.prototype.$dialog = {
        confirm: Confirm,
        alert: Alert,
        toast: Toast,
        notify: Notify,
        loading: Loading,
    };
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
};
