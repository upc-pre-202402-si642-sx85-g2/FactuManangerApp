<script>
import sidebar from "../../public/sidebar.component.vue";
import {ref} from "vue";

export default {
  name: "operations",
  components: { sidebar },
  setup(){
    const tea= ref('');
    const desgravamen= ref('');

    return {
      tea,
      desgravamen
    }
  }
};
</script>

<template>
  <div class="container">
  <sidebar></sidebar>
    <div class="content">

      <div class="operations">

        <pv-card class="card">
          <template #title >
            <h1 class="title">OPERACIONES</h1>
          </template>
          <template #content>
            <div class="card-content b1">
            <p>Letras seleccionadas</p>

              <div class="input-container">
                <div class="disabled-inputs">
                  <div class="input">
                    <p>Banco</p>
                    <pv-cascadeSelect></pv-cascadeSelect>
                  </div>

                  <div class="input">
                    <p>Tasa Efectiva Anual</p>
                    <pv-inputNumber v-model="tea" disabled />
                  </div>

                  <div class="input">
                    <p>Seguro Desgravamen</p>
                    <pv-inputNumber v-model="tea" disabled />
                  </div>
                </div>

                <div class="values-input">
                  <div class="input">
                    <p>Valor Entregado</p>
                    <pv-inputNumber v-model="tea" disabled />
                  </div>

                  <div class="input">
                    <p>Valor Recibido</p>
                    <pv-inputNumber v-model="tea" disabled />
                  </div>
                </div>
              </div>


            </div>
          </template>

          <template #footer>
            <pv-button @click="$emit('add-letter')"> Agregar letra</pv-button>
          </template>
        </pv-card>

      </div>
    </div>
  </div>
</template>

<style scoped>

.input-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: orange 3px solid;
}
.values-input{
  display: flex;
  justify-content: space-around;
  border:5px solid rgba(17, 174, 191, 0.66);
}
.disabled-inputs{
  display:flex;
  justify-content: space-between;
  border:green 3px solid;
}
.disabled-inputs .input{
  margin: 0 30px 50px 50px;
}

.input{
  border:blue 1px solid;
}

.b1{
  border: red 1px solid;
}
.container {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  margin-left: 320px;
}

.p-button{
  background-color: #4A79F7;
  border-color: #4A79F7;
  color: white;
  border-radius: 15px;
  width: 12em;
  height: 2.5em;
  margin: 40px 50px;
  font-size: 25px;
}

.p-button:hover{
  background-color: #789cff !important;
  color: white !important;
  border-color: #789cff !important;
}

.title {
  color: #435a97;
  font-family: 'Open Sans', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
}

.card {
  display:flex;
  align-items: center;
  background-color: white;
  box-shadow: 0 5px 5px rgb(0,0,0,0.2);
  height: 70vh;
  margin-top: 20px;
  width: 90%;
}

.card-content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color:black;
  font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 20px;
}

.operations{
  display:flex;
  justify-content:center;
  align-items: center;
}
</style>