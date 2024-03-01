<!-- GraffitiCategory.vue -->
<template>
  <div class="GraffitiCategory">
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
  import carImage from '@/assets/graffiti/car-graffiti.jpg';

  export default {
    name: 'GraffitiCategory',
    data() {
      return {
        products: [],
        images: [carImage]
      };
    },
    mounted() {
      this.fetchGraffitiProducts();
    },
    methods: {
      async fetchGraffitiProducts() {
        try {
          const response = await axios.get('http://localhost:3000/GraffitiCategory');
          this.products = response.data.map((product, index) => {
            return {
              ...product,
              imageUrl: this.images[index % this.images.length]
            };
          });
        } catch (error) {
          console.error("Error fetching graffiti products:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Hier könnten zusätzliche Stile für GraffitiCategory hinzugefügt werden */
  .GraffitiCategory {
    font-family: Arial, sans-serif;
  }
  
  .artwork {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .product-image img {
    width: 100%;
    height: auto;
  }
  
  .product-info {
    text-align: center;
  }
  
  .product-info h1 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 5px;
  }
  
  .product-info .product-description {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 10px;
  }
  
  .product-info .product-price {
    font-size: 1.1rem;
    color: #2c3e50;
    font-weight: bold;
  }
  </style>

