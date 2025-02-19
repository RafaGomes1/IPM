<template>
  <transition name="slide-fade">
    <div>
      <div class="chat-overlay" v-if="showChat"></div>
      <div class="chat-container" v-if="showChat">
        <header class="chat-header">
          <h2>Chat Geral</h2>
          <button class="back-button" @click="toggleChat">Voltar</button>
        </header>
        <ul class="chat-messages">
          <li v-for="message in messages" :key="message.id" class="message">
            <small>{{ message.date }}</small> <strong>{{ message.username }}</strong>: {{ message.text }}
          </li>
        </ul>
        <footer class="chat-footer">
          <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Escreva aqui a mensagem que pretende enviar.">
          <button @click="sendMessage">Enviar Mensagem</button>
        </footer>
      </div>
    </div>
  </transition>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      showChat: true,
      messages: [],
      newMessage: '',
      user: localStorage.getItem('nome')  // busca o user à variavel local
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    toggleChat() {
      this.$emit('update:show', false);  // manda um evento para as views que chamam esta componente
    },
    fetchMessages() {
      axios.get('http://localhost:3000/messages')
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the messages:', error);
        });
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const now = new Date();
        const formattedDate = `[${now.getFullYear()}/${
    (now.getMonth() + 1).toString().padStart(2, '0')}/${
    now.getDate().toString().padStart(2, '0')} ${
    now.getHours().toString().padStart(2, '0')}:${
    now.getMinutes().toString().padStart(2, '0')}:${
    now.getSeconds().toString().padStart(2, '0')}]`;
        const message = {
          username: this.user,
          text: this.newMessage,
          date: formattedDate  
        };
        axios.post('http://localhost:3000/messages', message)
          .then(() => {
            this.messages.push({...message, id: this.messages.length + 1}); 
            this.newMessage = '';
          })
          .catch(error => {
            console.error('There was an error sending the message:', error);
          });
      }
    }
  }
};

</script>

<style scoped>
.chat-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  height: 70%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  background-color: #0056b3; /* Blue background for the whole container */
  padding: 20px; /* Adds padding inside the container, showing the blue background */
}

.chat-header, .chat-footer {
  padding: 10px;
  background-color: #0056b3; /* Darker blue for header and footer */
  color: white;
  text-align: center;
}

.back-button {
  position: absolute;
  right: 10px; /* Ensure it's 10px from the right */
  top: 10px; /* Adjust this if needed */
  transform: translateY(50%); /* Center it vertically relative to its height */
  background-color: white;
  color: #0056b3;
  border: none;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 20px; /* Fully rounded sides */
  font-weight: bold;
  text-decoration: none;
  z-index: 10; /* Make sure it's on top of other elements */
}

.back-button::after {
  content: ' \2190';
  display: inline-block;
  margin-left: 5px;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  background-color: white; /* White background for messages */
  padding: 10px;
  border-radius: 8px; /* Ensures the white panel also has rounded corners */
}

.message {
  margin-bottom: -10px;
  text-align: left;
  max-width: 100%; /* Allows using full width of the chat message area */
  word-wrap: break-word;
}

.message strong, .message small {
  white-space: nowrap;
}

.chat-footer {
  background-color: #0056b3; /* Keeps the footer blue */
  color: white; /* Ensures text in footer is white */
}

.chat-footer input, .chat-footer button {
  width: 100%;
}
</style>


