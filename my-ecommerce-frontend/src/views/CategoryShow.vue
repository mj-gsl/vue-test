<template>
  <div>
    <h1>{{ category.name }}</h1>
    <div v-if="category.artworks.length > 0">
      <div
        v-for="artwork in category.artworks"
        :key="artwork.id"
        class="artwork-container"
      >
        <h2>{{ artwork.name }}</h2>
        <img
          :src="getImagePath(artwork.image)"
          :alt="artwork.name"
          class="artwork-image"
        />
        <div class="artwork-details">
          <p>{{ artwork.description }}</p>
          <p>Artist: {{ artwork.artist }}</p>
          <!-- Add to shopping list button -->
          <button @click="addToShoppingList(artwork)">Add to Shopping List</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import categoryData from "@/data.json";

export default {
  data() {
    return {
      categories: categoryData.category,
      selectedCategory: "",
      searchQuery: "",
    };
  },
  computed: {
    categoryname() {
      return this.$route.params.name;
    },
    category() {
      return categoryData.category.find(
        (category) => category.name === this.categoryname,
      );
    },
  },
  methods: {
    selectCategory() {
      if (this.selectedCategory) {
        this.$router.push({ name: 'CategoryShow', params: { name: this.selectedCategory } });
      }
    },
    handleSearchInput() {
      // Handle search input event
      // You can implement filtering based on the search query
    },
    getImagePath(imageName) {
      const categoryFolder = this.category.name.toLowerCase().replace(/\s+/g, "-");
      return require(`@/assets/images/${categoryFolder}/${imageName}`);
    },
    addToShoppingList(artwork) {
      let shoppingList = JSON.parse(sessionStorage.getItem("shoppingList")) || [];
      
      // Check if the item already exists in the shopping list
      const existingItemIndex = shoppingList.findIndex(item => item.name === artwork.name);
      
      if (existingItemIndex !== -1) {
        // If the item exists, increment its quantity
        shoppingList[existingItemIndex].quantity++;
      } else {
        // If the item doesn't exist, add it to the shopping list with quantity 1
        shoppingList.push({
          name: artwork.name,
          category: this.categoryname,
          quantity: 1,
          image: this.getImagePath(artwork.image) // Include the image path
        });
      }

      // Save the updated shopping list to session storage
      sessionStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    },
  },
};
</script>

<style scoped>
.artwork-image {
  width: 100%;
  height: auto;
  max-width: 300px;
  max-height: 300px;
}

.artwork-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.artwork-details {
  margin-top: 10px;
}
</style>
