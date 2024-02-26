<template>
  <div class="header">
    <!-- Logo and Categories -->
    <div class="logo-and-categories">
      <!-- Logo -->
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <!-- Categories Dropdown -->
      <div class="dropdown">
        <select v-model="selectedCategory" @change="selectCategory">
          <option value="" disabled>Select Category</option>
          <option
            v-for="category in categories"
            :value="category.name"
            :key="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>
    <!-- Search Bar -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search..."
      @input="handleSearchInput"
      class="search-bar"
    />
    <router-link to="/shoppingcarte" class="shopping-list-button">Shopping List</router-link>
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
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  width: 100%;
}

.logo-and-categories {
  display: flex;
  align-items: center;
}

.logo {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.dropdown {
  margin-right: 20px;
}

select,
input[type="text"] {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;
}

.search-bar {
  flex-grow: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
