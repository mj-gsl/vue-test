<template>
    <div>
      <!-- Header Section -->
      <header class="header">
        <!-- App Logo and Name -->
        <div class="app-logo">
          <img src="@/assets/logo.png" alt="App Logo" />
          <div class="app-name">
            <h1>Welcome to your</h1>
            <h1 class="creative-marketplace">Creative Marketplace</h1>
          </div>
        </div>
  
        <!-- Search Bar -->
        <div>
         <SearchBar/>
       </div>
  
      </header>
  
      <!-- Category Links Section -->
      <nav class="category-links">
        <router-link to="/category/painting">Painting</router-link>
        <router-link to="/category/sculpture">Sculpture</router-link>
        <router-link to="/category/graffiti">Graffiti</router-link>
        <router-link to="/category/futurism">Futurism</router-link>
      </nav>
  
      <!-- Product List Section -->
      <div class="product-list">
        <!-- Display the products based on the selected category -->
        <router-view :products="products" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import SearchBar from './SearchBar.vue';
  
  export default {
    name: 'ProductList',
    data() {
        return {
            products: [],
            images: [ /* Add your image paths here */],
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            try {
                // Hier füge den Code für die Produktdaten entsprechend der ausgewählten Kategorie hinzu
                // Du musst möglicherweise die Kategorie als Prop übergeben oder den Router verwenden, um die Kategorie zu erhalten
                // Beispiel:
                // const category = this.$route.params.category;
                // const response = await axios.get(`http://localhost:3000/products?category=${category}`);
                // this.products = response.data;
                // Hier ist ein Dummy-Beispiel ohne Kategoriefilterung
                const response = await axios.get('http://localhost:3000/products');
                this.products = response.data;
            }
            catch (error) {
                console.error('Error fetching products:', error);
            }
        },
    },
    components: { SearchBar }
};
  </script>
  
  <style scoped>
  /* Your existing styling goes here */
  .app-logo {
    display: flex;
    align-items: center;
  }
  
  .app-logo img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  
  .app-name {
    display: flex;
    flex-direction: column;
  }
  
  .app-name h1 {
    margin: 0;
    font-size: 1.2rem;
  }
  
  .creative-marketplace {
    font-size: 1.5rem;
  }
  
  .category-links {
    margin-top: 10px;
    display: flex;
    gap: 20px;
  }
  
  .category-links router-link {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    font-size: 1rem;
    padding: 8px;
    border-radius: 5px;
    background-color: #f0f0f0;
  }
  
  .category-links router-link:hover {
    background-color: #ddd;
  }
  </style>
  <template>
  <div>
    <!-- Header Section -->
    <header class="header">
      <!-- App Logo and Name -->
      <div class="app-logo">
        <img src="@/assets/logo.png" alt="App Logo" />
        <div class="app-name">
          <h1>Welcome to your</h1>
          <h1 class="creative-marketplace">Creative Marketplace</h1>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      <!-- Cart Icon -->
      <div class="cart-icon">
        <span>🛒</span>
      </div>
    </header>

    <!-- Category Links Section -->
    <nav class="category-links">
      <router-link to="/category/painting">Painting</router-link>
      <router-link to="/category/sculpture">Sculpture</router-link>
      <router-link to="/category/graffiti">Graffiti</router-link>
      <router-link to="/category/futurism">Futurism</router-link>
    </nav>

    <!-- Product List Section -->
    <div class="product-list">
      <!-- Display the products based on the selected category -->
      <router-view :products="products" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Dummy-Beschreibungen für jedes Produkt
const productDescriptions = [
  'Ein atemberaubendes Gemälde, das die Schönheit der Natur einfängt.',
  'Eine einzigartige Skulptur, die die menschliche Form erkundet.',
  'Ein lebendiges Graffiti-Kunstwerk, das die Straßen zum Leben erweckt.',
  'Futuristische Darstellung von künstlicher Intelligenz in weiblicher Form.',
  // ... Füge weitere Beschreibungen für jedes Produkt hinzu
];

// Bilder importieren
import brazilSambaPainting from "@/assets/brazil Samba painting.jpg";
import colorPainting from "@/assets/color painting.jpg";
import figurinetSculpture from "@/assets/figurinet sculpture.jpg";
import graffitiCar from "@/assets/graffiti car.jpg";
import graffitiHandOverHand from "@/assets/graffiti hand over hand.jpg";
import graffitiEscape from "@/assets/graffiti- Escape.jpg";
import graffitiSmallBoy from "@/assets/graffiti-samall boy.jpg";
import horsesPainting from "@/assets/horses painting.jpg";
import laJocondePainting from "@/assets/la Joconde painting.jpg";
import lifeStillPainting from "@/assets/life-still painting.jpg";
import mountainPainting from "@/assets/mountain-painting.jpg";
import paintingBird from "@/assets/painting bird.png";
import stillLifePainting from "@/assets/still-life-painting.jpg";
import wallGraffiti from "@/assets/wall-graffitti.jpg";
import graffiti from "@/assets/graffiti.jpg";
import aiRobotWomen from "@/assets/ai- robotwomen Futurismus.jpg";
import aiRobotCat from "@/assets/ai-robotcat futurismus.jpg";
import aiRobotMen from "@/assets/ai-robotmen futurismus.jpg";

const images = [
  brazilSambaPainting, colorPainting, figurinetSculpture, graffitiCar,
  graffitiHandOverHand, graffitiEscape, graffitiSmallBoy, horsesPainting,
  laJocondePainting, lifeStillPainting, mountainPainting, paintingBird,
  stillLifePainting, wallGraffiti, graffiti, aiRobotWomen, aiRobotCat, aiRobotMen,
];

export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        this.products = response.data.map((product, index) => ({
          ...product,
          imageUrl: images[index % images.length],
          description: productDescriptions[index % productDescriptions.length],
        }));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Your existing styling goes here */
.app-logo {
  display: flex;
  align-items: center;
}

.app-logo img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.app-name {
  display: flex;
  flex-direction: column;
}

.app-name h1 {
  margin: 0;
  font-size: 1.2rem;
}

.creative-marketplace {
  font-size: 1.5rem;
}

.category-links {
  margin-top: 10px;
  display: flex;
  gap: 20px;
}

.category-links router-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1rem;
  padding: 8px;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.category-links router-link:hover {
  background-color: #ddd;
}
</style>
