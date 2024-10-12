<script>
import sidebar from "../../public/sidebar.component.vue";

export default {
  name:"letter-list",
  components: {sidebar },
  props:{
    letters: Array,
    required: true,
  },
 // data(){
 //    return{
 //      letters: [
 //        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
 //        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
 //        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
 //        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
 //        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
 //        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
 //        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
 //        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
 //        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
 //      ]
 //    }
 // }
}

</script>

<template>
  <div class="container">

    <div class="content">
      <div class="titulo">
        <h1>Cartera de Letras</h1>
      </div>

      <div class="letterList">

        <div class="button">
          <pv-button @click="$emit('add-letter')"> Agregar letra </pv-button>
        </div>


        <pv-card class="card">
          <template #content>

            <div class="letter ">
              <pv-dataTable :value="letters">
                <pv-column field="nroLetra" header="Nro. Letra"></pv-column>
                <pv-column field="razonSocial" header="Razón social"></pv-column>
                <pv-column field="fechaEmision" header="Fecha de emisión"></pv-column>
                <pv-column field="fechaVencimiento" header="Fecha de vencimiento"></pv-column>
                <pv-column field="fechaDescuento" header="Fecha de descuento"></pv-column>
                <pv-column field="valorNominal" header="Valor nominal"></pv-column>
              </pv-dataTable>
            </div>

          </template>
        </pv-card>

      </div>
    </div>
  </div>



</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  margin-left: 320px;
  padding: 20px;
}

.titulo {
  color: #435a97;
  font-family: 'Open Sans', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: bold;
  padding-top: 90px;
  text-align: center;
}

.card {
  background-color: white;
  box-shadow: 0 5px 5px rgb(0,0,0,0.2);
  height: 70vh;
  margin-top: 20px;
  width: 90%;
}

.button{
  display: flex;
  justify-content: right;
  align-items: end;
  width: 85%;
  font-size: 25px;
  margin-top:-20px;
}

.p-button{
  background-color: #1f3c87;
  color: white;
  border-radius: 15px;
  border-color: #1f3c87;
  padding:10px;
  width: 9em;
  font-size: 20px;
  font-family: "Onest",sans-serif;
  box-shadow: 0 3px 3px rgb(0,0,0,0.2);
}
.p-button:hover{
  background-color: #4877f3 !important;
  color: white !important;
  border-color: #4877f3 !important;
}

.letterList {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.letter {
  font-size: 20px;
  height: 65vh;
  overflow-x: auto;
  overflow-y: auto;
  padding:10px;
  width: 100%;
}

.p-datatable-tbody {
  width: 100%;
}

.p-datatable-tbody > tr {
  font-family: sans-serif !important;
}

:deep(.p-datatable-tbody > tr > td) {
  font-family:"Onest",sans-serif !important;
}

:deep(.p-datatable-header-cell) {
  font-size: x-large !important;
  text-align: center !important;
}
</style>