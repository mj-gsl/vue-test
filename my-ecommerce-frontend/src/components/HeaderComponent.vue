<template>
  <div class="HeaderComponent">
    <!-- Logo and Categories -->
    <div class="logo-and-categories">
      <!-- Logo -->
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <router-link to="/" class="home-link"><h1>Creative Marketplace</h1></router-link>
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
    <!-- Icon-Bibliothek laden -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<!-- SearchBar Component -->
     <div>
    <SearchResultsView/>
    </div>
  
    <!-- Shopping Cart Icon -->
    <router-link to="/shoppingcarte" class="shopping-cart-icon">
      <i class="fas fa-shopping-cart"></i>
    </router-link>
  </div>
</template>

<script>
import categoryData from "@/data.json";
import SearchResultsView from "@/views/SearchResultsView.vue";

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
    components: { SearchResultsView }
};
</script>;

<style>
.HeaderComponent {
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


/* Floats zurücksetzen */
form.example::after {
    content: "";
    clear: both;
    display: table;
}



.shopping-cart-icon {
  font-size: 24px; 
  color: #000; 
  text-decoration: none;
  margin-right: 20px; 
}
.home-link {
  margin-right: 20px; 
  text-decoration: none; 
  color: #000; 
}

</style>
