<!-- FuturismusCategory.vue -->
<template>
  <div class="FuturismusCategory">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      class="product-item"
    >
      <div class="product-image">
        <img
          :src="images[index]"
          :alt="product.name"
        >
      </div>
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="product-description">
          {{ product.description }}
        </p>
        <p class="product-price">
          Price: ${{ product.price }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import timeImage from '@/assets/time.jpg';
import galaxyImage from '@/assets/galaxy.jpg';
import featherImage from '@/assets/feather.jpg';
import cyberpunkImage from '@/assets/cyberpunk.jpg';


  export default {
    name: 'FuturismusCategory',
    data() {
      return {
        products: [],
        images: [timeImage,galaxyImage,featherImage,cyberpunkImage]
      };
    },
    mounted() {
      this.fetchFuturismusProducts();
    },
    methods: {
      async fetchFuturismusProducts() {
        try {
          const response = await axios.get('http://localhost:3000/GraffitiCategory');
          this.products = response.data.map((product, index) => {
            return {
              ...product,
              imageUrl: this.images[index % this.images.length]
            };
          });
        } catch (error) {
          console.error("Error fetching futurismus products:", error);
        }
      }
    }
  };
  </script>
         

<style scoped>
.futurismuscategory {
  margin-top: 20px;
}

.item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.info {
  flex-grow: 1;
}
</style>
