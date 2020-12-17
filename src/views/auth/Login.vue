<template>
  <div id="login">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <h3 class="text-center mt-4">Products CRUD</h3>
        <div class="card text-white bg-dark mb-5 mt-4">
          <h4 class="card-header text-center">Sign In</h4>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                  v-model="form.email"
                />
                <span class="text-danger" v-if="errors.email">{{
                  errors.email[0]
                }}</span>
              </div>
              <div class="mb-3" style="position: relative">
                <label class="form-label">Password</label>
                <input
                  :type="passwordType"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  v-model="form.password"
                />
                <span
                  class="showPassword"
                  @mousedown="passwordType = 'text'"
                  @mouseup="passwordType = 'password'"
                  ><i class="fas fa-eye"></i
                ></span>
                <span class="text-danger" v-if="errors.password">{{
                  errors.password[0]
                }}</span>
              </div>
              <div class="mb-3">
                <label
                  class="form-label"
                  style="text-align: right; display: block"
                  >Don't have an account?
                  <router-link to="/register">Sign Up</router-link></label
                >
              </div>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null,
      },
      errors: {},
      passwordType: "password",
    };
  },
  methods: {
    login() {
      this.loading = true;
      axios
        .post(this.url.make("api/auth/login"), this.form)
        .then((response) => {
          this.loading = false;
          this.user.responseAfterLogin(response);
          this.Toast.fire({
            icon: "success",
            title: "Signed in successfully!",
          });
          this.$router.push("/");
        })
        .catch((error) => {
          this.loading = false;
          this.errors = error.response.data.errors;

          this.Toast.fire({
            icon: "error",
            title: error.response.data.message,
          });
        });
    },
  },
};
</script>

<style>
.showPassword {
  position: absolute;
  top: 40px;
  right: 15px;
  color: black;
  cursor: pointer;
}
</style>