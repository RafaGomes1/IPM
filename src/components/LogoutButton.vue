<!--Aqui tem de ser uma a tag senao depois ao usar nas outas paginas apanha o css dos outros buttons -->
<template>
  <button @click="logout" class="logout-button">
    <div class="container">
      <div class="buttonText">
        Terminar Sessão
      </div>
      <div>
        <img src="../../public/log-out-svgrepo-com.svg" alt="Logout Icon" class="logout-icon">
      </div>
    </div>
  </button>
        <!-- <a class="logout-button" @click="logout">Terminar Sessão
          <img src="../../public/log-out-svgrepo-com.svg" alt="Icon" class="logout-icon" />
        </a> -->
</template>

<script>


export default {

    methods: {
        logout() {
            //ao fazer logout tira se o token da tal var global
            localStorage.removeItem('logintoken');
            localStorage.removeItem('nome');

            // Redirect the user to the login page or any other page as needed
            this.$router.push('/');
        }
    }
}
</script>


<style scoped>
.logout-button {
  border: none;
  cursor: pointer;
  border-radius: 50px;
  width: auto;
  max-width: 200px;
  height: auto;
  position: fixed;
  top: 0;
  right: 0;
  margin: 20px; /* Adjust as needed for spacing */
  color: black;
  background-color: rgba(255 255 255 0.7);
  display: flex; /* Add flexbox display */
  align-items: center; /* Center vertically */
  justify-content: space-between; /* Place space between text and icon */
  text-decoration: none; /* Remove default link underline */
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1px;
}

/* Optional styles for button hover effect */
.logout-button:hover {
  background-color: rgb(213, 10, 10)
}

.buttonText {
    color: black;
    font-weight: bold;
    white-space: nowrap;
    font-size: 1.2rem; /* Adjust font size as needed */
}

.logout-icon {
  height: 2rem;
  width: auto;
}
</style>