<template>
    <div style="position: relative; left: 0%; vertical-align: middle; margin-bottom: 5%;">
    <button @click="goToURL" class="custom-button">
              <div class="container">
                  <div class="buttonText">
                      {{text}}
                  </div>
                  <div class="arrow-container">
                      <img src="../../public/arrow.svg" alt="Icon" />
                  </div>
              </div>
          </button>
    </div>
</template>

<script>

export default {
    props: {
        url: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    methods: {
        goToURL() {
            this.$router.push(this.url)
        }
    }
}

</script>

<style scoped>

.custom-button {
    padding: 10px; /* Adjust padding as needed */
    height: 100%; /* Adjust button height as needed */
    width: 100%;
    border-top-right-radius: 70px; /* Adjust border radius to half of button height */
    border-bottom-right-radius: 70px; /* Adjust border radius to half of button height */
    border: none;
    background-color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 25px;
}

.buttonText {
    color: black;
    font-weight: bold;
    font-size: 45px; /* Adjust font size as needed */
}

.arrow-container {
    margin-left: 10px; /* Adjust spacing between text and arrow */
}

button:hover {
  background-color: white;
  stroke: black;
}
</style>