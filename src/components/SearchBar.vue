<template>
  <div class="search-wrapper">
    <input type="text" v-model="search" @input="handleSearch" placeholder="Procurar um serviço..." class="search-input"/>
  </div>
</template>




<style scoped>
.search-wrapper {
  margin-top: 7%; /* Adjust margin-top as needed */

  margin-right: 10%;
  display: flex; /* Use flexbox */
  justify-content: flex-end; /* Align items to the right */
}

.search-input {
  padding: 8px 12px; /* Add padding for better visual appearance */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 4px; /* Add border radius for rounded corners */
  font-size: 14px; /* Adjust font size */
  width: 20%; /* Make the input narrower */
  box-sizing: border-box; /* Ensure padding and border don't increase width */
}

/* Optional: Add hover and focus styles */
.search-input:hover,
.search-input:focus {
  border-color: #999; /* Darken border color on hover/focus */
}
</style>


<script>
export default {
  data() {
    return {
      search: '' // Initialize search string
    };
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.search.trim()); // Emit search event with trimmed search query
    }
  }
};
</script>
