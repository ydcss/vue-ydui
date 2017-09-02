import Vue from 'vue';
import {pageScroll} from '../../../../utils/assist';

const ConfirmConstructor = Vue.extend(require('./confirm.vue'));

const instance = new ConfirmConstructor({
    el: document.createElement('div')
});

ConfirmConstructor.prototype.closeConfirm = function (stay, callback) {
    typeof callback === 'function' && callback();

    if (stay)return;

    pageScroll.unlock();

    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);
};

const Confirm = (options = {}) => {
    instance.mes = options.mes || '';
    instance.title = options.title || '提示';
    instance.opts = options.opts;

    document.body.appendChild(instance.$el);

    pageScroll.lock();
};

export default Confirm;
