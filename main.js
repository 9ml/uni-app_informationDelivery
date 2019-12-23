import Vue from 'vue'
import App from './App'
import Api from '@/common/requests.js'
import _tools from '@/common/methods.js'

Vue.prototype._Api = new Api.request
Vue.prototype._tools = new _tools.myTools
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
