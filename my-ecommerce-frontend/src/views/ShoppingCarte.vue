<template>
    <div>
        <h1>Shopping List</h1>
        <ul>
            <li v-for="(item, index) in shoppingList" :key="index">
                <img :src="item.image" :alt="item.name" class="artwork-image" />
                <span>{{ item.name }} - Quantity: {{ item.quantity }} * {{ item.price }} = {{ calculateTotalPrice(item) }} €</span>
                <button @click="removeItem(index)">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </li>
        </ul>
        <div>
            <h2>Total Price for all items: {{ calculateTotalPriceForAllItems() }} €</h2>
        </div>
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
        calculateTotalPrice(item) {
            const price = parseFloat(item.price);
            const quantity = parseInt(item.quantity);
            if (!isNaN(price) && !isNaN(quantity)) {
                return price * quantity;
            } else {
                return 0;
            }
        },
        calculateTotalPriceForAllItems() {
            return this.shoppingList.reduce((total, item) => total + this.calculateTotalPrice(item), 0);
        },
    },
};
</script>
  
<style scoped>
.artwork-image {
    width: 100px;
    height: 100px;
    margin-right: 20px;
}

button {
    background: none;
    border: none;
    cursor: pointer;
}
</style>
