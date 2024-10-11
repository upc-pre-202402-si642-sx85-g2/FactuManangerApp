<script>
import sidebar from "../../public/sidebar.component.vue";

export default {
  name:"letter-list",
  components: { sidebar },
 data(){
    return{
      letters: [
        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
        {nroLetra: '1001', razonSocial: 'Gota a Gota', fechaEmision: '16/09/2024', fechaVencimiento: '20/11/2024', fechaDescuento: '26/09/2024', valorNominal:'1300.00'},
      ]
    }
 }
}

</script>

<template>
  <div class="container">
    <sidebar />

    <div class="content">
      <div class="titulo">
        <h1>Cartera de Letras</h1>
      </div>

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
    </div>
  </div>
</template>

<style scoped>

.p-datatable-table{
  background-color: white !important;
}

.p-datatable-table-thead > tr{
  --p-datatable-header-cell-background:white;
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

.titulo {
  color: #435a97;
  padding-top: 90px;
  font-family: 'Open Sans', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}

.letter{
  display:flex;
  justify-content:center;
  align-items: center;
}
</style>