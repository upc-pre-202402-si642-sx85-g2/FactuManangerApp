<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LoginForm from "../components/login-form.component.vue";
import RegisterForm from "../components/register-form.component.vue";
import ForgetPasswordForm from "../components/forget-password.component.vue";

const route = useRoute()
const currentForm = computed(() => {
  switch (route.path) {
    case '/login':
      return LoginForm
    case '/register':
      return RegisterForm
    case '/forget-password':
      return ForgetPasswordForm
    default:
      return null
  }
})
</script>

<template>
  <div class="principal-view">
    <img src="../../assets/bg-login-register-and-forget-password.png" alt="img-bg">
    <div class="form-view">
      <img src="../../assets/ic-factuManager.png">
      <component :is="currentForm"></component>
    </div>
  </div>
</template>

<style scoped>
.principal-view{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-height: 100vh;
  img{
    width: 50%;
    height: 100vh;
  }
}
.form-view{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    width: 25%;
    height: 25%;
    object-fit: cover;
    mix-blend-mode: hard-light;
  }
}
login-form{
  text-align: center;
  width: 100%;
}
</style>