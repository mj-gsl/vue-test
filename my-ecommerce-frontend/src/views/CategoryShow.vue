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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import categoryData from "@/data.json";

export default {
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
    getImagePath(imageName) {
      const categoryFolder = this.category.name
        .toLowerCase()
        .replace(/\s+/g, "-");
      return require(`@/assets/images/${categoryFolder}/${imageName}`);
    },
  },
};
</script>
<style scoped>
.artwork-image {
  width: 100%;
  height: auto;
  max-width: 300px;
  /* Adjust as needed */
  max-height: 300px;
  /* Adjust as needed */
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
