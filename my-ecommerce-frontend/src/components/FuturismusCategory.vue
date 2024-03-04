<!-- FuturismusCategory.vue -->
<template>
    <div class="product-id">
      <h2>FuturismusCategory</h2>
      <div v-if="futurismus.length > 0">
        <div v-for="(item, index) in futurismus" :key="index" class="item">
          <img :src="item.imageUrl" :alt="item.name" class="image">
          <div class="info">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p>Price: ${{ item.price }}</p>
            <p>Artist: {{ item.artist }}</p>
          </div>
          <button @click="buyArtwork(item)">Buy</button>
        </div>
      </div>
      <div v-else>
        <p>No futurismus available</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FuturismusCategory',
    data() {
      return {
        futurismus: [
          { name: 'Artwork 1', description: 'Description 1', price: 100, artist: 'Artist 1', imageUrl: 'image1.jpg' },
          { name: 'Artwork 2', description: 'Description 2', price: 150, artist: 'Artist 2', imageUrl: 'image2.jpg' },
          { name: 'Artwork 3', description: 'Description 3', price: 200, artist: 'Artist 3', imageUrl: 'image3.jpg' }
        ]
      }
    },
    methods: {
      buyArtwork(item) {
        console.log('Buying', item.name);
        // Add logic to handle purchasing the artwork
      }
    }
  }
  </script>
  
  <style scoped>
  .futurismus {
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
  