<script>
export default {
  name: "confirmation-modal",
  methods: {
    goBack() {
      window.location.reload();
    }
  }
};
</script>
<template>
  <div class="modal-background">
    <pv-card class="card">
      <template #title>
        <div class="title">¡Creada correctamente!</div>
      </template>
      <template #content>
        <div class="card-content">La letra ha sido agregada exitosamente a la lista de letras.</div>
      </template>
      <template #footer>
        <div class="button">
          <pv-button @click="goBack" class="button-success">Regresar</pv-button>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 25px;
  margin: 40px 0 0;
}
.button-success{
  background-color: #4A79F7;
  color: white;
  border-radius: 15px;
  border-color: #4A79F7;
  width: 10em;
  padding: 12px;
  font-size: 18px;
  font-family: "Onest", sans-serif;
}

.p-button:hover {
  background-color: #789cff !important;
  border-color: #789cff !important;
  color: white !important;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  margin: 20px 0 40px;
  color: #5b5b5b;
}

.card-content {
  display: flex;
  justify-content: center;
  color: black;
  font-family: Inter, Arial, sans-serif;
  font-size: large;
}

.modal-background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 45%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}
</style>