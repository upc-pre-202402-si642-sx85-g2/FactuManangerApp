<script>
import {onMounted, ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UserService } from '../../services/user.service.js';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const newPassword = ref('');
    const repeatPassword = ref('');
    const repeatPasswordError = ref(false);
    const passwordError = ref(false);
    const userService = new UserService();
    const token = ref('');

    onMounted(() => {
      token.value = route.query.token;
      console.log('token:', token.value); // Log the token to verify
    });
    const checkInputs = (input) => {
      if (input === 'password') {
        passwordError.value = newPassword.value === '';
      } else if (input === 'repeatPassword') {
        repeatPasswordError.value = repeatPassword.value === '' || repeatPassword.value !== password.value;
      }
    };

    const handleSubmit = async () => {
      checkInputs('password');
      checkInputs('repeatPassword');
      if (!passwordError.value && !repeatPasswordError.value) {
        try {
          console.log('token:', token.value); // Log the token to verify
          if (token) {
            await userService.resetPassword(token.value,newPassword.value);
            alert('Password reset successfully');
          } else {
            console.error('Token is undefined');
          }
        } catch (error) {
          console.error('Error resetting password:', error);
        }
      }
    };

    return { newPassword, passwordError, repeatPassword, repeatPasswordError, checkInputs, handleSubmit, router };
  }
};
</script>

<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <h2 class="title-form">Actualizar Contraseña</h2>
    <div class="inputs-login">
      <div class="input-container">
        <pv-floatLabel>
          <pv-inputText id="password" v-model="newPassword" @blur="() => checkInputs('password')" />
          <label for="password">Contraseña</label>
        </pv-floatLabel>
        <p v-if="passwordError" class="error">Este campo es requerido*</p>
      </div>
      <div class="input-container">
        <pv-floatLabel>
          <pv-inputText id="repeatPassword" v-model="repeatPassword" @blur="() => checkInputs('repeatPassword')" />
          <label for="repeatPassword">Repetir Contraseña</label>
        </pv-floatLabel>
        <p v-if="repeatPasswordError" class="error">Este campo es requerido*</p>
      </div>
    </div>
    <pv-button type="submit">Enviar</pv-button>
    <div class="links">
      <a @click="router.push('/login')">Iniciar Sesión</a>
      <a @click="router.push('/register')">Crear Cuenta</a>
    </div>
  </form>
</template>

<style scoped>
.title-form {
  color: #333333;
  font-size: 2em;
  font-weight: bold;
  line-height: 160%;
  margin-top: 1.8em;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
}
.inputs-login {
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-bottom: 2em;
}
.input-container {
  position: relative;
}
.links {
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
.p-inputtext {
  background-color: #ffffff;
  border-radius: 20px;
  width: 26em;
  color: #333333;
  height: 2.5em;
  border-color: #d1d1d1;
  padding: 1em;
}
.p-inputtext:focus {
  border-color: #4a79f7 !important;
}
.input-container:focus-within label {
  color: #4a79f7;
}
.input-container label {
  margin-left: 0.7em;
}
.p-button {
  background-color: #4a79f7;
  color: white;
  border-radius: 15px;
  border-color: #4a79f7;
  width: 11em;
}
.p-button:hover {
  background-color: #789cff !important;
  color: white !important;
  border-color: #789cff !important;
}
a {
  font-weight: bold;
  color: #4a79f7;
  text-decoration: underline;
  cursor: pointer;
}
a:hover {
  color: #6c94ff;
  text-decoration: none;
}
</style>