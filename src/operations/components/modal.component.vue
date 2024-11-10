<script>
import { ref, watch } from "vue";

export default {
  name: 'modal-instructions',
  props: {
    selectedLetters: {
      type: Array,
      required: true
    },
    modalType: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const showModal = ref(true);

    const closeModal = () => {
      showModal.value = false;
      emit('close-modal');
    };

    watch(() => props.modalType, () => {
      showModal.value = true;
    });

    return {
      showModal,
      closeModal
    };
  }
};
</script>

<template>
  <div v-if="showModal" class="modal-background">
    <pv-card class="card">
      <template #content>
        <div v-if="modalType === 'success'">
          <div class="title">¡Operación exitosa!</div>
          <div class="card-content">
            <p>Se agregó una nueva venta de letra a tu registro :)</p>
          </div>
        </div>
        <div v-if="modalType === 'error'">
          <div class="title">Error</div>
          <div class="card-content">
            <p>Debes seleccionar una letra o un banco >:(</p>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="button">
          <pv-button
              :class="modalType === 'success' ? 'button-success' : 'button-error'"
              @click="closeModal">
            Aceptar
          </pv-button>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.card {
  width: 35%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
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
.button-error{
  background-color: #FF4A4A;
  color: white;
  border-radius: 15px;
  border-color: #FF4A4A;
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

@media (max-width: 1500px) {
  .card {
    width: 70%;
  }
}

@media (max-width: 768px) {
  .card {
    width: 70%;
  }

  .title {
    font-size: 35px;
  }

  .button {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .card {
    width: 70%;
  }

  .title {
    font-size: 35px;
  }

  .button {
    font-size: 18px;
  }
}
</style>
