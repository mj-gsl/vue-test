<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated']), // Use Vuex getter to check if user is authenticated
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    ...mapActions(['authenticateUser']),
    checkAuthentication() {
      // Fetch the login success state from your backend
      fetch('http://localhost:3001/auth/login/success', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Use Vuex action to store authenticated user data
            this.authenticateUser(data.user);
            console.log('User is authenticated:', data.user);
          } else {
            console.log('User is not authenticated');
            // Handle not authenticated state, e.g., redirect to login page
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
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
