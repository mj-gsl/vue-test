<template>
  <div>
    <div v-if="user">
      <!-- Display user profile information here -->
      <div>
        <img :src="user.profile_photo" alt="Profile" />
        <h1>{{ user.name }}</h1>
        <p>Email: {{ user.email }}</p>
        <!-- Add more fields as necessary -->
      </div>
    </div>
    <div v-else-if="error">
      <p>Error: {{ error }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      error: null,
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        // Retrieve the user ID from the Vuex store or another global state management
        const userId = this.$store.state.user?.id; // Ensure this logic aligns with your state management

        // If the userId is null or undefined, throw an error or redirect
        if (!userId) {
          throw new Error('No user ID found');
        }

        const response = await fetch(`http://localhost:3000/user/profile/${userId}`, {
          method: 'GET',
          credentials: 'include', // This is for sending cookies in cross-origin requests
          headers: {
            'Content-Type': 'application/json',
            // Include auth token if required
            'Authorization': `Bearer ${this.$store.state.authToken}` // Replace with actual token
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.userProfile) {
          this.user = data.userProfile;
        } else {
          throw new Error('User profile not found in response');
        }
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.user-profile {
  padding-top: 20px;
}
</style>
