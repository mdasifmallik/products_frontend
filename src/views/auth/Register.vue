<template>
  <div id="login">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <h3 class="text-center mt-4">Products CRUD</h3>
        <div class="card text-white bg-dark mb-5 mt-4">
          <h4 class="card-header text-center">Sign Up</h4>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="mb-3">
                <label class="form-label">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="Full Name"
                  v-model="form.name"
                />
                <span class="text-danger" v-if="errors.name">{{
                  errors.name[0]
                }}</span>
              </div>
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
                  :type="passwordType1"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  v-model="form.password"
                />
                <span
                  class="showPassword"
                  @mousedown="passwordType1 = 'text'"
                  @mouseup="passwordType1 = 'password'"
                  ><i class="fas fa-eye"></i
                ></span>
                <span class="text-danger" v-if="errors.password">{{
                  errors.password[0]
                }}</span>
              </div>
              <div class="mb-3" style="position: relative">
                <label class="form-label">Retype Password</label>
                <input
                  :type="passwordType2"
                  class="form-control"
                  name="password_confirmation"
                  placeholder="Password"
                  v-model="form.password_confirmation"
                />
                <span
                  class="showPassword"
                  @mousedown="passwordType2 = 'text'"
                  @mouseup="passwordType2 = 'password'"
                  ><i class="fas fa-eye"></i
                ></span>
              </div>
              <div class="mb-3">
                <label
                  class="form-label"
                  style="text-align: right; display: block"
                  >Already have an account?
                  <router-link to="/login">Sign In</router-link></label
                >
              </div>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Register
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
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      errors: {},
      passwordType1: "password",
      passwordType2: "password",
    };
  },
  methods: {
    register() {
      this.loading = true;
      axios
        .post(this.url.make("api/auth/register"), this.form)
        .then((response) => {
          this.loading = false;
          this.user.responseAfterLogin(response);
          this.Toast.fire({
            icon: "success",
            title: "Registered successfully!",
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