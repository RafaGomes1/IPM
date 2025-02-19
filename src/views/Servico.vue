<template>
  <div>

    <!-- Se o estado é iniciado o botao do logo deixa de ser clicavel e desaparece o logout e o back-->
    <div v-if="service && service.estado !== 'iniciado'">
      <logoButton />
    </div>
    <div v-else>
      <logoButton :enableClick="false" />
    </div>
    <logoutButton v-if="service && service.estado !== 'iniciado'" />
    <backButton v-if="service && service.estado !== 'iniciado'" />

    <!-- Add a white rectangular div behind the text -->

    <googleButton :link="googleLink">Google it!</googleButton>

    <IniciarServico :visible="showConfirmation" @close="showConfirmation = false">
      <div style="position: relative; width: 400px; height: 200px; background-color: rgba(255, 255, 255, 0.8);">
        <h2>Pretende mesmo iniciar o serviço?</h2>
        <button @click="confirmaServico" class="green-button">Sim</button>
        <button @click="showConfirmation = false" class="black-button">Voltar</button>
      </div>
    </IniciarServico>

    <SuspenderServico :visible="showSuspenderConfirmation" @close="showSuspenderConfirmation = false">
      <h2>Qual o motivo da suspensão do serviço?</h2>
      <div class="linha">
    <div class="checkboxes">
    <!-- Checkboxes -->
    <div v-for="(option, index) in checkboxOptions" :key="index">
      <input type="checkbox" :id="'option' + index" v-model="checkedOptions[index]" @change="updateRazaoSuspensao()">
      <label :for="'option' + index">{{ option }}</label>
    </div>
    </div>
    <!-- Textbox for manual input -->
    <div class="tBox">
    <span class="bold-text">Indique outro motivo:</span><br>
    <textarea v-model="otherReason" placeholder="Indique o motivo para o serviço não estar a ser realizado de imediato." @input="updateRazaoSuspensao()" class="custom-textarea"></textarea>
  </div>
  </div>
    <div style="position: relative; width: 400px; height: 200px; background-color: rgba(255, 255, 255, 0.8);">
    
    <button @click="confirmaSuspenderServico" class="red-button">Suspender</button>
    <button @click="showSuspenderConfirmation = false" class="black-button2">Voltar</button>
    
  </div>

  
    </SuspenderServico>


    <div class="centered-div">
      <div class="top-text">
        <span class="norm-text">{{ formattedElapsedTime }} </span>
      </div>
      <div class="left-content">
        <div class="top-content">
          <div v-if="service && serviceDefinition">
            <h class="norm-text"><span class="bold-text"> ID Serviço:</span> {{ service.id }}</h><br>
            <h class="norm-text"> <span class="bold-text"> Estado:</span> {{ service.estado }}</h><br>

            <h class="norm-text"> <span class="bold-text"> Tipo de serviço:</span> {{ serviceDefinition[0].descr }}</h>
            <br>
            <h class="norm-text"> <span class="bold-text"> Duração prevista:</span> {{ serviceDefinition[0].duração }}
            </h><br>
            <h class="norm-text" v-if="service.data"> <span class="bold-text"> Data agendada:</span>{{ service.data.hora
              }}:{{ service.data.minutos }}h {{ service.data.dia }}/{{ service.data.mes }}/{{ service.data.ano }}</h>
            <h v-else><span class="bold-text"> Data agendada:</span>N.A</h>
            <br>
            <span class="bold-text"> Descrição:</span>
            <div class="bottom-content">
              <h class="norm-text">{{ service.descrição }} </h><br>

            </div>
          </div>
          <div v-else>
            <p>Loading...</p>
          </div>
        </div>

        <div v-if="service && service.estado === 'iniciado'">
          <div class="buttons-container">
            <button @click="suspenderServico" class="button">Suspender serviço</button>
            <button @click="terminarServico" class="button">Terminar serviço</button>
          </div>
        </div>
        <div v-else-if="service && service.estado === 'parado'">
          <div class="buttons-container">
            <button @click="iniciarServico" class="button">Iniciar serviço</button>
            <button @click="terminarServico" class="button">Terminar serviço</button>
          </div>
        </div>
        <div v-else-if="service && (service.estado === 'programado' || service.estado === 'nafila')">
          <button @click="iniciarServico" class="widebutton">Iniciar serviço</button>
        </div>
      </div>



      <div class="line"></div>





      <div class="right-content">
        <div v-if="service && serviceDefinition && veiculo && cliente">
          <h> <span class="bold-text"> Cliente:</span></h><br>
          <h class="norm-text"><img class="icon" src="../../public/people.svg" alt="icon"><span class="bold-text">
              Nome:</span> {{ cliente[0].nome }}</h><br>
          <h class="norm-text"><img class="icon" src="../../public/phone.svg" alt="icon"> <span class="bold-text">
              Contacto:</span> {{ cliente[0].telefone }}</h><br>
          <h class="norm-text"><img class="icon" src="../../public/at.svg" alt="icon"> <span class="bold-text">
              E-mail:</span> {{ cliente[0].email }}</h><br>

          <h class="norm-text"> <span class="bold-text"> Veículo:</span></h><br>
          <h class="norm-text"><img class="icon" src="../../public/gears.svg" alt="icon"> <span class="bold-text"> Tipo
              Motor:</span> {{ veiculo[0]['vehicle-typeId'] }}</h><br>
          <h class="norm-text"><img class="icon" src="../../public/km.svg" alt="icon"> <span class="bold-text">
              Quilometragem:</span> {{ veiculo[0].kms }} km</h><br>
          <h class="norm-text"><img class="icon" src="../../public/cc.svg" alt="icon"> <span class="bold-text">
              Cilindrada:</span> {{ veiculo[0].cilindrada }}cc</h><br>
          <h class="norm-text"><img class="icon" src="../../public/matrs.svg" alt="icon"> <span class="bold-text">
              Matrícula:</span> {{ service.vehicleId }}</h><br>
        </div>
        <div v-else>
          <p>Loading..</p>
        </div>
        <button @click="consultaHistorico" class="widebutton">Consultar Histórico de manutenção</button>


      </div>
    </div>
  </div>
</template>

<style scoped>
.tBox {
  height: 100px; /* Set the height to 100px */
  text-align: left;
}

.custom-textarea {
  width: 100%; /* Set the width of the textarea to 100% of the parent div */
  height: 80%; /* Set the height of the textarea to 100% of its container */
  padding: 10px; /* Add padding to the textarea */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  overflow-y: auto; /* Enable vertical scrollbar when needed */
}
.linha {
  border: 2px solid black; /* You can adjust the thickness (2px) and color (black) as needed */
  padding: 20px;
}
.checkboxes {
  text-align: left;
}
.icon {
  width: 20px;
  height: 20px;
}

.bold-text {
  font-weight: bold;
  font-size: 20px;

}

.norm-text {
  font-size: 20px;
}

.centered-div {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border: 2px solid black;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  /* Adjust the percentage value as needed */
  max-width: 70%;
}

.top-text {
  position: relative;
  top: -70px;
  /* Adjust as needed to place the text where you want */
  left: 90%;
  transform: translateX(-50%);
  color: #000000;
  padding: 10px;
  font-size: 10px;
}

@media screen and (min-width: 2000px) {
  .centered-div {
    max-width: 1600px;
    /* Set a maximum width for larger screens */
  }

  .norm-text {
    font-size: 44px;
    /* Increase font size for larger screens */
  }

  .bold-text {
    font-size: 44px;
  }

  .icon {
    width: 30px;
    /* Adjust icon width for larger screens */
    height: 30px;
    /* Adjust icon height for larger screens */
  }

  .top-text {
    top: -90px;
  }
}

.left-content,
.right-content {
  width: 50%;
  float: left;
  box-sizing: border-box;
}

.right-content {
  padding-left: 20px;
  /* Add some space between the two halves */
  text-align: left;
  /* Align text to the left */
}

.left-content {
  text-align: left;
  /* Align text to the left */
}

.line {
  position: absolute;
  top: 10px;
  /* Space from the top */
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: calc(100% - 20px);
  /* Height minus the top and bottom space */
  background-color: black;
}

.top-content {
  padding: 10px;
  /* Add some padding */
}

.bottom-content {
  margin-top: 10px;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  word-wrap: break-word;
  overflow-y: auto;
  max-height: 200px;
  max-width: 100%;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
}

.button {
  width: calc(50% - 5px);
  padding: 10px;
  border: none;
  background-color: #000000;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.widebutton {
  width: 80%;
  padding: 10px;
  border: none;
  background-color: #000000;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
  font-size: 18px
}

.button:hover {
  background-color: #0056b3;
  /* Example hover color */
}

.widebutton:hover {
  background-color: #0056b3;
  /* Example hover color */
}

.green-button {
  background-color: green;
  color: white;
  position: absolute;
  right: 125px;
  top: 60px;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
}

.red-button {
  background-color: rgb(255, 0, 0);
  color: white;
  position: absolute;
  right: 0px;
  top: 60px;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
}

.black-button2 {
  background-color: black;
  color: white;
  position: absolute;
  left: 70px;
  top: 60px;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
}

.black-button {
  background-color: black;
  color: white;
  position: absolute;
  left: 125px;
  top: 130px;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
}


</style>



<script>
import BackButton from '@/components/BackButton.vue';
import logoButton from '../components/LogoButton.vue';
import logoutButton from '../components/LogoutButton.vue';
import googleButton from '../components/GoogleButton.vue';
import axios from 'axios';
import LogoButton from '../components/LogoButton.vue';
import IniciarServico from '@/components/IniciarServico.vue';
import SuspenderServico from '../components/SuspenderServico.vue'

export default {
  components: {
    BackButton,
    logoButton,
    logoutButton,
    googleButton,
    IniciarServico,
    SuspenderServico
  },
  data() {
    return {
      service: null,
      serviceDefinition: null,
      veiculo: null,
      cliente: null,
      startTime: null,
      elapsedTimeInSeconds: 0,
      timerInterval: null,
      timerRunning: false,
      showConfirmation: false,
      showSuspenderConfirmation: false,
      checkboxOptions: ["Peças ausentes ou incorretas.", "Complicações inesperadas.", "Necessidade de ferramentas ou equipamentos adicionais.", "Falta de conhecimento ou habilidades necessárias", "Priorização de outros serviços.","Revisão das diretrizes do fabricante.","Duração do serviço insuficiente.","Emergências pessoais ou problemas de saúde."],
      checkedOptions: [false, false, false, false, false,false, false,false],
      otherReason: "",
      razaoSuspensao: ""
    };
  },

  created() {
    const serviceId = this.$route.params.id;
    this.fetchService(serviceId);
  },
  computed: {
    googleLink() {
      if (this.serviceDefinition && this.serviceDefinition.length > 0) {
        const descr = encodeURIComponent(this.serviceDefinition[0].descr);
        return `https://www.google.com/search?q=${descr}`;
      } else {
        return 'https://google.com';
      }
    },
    formattedElapsedTime() {
      const minutes = Math.floor(this.elapsedTimeInSeconds / 60);
      const seconds = this.elapsedTimeInSeconds % 60;
      const formattedMinutes = String(minutes).padStart(3, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
      return `${formattedMinutes}m:${formattedSeconds}s`;
    }
  },
  methods: {
    fetchService(serviceId) {
      axios.get(`http://localhost:3000/services/${serviceId}`)
        .then(response => {
          this.service = response.data;
          if (this.service.elapsedTimeSeconds) {
            this.elapsedTimeInSeconds = this.service.elapsedTimeSeconds;
          }
          axios.get(`http://localhost:3000/service-definitions?id=${this.service['service-definitionId']}`)
            .then(response => {
              this.serviceDefinition = response.data;
              axios.get(`http://localhost:3000/vehicles?id=${this.service.vehicleId}`)
                .then(response => {
                  this.veiculo = response.data;
                  axios.get(`http://localhost:3000/clients?id=${this.veiculo[0].clientId}`)
                    .then(response => {
                      this.cliente = response.data;
                    })
                })
            })
            .catch(error => {
              console.error('Error fetching service definitions:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching service:', error);
        });
    },
    updateRazaoSuspensao() {
  // Filter the checked options and join them into a comma-separated string
  const selectedOptions = this.checkboxOptions.filter((option, index) => this.checkedOptions[index]).join(", ");
  
  // Add manually entered reason if it's not empty
  if (this.otherReason.trim() !== "") {
    this.razaoSuspensao = selectedOptions !== "" ? `${selectedOptions}, ${this.otherReason.trim()}` : this.otherReason.trim();
  } else {
    this.razaoSuspensao = selectedOptions;
  }
},

    updateElapsedTime() {
      if (this.startTime && this.timerRunning) {
        const currentTime = Date.now();
        const elapsedMilliseconds = currentTime - this.startTime;
        this.elapsedTimeInSeconds = Math.floor(elapsedMilliseconds / 1000);
      }
    },
    startTimer() {
      if (!this.timerRunning) {
        this.startTime = Date.now() - (this.elapsedTimeInSeconds * 1000);
        this.timerInterval = setInterval(this.updateElapsedTime, 1000);
        this.timerRunning = true;
      }
    },
    stopTimer() {
      if (this.timerRunning) {
        clearInterval(this.timerInterval);
        this.updateServiceElapsedTime().then(() => {
          this.timerRunning = false;
          this.changeEstado("parado");
        });
      }
    },

    updateServiceElapsedTime() {
      const updatedData = {
        elapsedTimeSeconds: this.elapsedTimeInSeconds
      };
      return axios.patch(`http://localhost:3000/services/${this.service.id}`, updatedData)
        .then(response => {
          console.log('Elapsed time updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating elapsed time:', error);
        });
    },

    changeEstado(state) {
      const updatedData = {
        estado: state
      };
      axios.patch(`http://localhost:3000/services/${this.service.id}`, updatedData)
        .then(response => {
          console.log('Estado mudado para iniciado successfully:', response.data);
          this.fetchService(this.service.id);
        })
        .catch(error => {
          console.error('Error mudando estado:', error);
        });
    },
    voltar() {
      this.$router.go(-1);
    },

    terminarServico() {
      if (this.service.estado === "iniciado") {
        this.stopTimer();
        this.updateServiceElapsedTime().then(() => {
          this.adicionarDataFim().then(() => {
            this.changeEstado("realizado");
          });
        });
      } else {
        this.updateServiceElapsedTime().then(() => {
          this.adicionarDataFim().then(() => {
            this.changeEstado("realizado");
          });
        });
      }
    },
    suspenderServico() {
      // When the "suspenderServico" button is clicked, show the suspenderServico popup
      this.showSuspenderConfirmation = true;
    },

    // This method will be called when the user confirms suspending the service
    confirmaSuspenderServico() {
      if (!this.razaoSuspensao.trim()) {
    alert('É obrigatório preencher pelo menos uma razão para suspender o serviço.');
    return; // Stop execution if no reason is filled in
  }
      this.stopTimer();  // Stop the timer
      this.changeEstado("parado");  // Change the service state to "parado"
      console.log(this.razaoSuspensao);
      this.showSuspenderConfirmation = false;  // Hide the suspenderServico popup
      this.adicionaRazao();
      this.razaoSuspensao="";
      this.otherReason="",
      this.checkedOptions = this.checkedOptions.map(option => false);
    },
    adicionaRazao() {
  // Create an object with only the razao field
    const updatedData = {
    razao: this.razaoSuspensao
  };

  // Make a PATCH request to update the service data in the database with only the razao field
  return axios.patch(`http://localhost:3000/services/${this.service.id}`, updatedData)
    .then(response => {
      console.log('Razao adicionada com sucesso:', response.data);
    })
    .catch(error => {
      console.error('Erro ao adicionar razao:', error);
    });
},

    adicionarDataFim() {
      const dataAtual = new Date();
      const dia = String(dataAtual.getDate()).padStart(2, '0');
      const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
      const ano = dataAtual.getFullYear();
      const hora = String(dataAtual.getHours()).padStart(2, '0');
      const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
      const dataFimFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`;
      const updatedData = {
        dataFim: dataFimFormatada
      };
      return axios.patch(`http://localhost:3000/services/${this.service.id}`, updatedData)
        .then(response => {
          console.log('Data de fim adicionada com sucesso:', response.data);
        })
        .catch(error => {
          console.error('Erro ao adicionar data de fim:', error);
        });
    },

    iniciarServico() {
      this.showConfirmation = true;
    },
    confirmaServico() {
      this.startTimer();
      this.changeEstado("iniciado");
      this.showConfirmation = false;
    },
    consultaHistorico() {
      this.$router.push(`/consulta/servico/'${this.service.id}/historico/${this.service.vehicleId}`);

    }
  }
};
</script>
