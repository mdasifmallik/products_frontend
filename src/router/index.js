import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '../helpers/user'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add_product',
    name: 'AddProduct',
    component: () => import('../views/AddProduct.vue')
  },
  {
    path: '/edit_product/:id',
    name: 'EditProduct',
    component: () => import('../views/EditProduct.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === "Login" || to.name === "Register") {
    if (user.hasToken()) {
      next({
        name: "Home",
      });
    } else {
      next();
    }
  } else {
    if (!user.hasToken()) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  }
});

export default router
