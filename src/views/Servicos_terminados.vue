<template>
  <div>
    <logoButton/>
    <logoutButton/>
    <searchBar @search="handleSearch"/>
    <backButton/>
    <h1>Lista de Serviços Terminados</h1>

        <!-- Global Chat Button -->
    <button @click="toggleChat" class="chat-button">Chat</button>
    <globalChat v-if="showChat" @update:show="showChat = $event" />

    <!-- Use flexbox to display tables side by side -->
    <div class="table-container">

      <table class="spacing-table">
        <thead>
          <tr>
            <th>#ID</th>
          <th>Serviço</th>
          <th>Matricula</th>
          <th>Duração (min)</th>
          <th>Data de fim</th>
          <th>Ver Serviços</th>

          </tr>
        </thead>
        <tbody>
      <tr v-for="item in paginatedServices" :key="item.id">
        <td>{{ item.id }}</td>
        <td v-if="item.servicoDefinition && item.servicoDefinition.length > 0">{{ item.servicoDefinition[0].descr }}</td>
        <td v-else>No servicoDefinition available</td>
        <td>{{ item.vehicleId }}</td>
        <td>{{ formatElapsedTime(item.elapsedTimeSeconds) }}</td>     
        <td>{{item.dataFim}}</td>
        <td><a :href="`/consulta/servico/${item.id}`">Consultar Serviço</a></td>
      </tr>
    </tbody>
      </table>
  </div>
</div>
  <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1"><</button>
      <span>
        <!-- Iterar sobre a lista de números das páginas -->
        <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)" :class="{ active: currentPage === pageNumber }">{{ pageNumber }}</button>
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages">></button>
    </div>
</template>



<script>
import axios from 'axios';

import logoButton from '../components/LogoButton.vue';
import logoutButton from '../components/LogoutButton.vue';
import searchBar from '../components/SearchBar.vue';
import backButton from '../components/BackButton.vue'
import GlobalChat from '../components/GlobalChat.vue';
export default {
  components: {
  logoButton,
  logoutButton,
  searchBar,
  backButton,
  GlobalChat
},
data() {
  return {
    services: [],
    filteredServices: [],
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 3,
    showChat: false, 
  };
},
mounted() {
  this.fetchServices()
},
computed: {
    // Computed property to determine which list of services to display
    displayServices() {
      return this.searchQuery ? this.filteredServices : this.services;
    },
    totalPages() {
      return Math.ceil(this.displayServices.length / this.itemsPerPage);
    },
    paginatedServices() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.displayServices.slice(startIndex, endIndex);
    }
  },
methods: {
  fetchServices() {
    axios.get('http://localhost:3000/services')
    .then(response => {
      this.services = response.data.filter(servico => servico.estado === 'realizado');

      this.services.sort((a, b) => {
        if (a.agendamento === 'programado' && b.agendamento === 'filaDeEspera') {
          return -1; // 'programado' comes before 'nafila'
        } else if (a.agendamento === 'filaDeEspera' && b.agendamento === 'programado') {
          return 1; // 'nafila' comes after 'programado'
        } else {
          return 0; // No change in order if both have the same 'agendamento'
        }
      });

    for (const servico of this.services) { // Use for...of loop to iterate over array elements
      axios.get('http://localhost:3000/service-definitions?id=' + servico['service-definitionId'])
        .then(response => {
          // Assuming additional data is stored in 'data' property of response
          servico.servicoDefinition = response.data;
          console.log(servico.additionalData);
        })
        .catch(error => {
          console.error('Error fetching service definitions:', error);
        });
    }
  })
  .catch(error => {
    console.error('Error fetching services:', error);
  });
  },
  prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  handleSearch(query) {
      this.searchQuery = query;
      let lista = []; // Initialize an empty array to store matching services
      this.services.forEach(service => {
      // Check if either the id or agendamento of the service matches the search query
      if (service.id.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        service.agendamento.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        service.vehicleId.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        service.servicoDefinition[0].descr.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        service.servicoDefinition[0].duração.toString().toLowerCase().includes(this.searchQuery.toLowerCase())) {
      lista.push(service); // Add the service to the lista array
    }
    });
    this.filteredServices = lista; // Assign the lista array to filteredServices
},
formatElapsedTime(elapsedTimeSeconds) {
      const minutes = Math.floor(elapsedTimeSeconds / 60);
      const seconds = elapsedTimeSeconds % 60;
      return `${minutes}m${seconds}s`;
    },
    toggleChat() {
      this.showChat = !this.showChat;
    },
}
}
</script>



<style scoped>
h1 {
    color: white;
    text-align: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 30px; /* Optional: Adjust margin-top as needed */
    font-size: 52px; /* Adjust font size as needed */

  }
  .table-container {
  min-height: 250px; /* Adjust as needed */
    /*A margin top é a da search bar*/
}
.spacing-table {
  font-family: 'Helvetica', 'Arial', sans-serif;
  font-size: 15px;
  border-collapse: separate;
  table-layout: fixed;
  width: 80%; /* Adjusted width to 100% */
   margin-left: auto; /* Center the table horizontally */
  margin-right: auto; 
  border: none;
  border-spacing: 0 10px;
  
}

.spacing-table th {
  padding: 5px 15px;
  border: none; /* Remove borders */
  background-color: rgb(255, 255, 255);
}
.spacing-table th:first-child{
  border-radius: 15px 0 0 15px;
}

.spacing-table th:last-child{
  border-radius: 0 15px 15px 0;
}

.spacing-table td {
  padding: 5px 15px;
  border: none; /* Remove borders */
  background-color: rgb(255,255,255,0.75);
  color: rgb(0, 0, 0);
}

.spacing-table tr {
  border-radius: 15px 0 0 15px;
  background-color: rgba(255, 255, 255, 0.75);
}
.spacing-table td:first-child {
  border-radius: 15px 0 0 15px;
}

.spacing-table td:last-child {
  border-radius: 15px 15px 15px 15px;
  border-radius: 0 15px 15px 0;
  background-color: black;
}

/* Style for the narrower table */
.narrower-table {
  width: 30%; /* Adjust width as needed */
}
.spacing-table a {
  text-decoration: none; /* Remove underline */
  color: white; /* Set text color to white */
}
.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.pagination button.active {
  background-color: black;
  color: white; /* Para garantir que o texto seja visível */
}

.pagination button {
  margin: 0 5px;
}

.chat-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    /* ... */
  }
</style>