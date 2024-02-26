<template>
    <div>
      <h1>Shopping Cart</h1>
      <table class="table table-bordered">
        <!-- ... (unchanged) ... -->
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      shoppingCart: Array, // Pass the shopping cart as a prop
    },
    computed: {
      totalPrice: function () {
        return this.shoppingCart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
      },
    },
    methods: {
      deleteItem(index) {
        // Implement the logic to delete an item from the shopping cart
        // You might want to use a centralized state management like Vuex for the shopping cart
        // For simplicity, I'll use a simple event here to emit the deleteItem event to the parent
        this.$emit('deleteItem', index);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your styling for ShoppingCart goes here */
  </style>
  