<template>
  <div id="app">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark"
      v-if="user.hasValidToken()"
    >
      <div class="container">
        <router-link class="navbar-brand" to="/">Products</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                :class="{
                  'nav-link': true,
                  active: $route.name == 'Home' ? true : false,
                }"
                aria-current="page"
                to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :class="{
                  'nav-link': true,
                  active: $route.name == 'AddProduct' ? true : false,
                }"
                to="/add_product"
                >Add Product</router-link
              >
            </li>
          </ul>
          <div class="btn-group">
            <button
              style="color: white"
              type="button"
              class="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              <i class="fas fa-user"></i> {{ user.name() }}
            </button>
            <ul class="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
              <li>
                <button class="dropdown-item" type="button" @click="logout">
                  <i class="fas fa-sign-out-alt"></i> Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-4 mb-5">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.axios
        .post(
          this.url.make("api/auth/logout"),
          {},
          {
            headers: {
              Authorization: this.user.authToken(),
            },
          }
        )
        .then(() => {
          this.user.logout();
          this.$router.push("/login");
        })
        .catch(() => {
          this.user.logout();
          this.$router.push("/login");
        });
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
