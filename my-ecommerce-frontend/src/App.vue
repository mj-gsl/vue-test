<template>
  <div id="app">
    <Header/>
    <nav>
      <router-link to="/" >All Category</router-link>
      <!-- <router-link to="/category/Painting" >Painting</router-link>
      <router-link to="/category/Drawing" >Drawing</router-link>
      <router-link to="/category/Sculpture" >Sculpture</router-link>
      <router-link to="/category/Printmaking" >Printmaking</router-link>
      <router-link to="/category" /> -->
    </nav>
    <!-- <ProductList /> -->
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
// import ProductList from "./components/ProductList.vue";
// import "./assets/main.css";
import Header from "@/components/Header-component.vue";

export default {
  name: "App",
  components: {
    // Register the Header Component
    Header,
  },
  // name: "App",
  // components: {
  //   ProductList,
  // },
  created() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      fetch("http://localhost:3001/auth/login/success")
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Handle the authenticated user
            console.log("User is authenticated:", data.user);
            // Here i might want to store the user data in a global state or emit an event, maybe later!!
          } else {
            // User is not authenticated
            console.log("User is not authenticated");
            // Redirect to login or show an error message
            // this.$router.push('/login'); // if i am using vue-router but i didn't use
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle the error, maybe show a notification or message
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
}

nav {
  margin-bottom: 20px;
}
.nav-button {
  display: inline-block;
  padding: 10px 20px;
  margin-right: 10px;
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  border: 1px solid #007bff;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;
}
.nav-button:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

nav router-link {
  margin-right: 10px;
  text-decoration: none;
  color: #333;
}

nav router-link:hover {
  color: #007bff;
}

.container {
  max-width: 800px;
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
