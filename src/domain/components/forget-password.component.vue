<script >
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const repeatpassword = ref('')
    const emailError = ref(false)
    const passwordError = ref(false)
    const repeatpasswordError = ref(false)

    const checkInputs = (input) => {
      if (input === 'email') {
        emailError.value = email.value === ''
      } else if (input === 'password') {
        passwordError.value = password.value === ''
      } else if (input === 'repeatpassword') {
        repeatpasswordError.value = repeatpassword.value === ''
      }
    }

    return { email, password,repeatpassword, emailError, passwordError,repeatpasswordError, checkInputs, router }
  }
}
</script>

<template>
  <form class="login-form">
    <h2 class="title-form">Actualizar Contraseña</h2>
    <div class="inputs-login">
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

      <div class="input-container">
        <pv-floatLabel>
          <pv-inputText id="repeatpassword" v-model="repeatpassword" @blur="() => checkInputs('repeatpassword')" />
          <label for="repeatpassword">Repita contraseña</label>
        </pv-floatLabel>
        <p v-if="repeatpasswordError" class="error">Este campo es requerido*</p>
      </div>
    </div>
    <pv-button>Actualizar</pv-button>
    <div class="links">
      <a @click="router.push('/login')">Iniciar Sesión</a>
      <a @click="router.push('/register')">Crear Cuenta</a>
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
  margin-top: 2em;
}
.error {
  color: red;
  font-size: 0.7em;
  position: absolute;
  top: 70%;
  margin-left: 0.5em;
}
.p-inputtext{
  background-color: #F7F5EF;
  border-radius: 20px;
  width: 26em;
  color: #333333;
  height: 2.5em;
  border-color: #D1D1D1;
}
.p-inputtext:focus {
  border-color: #4A79F7 !important;
}
.input-container:focus-within label {
  color: #4A79F7;
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
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  color: #4A79F7;
  text-decoration: underline;
}
</style>