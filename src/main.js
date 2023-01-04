import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase/app";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "",
  authDomain: "suspension-application.firebaseapp.com",
  databaseURL: "https://suspension-application-default-rtdb.firebaseio.com",
  projectId: "suspension-application",
  storageBucket: "suspension-application.appspot.com",
  messagingSenderId: "633314525409",
  appId: "1:633314525409:web:0954498809473ef77a77a0",
  measurementId: "G-T2872PG5T9",
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
