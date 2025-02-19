<template>
    <a :href="link" target="_blank" class="button-link">
      <slot></slot>
    </a>
  </template>
  
  <script>
  export default {
    props: {
      link: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .button-link {
  cursor: pointer;
  border-radius: 8px;
  width: 160px;
  height: auto;
  position: fixed;
  top: 50px;
  right: 0px;
  margin: 20px; /* Adjust as needed for spacing */
  padding: 10px;
  border: none;
  background-color: #000000;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  text-decoration: none;
  }
  
  .button-link:hover {
    background-color: #0056b3; /* Darker blue background color on hover */
  }
  </style>
  