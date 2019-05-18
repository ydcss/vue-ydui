import ImagePreviewBox from './src/box.vue';
import ImagePreviewImg from './src/preview-img.vue';

const install = function(Vue) {
    const boxComponent = Vue.extend(ImagePreviewBox);
    const imgComponent = Vue.extend(ImagePreviewImg);

    // 添加vue扩展，方法名imagePreview
    Vue.prototype.$imagePreview = ({index = 0, images}) => {
        let imageItems = images.map(img => {
            return new imgComponent({
                el: document.createElement('div'),
                data: {
                    src: img
                }
            });
        });
        const instance = new boxComponent({
            el: document.createElement('div'),
            data: {
                index: index,
                currentIndex: index,
                imgItems:imageItems,
                txtHTML: /*mes[0] && mes[0].$el ? mes[0].$el.innerHTML :*/ '',
                closeText: '关闭'
            }
        });

        document.body.appendChild(instance.$el);
      }
}

export default {install};
