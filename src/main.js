import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {firebase_auth} from './api/firebase'

Vue.config.productionTip = false

Vue.use(ElementUI)

let app;

firebase_auth.onAuthStateChanged(user =>{
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      store,
      render : h => h(App)
    })
  }
});


