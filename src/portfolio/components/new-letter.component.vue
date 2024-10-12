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

            <div class="left-content">
              <div class="input">
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


            <div class="right-content">
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
                <pv-inputNumber v-model="faceValue" inputId="faceValue" mode="currency" currency="PEN" locale="en-US" fluid />
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


.title{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  margin-top: 10px;
  color: #5b5b5b;
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
  width: 65%;
  height: 60vh;
  background-color: white;
  box-shadow: 0 5px 5px rgb(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-content{
  display: flex;
  color:black;
  border:3px solid red;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  font-family: Inter, Arial, sans-serif;
  font-weight: bold;
}

.left-content{
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  width: 50%;
}

.right-content{
  border:1px solid green;
  display: flex;
  flex-direction: column;
  width: 50%;
}

.p-button{
  background-color: #4A79F7;
  color: white;
  border-radius: 15px;
  border-color: #4A79F7;
  width: 9em;
  font-size: 18px;
  font-family: "Onest",sans-serif;
}
.p-button:hover{
  background-color: #789cff !important;
  color: white !important;
  border-color: #789cff !important;
}


.input{
  margin-bottom: 30px;
}

:deep(.p-datepicker-day){
  font-family: "Onest",sans-serif !important;
}
.p-inputtext{
  color: black !important;
  font-family: Inter, Arial, sans-serif;
  border-radius: 20px;
}

.p-inputtext:hover{
  border-color: #4978f5 !important;
}

</style>