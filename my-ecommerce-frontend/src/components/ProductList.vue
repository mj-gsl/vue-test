<template>
  <div class="product-list">
    <div v-if="user" class="user-info">
      <img :src="user.profile_photo" alt="Profile Photo" class="profile-photo"/>
      <h4>Welcome, {{ user.name }}!</h4>
      <router-link :to="{ name: 'UserProfile', params: { userId: user.id }}">My Profile</router-link>
    </div>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <div class="product-image" @click="selectProductImage(product.image_url)">
          <img :src="product.image_url" :alt="product.name" />
        </div>
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">Price: ${{ product.price }}</p>
        </div>
      </div>
    </div>
    
    <!-- Modal for displaying selected product image -->
    <div v-if="selectedProductImage" class="modal" @click="selectedProductImage = null">
      <img :src="selectedProductImage" class="modal-content" @click.stop>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      selectedProductImage: null, // For storing the selected image URL
    };
  },
  computed: {
    // Access user data using Vuex getters
    ...mapGetters({
      user: 'getUser'
    }),
  },
  created() {
    this.fetchUser();
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(['fetchUser']), // Assuming you have a fetchUser action in your Vuex store

    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    selectProductImage(imageUrl) {
      this.selectedProductImage = imageUrl;
    },
  }
};
</script>

<style scoped>
/* Your existing styles */

/* Modal styles */
.modal {
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  margin: auto;
  display: block;
  max-width: 90%;
  max-height: 90%;
}

/* Ensure the user-info styles are not broken */
.user-info {
  display: flex; 
  align-items: center; 
  margin-right: 20px;
}

/* Style updates for profile-photo if necessary */
.profile-photo {
  /* styles */
}
</style>
