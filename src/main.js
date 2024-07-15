import Vue from 'vue'
import App from './App.vue'

import router from './router'
// import "./router/permission";

import store from './store'

import './assets/icons'  // icons
import "./assets/styles/global.scss" // global styles

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ElSelectTree from "el-select-tree";


// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 水平滚动组件
import HorizonScroll from "@/components/HorizonScroll"

Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('HorizonScroll', HorizonScroll)


Vue.use(ElementUI);
Vue.use(ElSelectTree);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
