<template>
  <div id="add_product">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ form.title }}
        </li>
      </ol>
    </nav>

    <div class="card text-dark bg-light mb-3 mt-4">
      <h4 class="card-header text-center">Edit Product</h4>
      <div class="card-body">
        <form @submit.prevent="updateProduct">
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Image</label>
            <div class="col-sm-10">
              <img
                class="border border-success rounded"
                v-show="!photoPreview"
                v-if="form.image"
                :src="url.make('uploads/product_photos/' + form.image)"
                alt=""
                width="200px"
              />
              <img
                class="border border-success rounded"
                v-show="photoPreview"
                :src="photoPreview"
                alt=""
                width="200px"
              />
              <input
                type="file"
                class="form-control"
                style="display: none"
                ref="product_photo"
                @change="changePhoto"
              />
              <button
                class="btn btn-success"
                style="margin-left: 10px"
                @click.prevent="selectPhoto"
              >
                <i class="fas fa-images"></i> Change Photo
              </button>
              <span class="text-danger" v-if="errors.image">{{
                errors.image[0]
              }}</span>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
              <input
                type="text"
                :class="{
                  'form-control': true,
                  'border-danger': errors.title,
                }"
                v-model="form.title"
              />
              <span class="text-danger" v-if="errors.title">{{
                errors.title[0]
              }}</span>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Price</label>
            <div class="col-sm-10">
              <input
                type="number"
                :class="{
                  'form-control': true,
                  'border-danger': errors.price,
                }"
                v-model="form.price"
              />
              <span class="text-danger" v-if="errors.price">{{
                errors.price[0]
              }}</span>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
              <textarea
                :class="{
                  'form-control': true,
                  'border-danger': errors.description,
                }"
                rows="5"
                v-model="form.description"
              ></textarea>
              <span class="text-danger" v-if="errors.description">{{
                errors.description[0]
              }}</span>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Update
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: Object,
      errors: Object,
      photoPreview: null,
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    selectPhoto() {
      this.$refs.product_photo.click();
    },
    changePhoto() {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.photoPreview = e.target.result;
      };

      reader.readAsDataURL(this.$refs.product_photo.files[0]);
    },
    getProduct() {
      this.axios
        .get(this.url.make("api/products/" + this.$route.params.id), {
          headers: {
            Authorization: this.user.authToken(),
          },
        })
        .then((result) => {
          this.form = result.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    updateProduct() {
      this.loading = true;
      // Making of the form
      let formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("price", this.form.price);
      if (this.photoPreview) {
        formData.append("image", this.$refs.product_photo.files[0]);
      }

      // Posting form
      this.axios
        .post(
          this.url.make("api/products/" + this.$route.params.id),
          formData,
          {
            headers: {
              Authorization: this.user.authToken(),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          this.loading = false;

          this.Toast.fire({
            icon: "success",
            title: "Product updated successfully!",
          });
        })
        .catch((error) => {
          this.loading = false;

          this.Toast.fire({
            icon: "error",
            title: error.response.data.message,
          });
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>