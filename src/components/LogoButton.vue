<template>
  <!-- Replace the button with an image -->
  <img class="login-image" src="../../public/logo.png" @click="goHome" style="cursor: pointer;" alt="Login">
</template>

<script>
export default {
  props: {
    enableClick: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goHome() {
      if (this.enableClick) {
      this.$router.push('/consulta');
      }      
    }
  }
}
</script>

<style>
.login-image {
  cursor: pointer;
  border-radius: 8px;
  width: 160px;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  margin: 20px; /* Adjust as needed for spacing */
}
</style>