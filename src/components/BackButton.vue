<template>
    <div class="search-wrapper">
      <button @click="goBack" class="back-button">Voltar</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
  </script>
  
  <style scoped>
.search-wrapper {
  margin-bottom: 20px; /* Add some bottom margin for spacing */
  display: flex; /* Use flexbox */
  justify-content: flex-start; /* Align items to the right */
}
.back-button {
  cursor: pointer;
  border-radius: 8px;
  width: 160px;
  height: auto;
  position: fixed;
  top: 70px;
  left: 0px;
  margin: 20px; /* Adjust as needed for spacing */
  padding: 10px;
  border: none;
  background-color: #000000;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.back-button:hover {
    background-color: #0056b3; /* Darker blue background color on hover */
  }
  </style>
