// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import Firebase from 'firebase';
import firebase from 'firebase/app'
import VueRouter from 'vue-router';
import { store } from './store/store';
import { routes } from './router/routes';

Vue.config.productionTip = false

let app;
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCfn8DXPhHBk01MPEO1cHjOtz7dTU8ipy4",
    authDomain: "auth-ea7fe.firebaseapp.com",
    databaseURL: "https://auth-ea7fe.firebaseio.com",
    projectId: "auth-ea7fe",
    storageBucket: "auth-ea7fe.appspot.com",
    messagingSenderId: "894595289854"
};

firebase.initializeApp(config);

window.firebase=firebase;

// Set-up and use the Vue Router
// Pass in your routes and then
// Set the mode to use history
// removes # from the URL
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

// Check before each page load whether the page requires authentication/
// if it does check whether the user is signed into the web app or
// redirect to the sign-in page to enable them to sign-in
router.beforeEach((to, from, next) => {

  const currentUser = Firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/sign-in');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }

});

// Wrap the vue instance in a Firebase onAuthStateChanged method
// This stops the execution of the navigation guard 'beforeEach'
// method until the Firebase initialization ends
Firebase.auth().onAuthStateChanged(function (user) {

  new Vue({
    el: '#app',
    store: store,
    router: router,
    render: h => h(App)
  });

});


