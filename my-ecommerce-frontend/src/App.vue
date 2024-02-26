<template>
  <div id="app">
    <ProductList />
    <!-- if i want to add other components based on the authentication status -->
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import "./assets/main.css";

export default {
  name: "App",
  components: {
    ProductList,
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      // ...
    },
  },
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Arial, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Add any additional styles for other elements within your App.vue here */
</style>
