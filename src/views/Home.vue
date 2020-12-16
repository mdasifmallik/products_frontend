<template>
  <div id="home">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Home</li>
      </ol>
    </nav>

    <div class="card text-dark bg-light mb-3 mt-4">
      <h4 class="card-header text-center">All Products</h4>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products.data" :key="product.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <img
                  :src="url.make('uploads/product_photos/') + product.image"
                  width="80"
                  alt=""
                />
              </td>
              <td>{{ product.title }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}/-</td>
              <td>
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <router-link
                    class="btn btn-primary"
                    :to="/edit_product/ + product.id"
                    >Edit</router-link
                  >
                  <button class="btn btn-danger" @click="deleteProduct(index)">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && products.data.length == 0">
              <td colspan="50" class="text-danger text-center">
                No Products Available!
              </td>
            </tr>
            <tr v-if="loading">
              <td colspan="50">
                <div class="text-center">
                  <div
                    class="spinner-border"
                    style="width: 50px; height: 50px"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="50">
                <pagination
                  :data="products"
                  @pagination-change-page="getResults"
                  class="d-flex justify-content-center"
                ></pagination>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: {
        data: [],
      },
      loading: true,
    };
  },
  created() {
    this.getResults();
  },
  methods: {
    deleteProduct(index) {
      this.Swal.fire({
        icon: "error",
        title: "Warning",
        text: "Are you sure, you want to delete this product?",
        showCancelButton: true,
        confirmButtonText: `Delete`,
        confirmButtonColor: "#F1556C",
      }).then((result) => {
        if (result.isConfirmed) {
          let id = this.products.data[index].id;

          axios
            .delete(this.url.make("api/products/" + id), {
              headers: {
                Authorization: this.user.authToken(),
              },
            })
            .then(() => {
              this.getResults();
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        }
      });
    },
    getResults(page = 1) {
      axios
        .get(this.url.make("api/products?page=" + page), {
          headers: {
            Authorization: this.user.authToken(),
          },
        })
        .then((result) => {
          this.products = result.data;
          this.loading = false;
        });
    },
  },
};
</script>