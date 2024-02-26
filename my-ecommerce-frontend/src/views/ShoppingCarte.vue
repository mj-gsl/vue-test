<template>
    <div>
        <h1>Shopping List</h1>
        <ul>
            <li v-for="(item, index) in shoppingList" :key="index">
                <img :src="item.image" :alt="item.name" class="artwork-image" />
                <span>{{ item.name }} - Quantity: {{ item.quantity }}</span>
                <button @click="removeItem(index)">
                    <i class="fas fa-trash-alt"></i> <!-- Assuming you are using Font Awesome -->
                </button>
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
    methods: {
        removeItem(index) {
            this.shoppingList.splice(index, 1);
            this.saveShoppingList();
        },
        saveShoppingList() {
            sessionStorage.setItem("shoppingList", JSON.stringify(this.shoppingList));
        },
    },
};
</script>
  
<style scoped>
.artwork-image {
    width: 50px;
    /* Adjust as needed */
    height: 50px;
    /* Adjust as needed */
    margin-right: 10px;
}

button {
    background: none;
    border: none;
    cursor: pointer;
}
</style>
  