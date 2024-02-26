<template>
    <div class="search-bar">
      <input 
        type="text"
        v-model="searchTerm"
        @input="handleInput"
        placeholder="Suche..."/>
      <button @click="search">Suchen</button>
           <!-- Cart Icon -->
          <div class="cart-icon">
            <span>🛒</span>
          </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        searchTerm: ''
      };
    },
    methods: {
      handleInput() {
        // Hier können Sie bei jeder Eingabe Aktionen ausführen, wenn gewünscht
      },
      search() {
        // Hier können Sie die Suchfunktion implementieren
        // Verwenden Sie this.searchTerm, um auf den Suchbegriff zuzugreifen
        console.log('Suche nach:', this.searchTerm);
      }
    }
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .search-bar input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-bar button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-bar button:hover {
    background-color: #0056b3;
  }
  </style>