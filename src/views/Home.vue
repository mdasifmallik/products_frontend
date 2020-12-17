<template>
  <div id="home">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Home</li>
      </ol>
    </nav>

    <div class="card text-dark bg-light mb-3 mt-4">
      <h4 class="card-header text-center">All Products</h4>
      <div class="card-body table-responsive">
        <div class="row">
          <div class="col-md-8"></div>
          <div class="col-md-4 mt-1 mb-3">
            <input
              placeholder="Search.."
              type="text"
              class="form-control"
              v-model="form.searchText"
              @keyup="search"
              @paste.prevent="searchPaste"
            />
          </div>
        </div>
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
                  class="border rounded"
                  :src="url.make('uploads/product_photos/') + product.image"
                  width="80"
                  alt=""
                />
              </td>
              <td>{{ product.title }}</td>
              <td>
                {{ product.description | str_limit(150) }}
              </td>
              <td>{{ product.price }}/-</td>
              <td>
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <!-- Button trigger modal -->
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="changeModalData(index)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  <router-link
                    class="btn btn-outline-primary"
                    :to="/edit_product/ + product.id"
                    ><i class="fas fa-pen"></i
                  ></router-link>
                  <button
                    class="btn btn-outline-danger"
                    @click="deleteProduct(index)"
                  >
                    <i class="fas fa-trash"></i>
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
          </tbody>
        </table>
        <pagination
          :data="products"
          @pagination-change-page="getResults"
          class="d-flex justify-content-center"
        ></pagination>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl"
      >
        <div class="modal-content" v-if="modal">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ modal.title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-5">
                  <img
                    class="border rounded img-fluid"
                    :src="url.make('uploads/product_photos/') + modal.image"
                    alt=""
                  />
                </div>
                <div class="col-md-7">
                  <nav>
                    <ul class="list-group">
                      <li class="list-group-item">
                        <h5><b>Title:</b> {{ modal.title }}</h5>
                      </li>
                      <li class="list-group-item">
                        <b>Price:</b> {{ modal.price }}/-
                      </li>
                      <li class="list-group-item">
                        Created
                        {{ modal.created_at | moment("from", true) }} ago.
                      </li>
                      <li class="list-group-item">
                        <b>Description:</b> {{ modal.description }}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="editPage"
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
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
      form: {
        searchText: null,
      },
      modal: null,
      loading: true,
    };
  },
  created() {
    this.getResults();
  },
  filters: {
    str_limit: function (value, size) {
      if (!value) return "";
      value = value.toString();

      if (value.length <= size) {
        return value;
      }
      return value.substr(0, size) + "...";
    },
  },
  methods: {
    deleteProduct(index) {
      this.Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Are you sure, you want to delete this product?",
        showCancelButton: true,
        confirmButtonText: `Delete`,
        confirmButtonColor: "#F1556C",
      }).then((result) => {
        if (result.isConfirmed) {
          let id = this.products.data[index].id;
          // this.products.data.splice(index, 1);

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
      if (this.form.searchText) {
        this.search(page);
      } else {
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
      }
    },
    search(page = 1) {
      this.axios
        .post(this.url.make("api/search?page=" + page), this.form, {
          headers: {
            Authorization: this.user.authToken(),
          },
        })
        .then((result) => {
          this.products = result.data;
        });
    },
    searchPaste(e) {
      this.form.searchText = e.clipboardData.getData("text");
      this.search();
    },
    changeModalData(index) {
      this.modal = this.products.data[index];
    },
    editPage() {
      this.$router.push("/edit_product/" + this.modal.id);
    },
  },
};
</script>