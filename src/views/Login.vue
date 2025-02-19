
<template>
<logoButton/>
    <div class="main">
        <div class="circle-icon">
            <i class="fas fa-user"></i>
        </div>
        <form @submit.prevent="submitForm">
            <div class="credentials">
                <div class="input-wrapper">
                    <span class="input-icon-user"></span>
                    <input type="text" id="first" v-model="username" placeholder="Utilizador" required>
                </div>

                <div class="input-wrapper">
                    <span class="input-icon-pass"></span>
                    <input type="password" id="password" v-model="password" placeholder="Password" required>
                </div>
            </div>
 
            <div class="wrap">
                <button type="submit">Efetuar Login</button>
            </div>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
    
</template>

<style scoped>

 
.main {
    background-color: rgba(255, 255, 255, 0.80);
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 10px 20px;
    transition: transform 0.2s;
    width: 500px;
    height: 200px;
    text-align: center;
    position: relative;
}

.circle-icon {
    position: absolute;
    top: -75px; /* Ajuste conforme necessário */
    left: 50%;
    transform: translateX(-50%);
    background-image: url('../../public/icone.png');
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: white;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.circle-icon i {
    color: white;
}
 
h1 {
    color: #4CAF50;
}
 
label {
    display: block;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: left;
    color: #555;
    font-weight: bold;
}
 
 
input {
    display: block;
    width: 90%;
    margin-bottom: 15px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.input-icon-user{
    position: absolute;
    left: -35px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url('../../public/icone.png');
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    width: 35px;
    height: 35px;
    background-color: #D9D9D9;
}
.input-icon-pass {
    position: absolute;
    left: -35px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url('../../public/icone_password.png');
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    width: 35px;
    height: 35px;
    background-color: #D9D9D9;
}

.input-wrapper {
    position: relative;
    margin-left: 30px;
}

.input-wrapper input {
    width: calc(100% - 10px); /* Ajuste conforme necessário */
}

.input-icon-pass {
    top: calc(50%); /* Ajuste conforme necessário */
}
 
button {
    padding: 15px;
    border-radius: 50px;
    margin-bottom: 15px;
    border: none;
    color: black;
    cursor: pointer;
    background-color: white;
    width: 100%;
    font-size: 26px;
}

.credentials{
    margin-top: 80px;
}
 
.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.error {
    color: red;
}

</style>


<script>
import axios from 'axios';
import logoButton from '../components/LogoButton.vue';

export default {
    components: {
        logoButton
    },
    data() {
        return {
            username: '',
            password: '',
            error: ''
        };
    },
    methods: {
        async submitForm() {
            try {
                // Aqui depois se calhar metemos so o hash da password no json-server e aplicamos a mesma hash func à pass introduzida
                const response = await axios.get(`http://localhost:3000/mecanicos?username=${this.username}&password=${this.password}`);
                
                if (response.data.length === 0) {
                    // User does not exist or credentials are incorrect
                    this.error = 'Username ou password errados!';
                } else {
                    // User exists, you can navigate to another page or perform any other action
                    //Se tudo correu bem o token vai ser o codigo 200 (ok), fica guardado numa especie de var global
                    const token = response.status;
                
                    // Store the token in localStorage or Vuex store for future authenticated requests
                    localStorage.setItem('logintoken', token);
                    localStorage.setItem('nome',this.username);


                    this.$router.push('/consulta');
                }
            } catch (error) {
                console.error('Error:', error);
                this.error = 'An error occurred while processing your request';
            }
        }
    }
}
</script>