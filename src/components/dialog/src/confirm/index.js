import Vue from 'vue';
import {pageScroll} from '../../../../utils/assist';

const ConfirmConstructor = Vue.extend(require('./confirm.vue'));

const instance = new ConfirmConstructor({
    el: document.createElement('div')
});

const hashChange = function () {
    pageScroll.unlock();

    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);
};

ConfirmConstructor.prototype.closeConfirm = function (stay, callback) {
    let stopClose = true;

    if(typeof callback === 'function') {
        stopClose = callback();
        if(stopClose === undefined) stopClose = true;
    }

    if(!stopClose || stay) return;

    pageScroll.unlock();

    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);

    window.removeEventListener("hashchange", hashChange);
};

const Confirm = (options = {}) => {
    instance.mes = options.mes || '';
    instance.title = options.title || '提示';
    instance.opts = options.opts;

    window.addEventListener("hashchange", hashChange);

    document.body.appendChild(instance.$el);

    pageScroll.lock();
};

export default Confirm;
