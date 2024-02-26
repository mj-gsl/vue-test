<template>
    <div>
        <h1>Shopping List</h1>
        <ul>
            <li v-for="(item, index) in shoppingList" :key="index">
                <div>
                    <img :src="item.image" :alt="item.name" class="artwork-image" />
                    <span>{{ item.name }} - Quantity: {{ item.quantity }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            shoppingList: [],
        };
    },
    mounted() {
        // Retrieve shopping list from session storage
        const storedShoppingList = sessionStorage.getItem("shoppingList");
        if (storedShoppingList) {
            this.shoppingList = JSON.parse(storedShoppingList);
        }
    },
};
</script>
  
<style scoped>
.artwork-image {
    width: 100px;
    /* Adjust as needed */
    height: 100px;
    /* Adjust as needed */
    margin-right: 10px;
}
</style>
  