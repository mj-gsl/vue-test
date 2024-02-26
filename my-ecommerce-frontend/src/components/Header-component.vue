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
            v-for="(category, index) in categories"
            :value="index"
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
    handleCategoryChange() {
      // Handle category change event
      // You can implement filtering based on the selected category
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
