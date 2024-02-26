<template>
  <div class="category">
    <!-- <h1>Category</h1> -->
    <div
      v-for="(category, categoryName) in categories"
      :key="category.id"
      class="category-container"
    >
      <router-link :to="'/category/' + category.name" class="category-link">
        <h1>{{ category.name }}</h1>
        <img
          v-if="category.artworks.length > 0"
          :src="getImagePath(category, category.artworks[0].image)"
          :alt="categoryName"
          class="category-image"
        />
        <p>{{ category.description }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
// Import the JSON file containing category data
import categoryData from "@/data.json";

export default {
  data() {
    return {
      categories: categoryData.category, // Object to store categories
    };
  },
  methods: {
    getImagePath(category, imageName) {
      if (!category) return "";
      // Convert category name to lowercase
      const categoryFolder = category.name.toLowerCase();
      // Assuming your images are stored in the 'images' folder in your assets directory
      return require(`@/assets/images/${categoryFolder}/${imageName}`);
    },
  },
};
</script>

<style>
.category {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.category-container {
  flex-basis: calc(33.33% - 20px);
  margin-bottom: 20px;
  box-sizing: border-box;
  width: 100%;
}

.category-link {
  display: block;
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.category-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
