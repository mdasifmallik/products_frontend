<template>
  <div id="login">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="card text-white bg-dark mb-3 mt-5">
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
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  v-model="form.password"
                  required
                />
              </div>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1"
                  >Remember Me</label
                >
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
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
      form: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    login() {
      axios
        .post(this.url.make("api/auth/login"), this.form)
        .then((response) => {
          this.user.responseAfterLogin(response);
          this.Toast.fire({
            icon: "success",
            title: "Signed in successfully!",
          });
          this.$router.push("/");
        })
        .catch(() => {
          this.Toast.fire({
            icon: "error",
            title: "Credentials hasn't matched!",
          });
        });
    },
  },
};
</script>