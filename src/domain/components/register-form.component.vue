<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const name = ref('')
    const dni = ref('')
    const birthdate = ref('')
    const email = ref('')
    const password = ref('')
    const nameError = ref(false)
    const dniError = ref(false)
    const birthdateError = ref(false)
    const emailError = ref(false)
    const passwordError = ref(false)

    const checkInputs = (input) => {
      if (input === 'name') {
        nameError.value = name.value === ''
      } else if (input === 'dni') {
        dniError.value = dni.value === ''
      } else if (input === 'birthdate') {
        birthdateError.value = birthdate.value === ''
      } else if (input === 'email') {
        emailError.value = email.value === ''
      } else if (input === 'password') {
        passwordError.value = password.value === ''
      }
    }

    return { name, dni, birthdate, email, password, nameError, dniError, birthdateError, emailError, passwordError, checkInputs, router }
  }
}
</script>

<template>
  <form class="login-form">
    <h2 class="title-form">REGISTRO</h2>
    <div class="inputs-login">
      <div class="input-container">
        <pv-floatLabel>
          <pv-inputText id="name" v-model="name" @blur="() => checkInputs('name')" />
          <label for="name">Nombre</label>
        </pv-floatLabel>
        <p v-if="nameError" class="error">Este campo es requerido*</p>
      </div>

      <div class="input-container">
        <pv-floatLabel>
          <pv-inputText id="dni" v-model="dni" @blur="() => checkInputs('dni')" />
          <label for="dni">DNI</label>
        </pv-floatLabel>
        <p v-if="dniError" class="error">Este campo es requerido*</p>
      </div>

      <div class="input-container">
        <pv-floatLabel>
          <pv-inputText id="birthdate" v-model="birthdate" @blur="() => checkInputs('birthdate')" />
          <label for="birthdate">Fecha de nacimiento</label>
        </pv-floatLabel>
        <p v-if="birthdateError" class="error">Este campo es requerido*</p>
      </div>

      <div class="input-container">
        <pv-floatLabel>
          <pv-inputText id="email" v-model="email" @blur="() => checkInputs('email')" />
          <label for="email">Correo</label>
        </pv-floatLabel>
        <p v-if="emailError" class="error">Este campo es requerido*</p>
      </div>

      <div class="input-container">
        <pv-floatLabel>
          <pv-inputText id="password" v-model="password" @blur="() => checkInputs('password')" />
          <label for="password">Contraseña</label>
        </pv-floatLabel>
        <p v-if="passwordError" class="error">Este campo es requerido*</p>
      </div>
    </div>
    <pv-button>Registrarme</pv-button>
    <div class="links">
      <a @click="router.push('/login')">Ya tengo una cuenta</a>
    </div>
  </form>
</template>

<style scoped>
.title-form{
  color: #333333;
  font-size: 2em;
  font-weight: bold;
  line-height: 160%;
  margin-top:1.8em ;
}
.login-form{
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
}
.inputs-login{
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-bottom: 2em;
}
.input-container{
  position: relative;
}
.links{
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  margin-top: 1.5em;
}
.error {
  color: red;
  font-size: 0.7em;
  position: absolute;
  top: 70%;
  margin-left: 1.7em;
}
.p-inputtext{
  background-color: #ffffff;
  border-radius: 20px;
  width: 26em;
  color: #333333;
  height: 2.5em;
  border-color: #D1D1D1;
  padding: 1em;
}
.p-inputtext:focus {
  border-color: #4A79F7 !important;
}
.input-container:focus-within label {
  color: #4A79F7;
}
.input-container label {
  margin-left: 0.7em;
}
.p-button{
  background-color: #4A79F7;
  color: white;
  border-radius: 15px;
  border-color: #4A79F7;
  width: 11em;
}
.p-button:hover{
  background-color: #789cff !important;
  color: white !important;
  border-color: #789cff !important;
}
a {
  font-weight: bold;
  color: #4A79F7;
  text-decoration: underline;
  cursor: pointer;
}

a:hover {
  color: #6c94ff;
  text-decoration: none;
}
</style>