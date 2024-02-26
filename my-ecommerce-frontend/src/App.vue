<template>
  <div id="app">
    <Header />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header-component.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      fetch("http://localhost:3001/auth/login/success")
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("User is authenticated:", data.user);
          } else {
            console.log("User is not authenticated");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
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
  width: 100%;
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
  display: flex;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
