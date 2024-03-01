<template>
    <div class="product-list">
        <div v-for="(product, index) in products" :key="product.id" class="product-item">
            <div class="product-image">
                <img :src="images[index]" :alt="product.name" />
            </div>
            <div class="product-info">
                <h1>{{ product.name }}</h1>
                <p class="product-description">{{ product.description }}</p>
                <p class="product-price">Price: ${{ product.price }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import horsesImage from '@/assets/horses.jpg';
import graffitiImage from '@/assets/graffiti.jpg';
import colorImage from '@/assets/color.jpg';

export default {
    name: 'ProductList',
    data() {
        return {
            products: [],
            // Create an array to hold the image sources
            images: [horsesImage, graffitiImage, colorImage]
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/products');
                this.products = response.data.map((product, index) => {
                    // Assign an image from the images array to each product
                    return {
                        ...product,
                        imageUrl: this.images[index % this.images.length] 
                    };
                });
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
    }
};
</script>

<style scoped>
</style>
