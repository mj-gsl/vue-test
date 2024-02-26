<template>
  <div class="header">
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

<!-- Das Formular -->
<form class="example" action="action_page.php">
    <input type="text" placeholder="Suche..." name="search">
    <button type="submit"><i class="fa fa-search"></i></button>
</form>
    <!-- Shopping Cart Icon -->
    <router-link to="/shoppingcarte" class="shopping-cart-icon">
      <i class="fas fa-shopping-cart"></i>
    </router-link>
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
* {
    box-sizing: border-box;
}

/* Stil für das Suchfeld */
form.example input[type=text] {
    padding: 10px;
    font-size: 17px;
    border: 1px solid grey;
    float: left;
    width: 80%;
    background: #f1f1f1;
}

/* Stil für den Suchbutton */
form.example button {
    float: left;
    width: 20%;
    padding: 10px;
    background: #2196F3;
    color: white;
    font-size: 17px;
    border: 1px solid grey;
    border-left: none; /* Doppelte Rahmen verhindern */
    cursor: pointer;
}

form.example button:hover {
    background: #0b7dda;
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
