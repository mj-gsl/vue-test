<template>
  <div class="product-list">
    <!-- Display the user's name and profile picture if they are fetched -->
    <div v-if="user" class="user-info">
      <img :src="user.profile_photo" alt="Profile Photo" class="profile-photo"/>
      <h2>Welcome, {{ user.name }}!</h2>
    </div>
   <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-item">
            <div class="product-image">
                <!-- Use product.imageUrl for image source -->
                <img :src="product.image_url" :alt="product.name" />
            </div>
            <div class="product-info">
                <h1>{{ product.name }}</h1>
                <p class="product-description">{{ product.description }}</p>
                <p class="product-price">Price: ${{ product.price }}</p>
            </div>
        </div>
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
    };
  },
  computed: {
    // Access user data using Vuex getters
    ...mapGetters({
      user: 'getUser'
    }),
  },
  created() {
    this.fetchUser(); // Fetch user information on create
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
  }
};
</script>

<style scoped>
.profile-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

</style>
