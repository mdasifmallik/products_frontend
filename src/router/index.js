import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '../helpers/user'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home | Products"
    }
  },
  {
    path: '/add_product',
    name: 'AddProduct',
    component: () => import('../views/AddProduct.vue'),
    meta: {
      title: "Add Product"
    }
  },
  {
    path: '/edit_product/:id',
    name: 'EditProduct',
    component: () => import('../views/EditProduct.vue'),
    meta: {
      title: "Edit Product"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta: {
      title: "Login | Products"
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue'),
    meta: {
      title: "Register | Products"
    }
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

// Navigation Guard
router.beforeEach((to, from, next) => {
  window.document.title = to.meta && to.meta.title ? to.meta.title : 'Products';
  if (to.name === "Login" || to.name === "Register") {
    // Redirect to Home if there is valid token
    if (user.hasValidToken()) {
      next({
        name: "Home",
      });
    } else {
      next();
    }
  } else {
    // Redirect to Login page if there is no valid token
    if (user.hasValidToken()) {
      // Refresh Token if it's more than 15 minutes old
      user.refreshToken().then((result) => {
        if (result) {
          next();
        } else {
          user.logout();
          next({
            name: "Login",
          });
        }
      });
    } else {
      user.logout();
      next({
        name: "Login",
      });
    }
  }
});

export default router
