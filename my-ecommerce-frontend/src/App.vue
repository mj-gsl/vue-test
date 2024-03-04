<template>
  <div id="app">
    <GraffitiCategory />
    <FuturismusCategory />
    <!-- if i want to add other components based on the authentication status -->
  </div>
</template>

<script>

import "./assets/main.css";
import GraffitiCategory from "./components/GraffitiCategory.vue";
import FuturismusCategory from "./components/FuturismusCategory.vue";
// Importiere hier zusätzliche Komponenten, die du anzeigen möchtest

import "./assets/main.css";

export default {
  name: "App",
  components: {
    GraffitiCategory,
    FuturismusCategory
},
  data() {
    return {
      authenticated: false, // Setze den Authentifizierungsstatus nach Bedarf
    };
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      // Füge hier Logik hinzu, um den Authentifizierungsstatus zu überprüfen
      // und setze this.authenticated entsprechend
    },
  },
};
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Styling for the product list, you can adjust based on your actual component structure */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px; /* Maximum width of the product list */
}

.product-item {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-image img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
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

/* Add any additional styles for other elements within your App.vue here */
</style>

