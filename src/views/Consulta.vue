<template>
    <logoButton/>
    <logoutButton/>
    <h1 class="tit">Bem-Vindo {{ this.nome }}!</h1>
    <div style="position: absolute; left: 0%; width: 60%; top: 20%;">
      <mainMenuButton url="/consulta/servicos_pendentes" text="Consultar lista de serviços Pendentes"/>
      <mainMenuButton url="/consulta/servicos_suspensos" text="Consultar lista de serviços Suspensos"/>
      <mainMenuButton url="/consulta/servicos_terminados" text="Consultar lista de serviços Terminados"/>
    </div>

</template>



<script>
import logoButton from '../components/LogoButton.vue';
import logoutButton from '../components/LogoutButton.vue';
import mainMenuButton from '@/components/mainMenuButton.vue';
export default {
    components: {
    logoButton,
    logoutButton,
    mainMenuButton
  },
  data() {
    return {
      nome: ''
    };
  },
  mounted() {
    // Retrieve the value from localStorage when the component is mounted
    this.nome = localStorage.getItem('nome');
  },
  methods: {
    goServicosPendentes() {
      this.$router.push('/consulta/servicos_pendentes');
    },
    goServicosSuspensos(){
        this.$router.push('/consulta/servicos_suspensos')
    },
    goServicosTerminados(){
        this.$router.push('/consulta/servicos_terminados')
    }
  }
}
</script>


<style scoped>

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

.arrow-icon {
    border: 1px solid green; /* Style your arrow icon */
}

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

.tit {
  color: white;
    text-align: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 30px; /* Optional: Adjust margin-top as needed */
    font-size: 52px; /* Adjust font size as needed */
}
</style>