<script setup>

</script>

<template>
  <div class="registry-table">
    <pv-card class="card">
      <template #content>
        <div class="registry">
          <h1>No has realizado ninguna venta de Letra :c</h1>
          <h1>Realiza una venta en Operaciones y vuelve para ver mas detalles :)</h1>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.registry-table {
  margin-top: 3em;
  height: 70%;
}
.card {
  height: 100%;
  justify-content: space-around !important;
}

:deep(.p-datatable-tbody > tr > td) {
  text-align: center;
}

:deep(.p-datatable-header-cell) {
  text-align: center;
}
.registry{
  display: flex;
  flex-direction: column;
  gap: 3em;
  align-items: center;
  height: 100%;
}
</style>