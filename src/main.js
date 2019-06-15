import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './utils/router'
import store from './store'
import ApiService from './services/api.service'
import {TokenService} from './services/storage.service'
import 'material-design-icons-iconfont'
import UserService from "./services/user.service";

Vue.config.productionTip = false

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_ROOT_API)

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}
UserService.checkAuth()
// NOTE: We haven't covered this yet in our ApiService
//       but don't worry about this just yet - I'll come back to it later
ApiService.mount401Interceptor();

new Vue({
  router,
  store,
  theme:{
    primary:'#FF9800',
    secondary:'#FFF3E0'
  },
  render: h => h(App)
}).$mount('#app')
