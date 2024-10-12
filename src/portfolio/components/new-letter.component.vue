<script>
import { ref } from 'vue';
import sidebar from "../../public/sidebar.component.vue";

export default {
  name: "new-letter",
  components: { sidebar },
  setup(_, { emit }) {
    const name = ref('');
    const issueDate = ref('');
    const expirationDate = ref('');
    const ruc = ref(undefined);
    const discountDate = ref('');
    const faceValue = ref(undefined);
    const letters = ref([]);

    const nameError = ref(false);
    const issueDateError = ref(false);
    const expirationDateError = ref(false);
    const rucError = ref(false);
    const discountDateError = ref(false);
    const faceValueError = ref(false);

    const validateForm = () => {
      nameError.value = name.value === '';
      issueDateError.value = issueDate.value === '';
      expirationDateError.value = expirationDate.value <= issueDate.value;
      rucError.value = !(ruc.value && ruc.value.toString().length === 11);
      discountDateError.value = discountDate.value <= issueDate.value || discountDate.value > expirationDate.value;
      faceValueError.value = faceValue.value === '' || faceValue.value <= 0;

      return !(nameError.value || issueDateError.value || expirationDateError.value || rucError.value || discountDateError.value || faceValueError.value);
    };

    const submitLetterForm = () => {
      if (validateForm()) {
        const newLetter = {
          letterNumber: LetterNumber(),
          name: name.value,
          issueDate: issueDate.value,
          expirationDate: expirationDate.value,
          ruc: ruc.value,
          discountDate: discountDate.value,
          faceValue: faceValue.value,
        };
        emit('submit', newLetter);
      }
    };

    const LetterNumber = () => {
      const lastLetter = letters.value[letters.value.length - 1];
      return lastLetter ? (parseInt(lastLetter.nroLetra, 10) + 1).toString() : '1001'; // Si no hay letras, empieza en 1001
    };

    return {
      name,
      issueDate,
      expirationDate,
      ruc,
      discountDate,
      faceValue,
      nameError,
      issueDateError,
      expirationDateError,
      rucError,
      discountDateError,
      faceValueError,
      submitLetterForm,
    };
  },
};
</script>

<template>
  <div class="modal-background">
    <pv-card class="card">
      <template #title>
        <div class="title">Agregar letra</div>
      </template>
      <template #content>
        <div class="card-content">
          <div class="right-content">
            <div class="input">
              <pv-floatLabel>
                <label for="name">Nombre/Razón Social</label>
                <pv-inputText id="name" v-model="name" fluid />
              </pv-floatLabel>
              <p v-if="nameError" class="error">Este campo es requerido*</p>
            </div>

            <div class="input">
              <pv-floatLabel>
                <pv-datePicker v-model="issueDate" showIcon fluid iconDisplay="input" inputId="icondisplay" />
                <label for="issueDate"> Fecha de emisión </label>
              </pv-floatLabel>
              <p v-if="issueDateError" class="error">Este campo es requerido*</p>
            </div>

            <div class="input">
              <pv-floatLabel>
                <pv-datePicker v-model="expirationDate" showIcon fluid iconDisplay="input" inputId="icondisplay" />
                <label for="expirationDate"> Fecha de vencimiento </label>
              </pv-floatLabel>
              <p v-if="expirationDateError" class="error">La fecha de vencimiento debe ser mayor a la fecha de emisión*</p>
            </div>
          </div>

          <div class="left-content">
            <div class="input">
              <pv-floatLabel>
                <pv-inputNumber v-model="ruc" inputId="ruc" :useGrouping="false" fluid />
                <label for="ruc"> Ruc </label>
              </pv-floatLabel>
              <p v-if="rucError" class="error">El RUC debe tener 11 caracteres*</p>
            </div>

            <div class="input">
              <pv-floatLabel>
                <pv-datePicker v-model="discountDate" showIcon fluid iconDisplay="input" inputId="icondisplay" />
                <label for="discountDate"> Fecha de descuento </label>
              </pv-floatLabel>
              <p v-if="discountDateError" class="error small-margin">La fecha de descuento debe ser mayor a la fecha de emisión y vencimiento*</p>
            </div>

            <div class="input">
              <pv-floatLabel>
                <pv-inputNumber v-model="faceValue" inputId="faceValue" fluid />
                <label for="faceValue"> Valor nominal </label>
              </pv-floatLabel>
              <p v-if="faceValueError" class="error">El valor nominal debe ser mayor a cero*</p>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="button">
          <pv-button @click="submitLetterForm">Agregar letra</pv-button>
        </div>
      </template>
    </pv-card>
  </div>
</template>
<style scoped>
.error {
  color: red;
  font-family: 'Lato', sans-serif;
  font-weight: 800;
  font-size: 0.8em;
  margin:5px 0 0 20px;
}

.small-margin{
  margin-bottom: -20px;
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
  width: 57%;
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
  margin: 10px 0 50px;
  color: #5b5b5b;
}

.card-content {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  color: black;
  font-family: Inter, Arial, sans-serif;
  font-weight: bold;
  margin: 0 auto;
}

.right-content, .left-content {
  width: 40%;
}

.input {
  margin-bottom: 60px;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 25px;
  margin: 0 0 20px;
}

.p-button {
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

:deep(.p-inputtext) {
  color: black !important;
  padding: 9px;
  font-family: Inter, Arial, sans-serif;
  border-radius: 20px;
}

.p-inputtext:hover {
  border-color: #4978f5 !important;
}

:deep(.p-floatlabel:has(input.p-filled) label, .p-floatlabel:has(textarea.p-filled) label, .p-floatlabel:has(.p-inputwrapper-filled) label) {
  font-size: medium !important;
}

/* Media Queries */
@media (max-width: 768px) {
  .card-content {
    flex-direction: column;
    align-items: center;
  }

  .right-content, .left-content {
    width: 80%;
  }
}
</style>