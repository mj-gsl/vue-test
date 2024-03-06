<template>
  <div class="user-profile">
    <h2>Upload New Product</h2>
    <form @submit.prevent="submitProduct">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="product.name" type="text" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="product.description" required></textarea>
      </div>
      <div>
        <label for="price">Price:</label>
        <input id="price" v-model.number="product.price" type="number" min="0" required>
      </div>
      <div>
        <label for="category">Category:</label>
        <select id="category" v-model="product.category">
          <option disabled value="">Please select one</option>
          <option value="Graffiti">Graffiti</option>
          <option value="Futurism">Futurism</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
        </select>
      </div>
      <div>
        <label for="image">Image:</label>
        <input id="image" type="file" @change="handleFileUpload" required>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div class="user-uploaded-images">
  <h3>My Uploaded Images</h3>
  <div v-for="image in userImages" :key="image.id" class="user-image">
    <img :src="image.url" alt="Uploaded image" @click="selectImage(image)"/>
    <!-- Modal will be here -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content" @click.stop> <!-- Prevent clicks from closing the modal -->
      <span class="close" @click="closeModal">&times;</span>
      <img :src="selectedImage.url" alt="Selected image" class="modal-image">
    </div>
  </div>

  </div>
</div>

</div>

</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      product: {
        name: '',
        description: '',
        price: null,
        category: '',
        image: null,
      },
      userImages: [], // Initialize the userImages array
      selectedImage: null, // Store the selected image
      showModal: false, // Control the visibility of the modal
    };
  },
  computed: {
    ...mapGetters({
      user: 'getUser', // Make sure your Vuex store has this getter
    }),
  },
  created() {
    this.fetchUserImages(); // Fetch images as soon as the component is created
  },
  methods: {
    ...mapActions(['fetchUser']), // Fetch user information if needed
    handleFileUpload(event) {
      this.product.image = event.target.files[0];
    },
    async submitProduct() {
      try {
        const formData = new FormData();
        formData.append('name', this.product.name);
        formData.append('description', this.product.description);
        formData.append('price', this.product.price);
        formData.append('category', this.product.category);
        formData.append('image', this.product.image);

        // Make sure to include credentials: true to send cookies with the request
        // if your backend depends on sessions
        const response = await axios.post('http://localhost:3000/submit-product', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data);
        alert('Product submitted successfully!');
        this.product = { name: '', description: '', price: null, category: '', image: null };
        this.fetchUserImages(); // Re-fetch the images to update the list with the new image
      } catch (error) {
        console.error("Error submitting product:", error);
        alert('Failed to submit product.');
      }
    },
    async fetchUserImages() {
      try {
        // 'this.user.id' assumes you have a user object with an 'id' in your Vuex state
        const userId = this.user.id;
        const response = await axios.get(`http://localhost:3000/user/${userId}/images`, {
          withCredentials: true, // Include this if your backend requires sessions
        },
        );
        this.userImages = response.data.images; // Assumes the response is an object with an 'images' array
      } catch (error) {
        console.error("Error fetching user's images:", error);
      }
    },
    selectImage(image) {
      // Set the selected image and open the modal
      this.selectedImage = image;
      this.showModal = true;
    },
    toggleModal(show) {
    this.showModal = show;
    },
    closeModal() {
      // Close the modal
      this.showModal = false;
      this.selectedImage = null;
    },
  
  }
};
</script>

<style scoped>
.user-profile h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
.user-profile form {
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 20px;
  align-items: end;
  flex-wrap: wrap;
  gap: 30px;
  align-items: flex-end; /* Aligns items vertically at the bottom */
  margin: auto;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px;
}

.user-profile div {
  margin-bottom: 10px;
  flex: 1 1 200px; /* Each child will take equal space */
  min-width: 120px;
}

.user-profile label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
}

/* Style for the file input and submit button to prevent them from stretching */
.user-profile input[type="file"],
.user-profile button {
  flex: 0 0 auto;
}
.user-profile input[type="text"],
.user-profile input[type="number"],
.user-profile textarea,
.user-profile select,
.user-profile input[type="file"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


.user-profile button {
  grid-column: span 2; /* Span button across two columns */
  padding: 12px 20px;
  background-color: #8f601a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

@media (max-width: 768px) {
  .user-profile form {
    flex-direction: column;
    grid-template-columns: 1fr;
  }
  .user-profile div {
    flex: 0 0 100%; /* Each child will take full width */
  }
  .user-profile input[type="file"],
  .user-profile button {
    width: 100%;
    grid-column: span 1;
  }
}
.user-profile button:hover {
  background-color: #a37b0d;
  flex: 0 0 auto; /* Do not grow or shrink the button */
  padding: 10px 20px;
}
.user-uploaded-images {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
}
.user-uploaded-images .user-image img {
  /* Adjust the size as needed */
  width: 100%;
  max-width: 200px; /* You can adjust the max-width to control the size of the images */
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.user-uploaded-images h3 {
  width: 100%;
  clear: both; /* This ensures the header is not floated next to other elements */
}


.user-image img {
  width: 100%;
  max-width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}
.user-image img:hover {
  transform: translateY(-5px);
}
/* CSS for the modal that will display the clicked image */
.modal {
  display: flex; /* Hidden by default */
  position: fixed; /* Stay in place */
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
}
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: auto;
  max-width: 90%;
  background-color: #fff; /* Solid background for the content */
  border-radius: 8px;
  overflow: hidden;
}
.modal-image {
  display: block; /* Remove any inline characteristics */
  max-width: 100%; /* Max out at the width of the viewport */
  max-height: 80vh; /* Max out at 80% of the height of the viewport */
  margin: auto; /* Center it within the modal content */
  display: block;
}
.close {
  position: absolute;
  color: #aaaaaa;
  float: right;
  font-size: 2rem;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

/* Add a modern font */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}


</style>
