<script>
import sidebar from "../../public/sidebar.component.vue";
export default {
  name: "new-letter",
  components: {sidebar },
  data() {
    return {
      name: '',
      issueDate: '',
      expirationDate:'',
      ruc:'',
      discountDate:'',
      faceValue:''

    };
  },
};

</script>

<template>

  <div class="modal-background">

    <pv-card class="card">

      <template #title>
        <div class="title">
          Agregar letra
        </div>

      </template>
      <template #content>
        <div class="card-content">

          <div class="right-content">
            <div class="input input-name">
              <!--add limit of characters-->
              <label for="name">Nombre/Razón Social</label>
              <pv-inputText id="name" v-model="name" />
            </div>

            <div class="input">
              <label for="issueDate"> Fecha de emisión </label>
              <pv-datePicker v-model="issueDate" showIcon fluid iconDisplay="input" inputId="icondisplay" />
            </div>

            <div class="input">
              <label for="expirationDate"> Fecha de vencimiento </label>
              <pv-datePicker v-model="expirationDate" showIcon fluid iconDisplay="input" inputId="icondisplay" />
            </div>
          </div>

          <div class="left-content">
            <div class="input">
              <!--add limit of characters-->
              <label for="ruc" > Ruc </label>
              <pv-inputNumber v-model="ruc" inputId="ruc" :useGrouping="false" fluid />
            </div>

            <div class="input">
              <label for="discountDate"> Fecha de descuento </label>
              <pv-datePicker v-model="discountDate" showIcon fluid iconDisplay="input" inputId="icondisplay" />
            </div>

            <div class="input">
              <label for="faceValue"> Valor nominal </label>
              <pv-inputNumber v-model="faceValue" inputId="faceValue" fluid />
            </div>
          </div>

        </div>
      </template>
      <template #footer>
        <div class="button">
          <pv-button>
            Agregar letra
          </pv-button>
        </div>
      </template>
    </pv-card>

  </div>



</template>

<style scoped>
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
  width: 65%;
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
  margin: 10px 0 40px;
  color: #5b5b5b;
}

.card-content {
  display: flex;
  justify-content: space-around;
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
  margin-bottom: 40px;
}

.input-name {
  display: flex;
  flex-direction: column;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 25px;
  margin: 30px 0 20px;
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
}

:deep(.p-datepicker-day) {
  font-family: "Onest", sans-serif !important;
}

.p-inputtext {
  color: black !important;
  font-family: Inter, Arial, sans-serif;
  border-radius: 20px;
}

.p-inputtext:hover {
  border-color: #4978f5 !important;
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