import Vue from 'vue';

const NotifyConstructor = Vue.extend(require('./notify.vue'));

const instance = new NotifyConstructor({
    el: document.createElement('div')
});

let timer = null;
let lock = false;

NotifyConstructor.prototype.closeNotify = function () {
    instance.classes = 'yd-notify-out';

    setTimeout(() => {
        const el = instance.$el;
        el.parentNode && el.parentNode.removeChild(el);
        lock = false;
    }, 150);

    typeof this.callback === 'function' && this.callback();
};

const Notify = (options = {}) => {
    instance.classes = '';
    instance.mes = options.mes;
    instance.timeout = ~~options.timeout || 5000;
    instance.callback = options.callback;

    if (lock)return;
    lock = true;

    document.body.appendChild(instance.$el);

    instance.$el.addEventListener('click', () => {
        clearTimeout(timer);
        instance.closeNotify();
    });

    timer = setTimeout(() => {
        clearTimeout(timer);
        instance.closeNotify();
    }, instance.timeout);
};

export default Notify;
