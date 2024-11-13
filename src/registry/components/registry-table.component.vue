<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  letters: {
    type: Array,
    required: true
  }
});

function formatPercentage(value) {
  return `${value.toFixed(2)}%`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);
}
</script>

<template>
  <div class="registry-table">
    <pv-card class="card">
      <template #content>
        <div class="registry letter-card">
          <pv-dataTable :value="letters">
            <pv-column field="bank" header="Banco"></pv-column>
            <pv-column field="nominalValue" header="Valor Nominal">
              <template #body="slotProps">
                <span>{{ formatCurrency(slotProps.data.nominalValue) }}</span>
              </template>
            </pv-column>
            <pv-column field="tea" header="TEA">
              <template #body="slotProps">
                <span>{{ formatPercentage(slotProps.data.tea*100) }}</span>
              </template>
            </pv-column>
            <pv-column field="tcea" header="TCEA">
              <template #body="slotProps">
                <span>{{ formatPercentage(slotProps.data.tcea*100) }}</span>
              </template>
            </pv-column>
            <pv-column field="periodInDays" header="Periodo en días"></pv-column>
            <pv-column field="tep" header="TEP">
              <template #body="slotProps">
                <span>{{ formatPercentage(slotProps.data.tep*100) }}</span>
              </template>
            </pv-column>
            <pv-column field="discountedRate" header="Tasa descontada">
              <template #body="slotProps">
                <span>{{ formatPercentage(slotProps.data.discountedRate*100) }}</span>
              </template>
            </pv-column>
            <pv-column field="deliveredValue" header="Valor Entregado">
              <template #body="slotProps">
                <span>{{ formatCurrency(slotProps.data.deliveredValue) }}</span>
              </template>
            </pv-column>
            <pv-column field="receivedValue" header="Valor Recibido">
              <template #body="slotProps">
                <span>{{ formatCurrency(slotProps.data.receivedValue) }}</span>
              </template>
            </pv-column>
          </pv-dataTable>
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
  padding: 10px;
  background-color: white;
  overflow-x: auto;
  overflow-y: auto;
  box-shadow: 0 5px 5px rgb(0, 0, 0, 0.2);
}

.pv-column {
  text-align: center;
}

.p-datatable-tbody > tr {
  font-family: sans-serif !important;
}

:deep(.p-datatable-tbody > tr > td) {
  font-family: "Onest", sans-serif !important;
  font-weight: 200;
  text-align: center !important;
}

:deep(.p-datatable-header-cell) {
  font-family: "Open Sans", serif;
  font-size: 20px !important;
  text-align: center !important;
}

@media (max-width: 700px) {
  :deep(.p-datatable-header-cell) {
    font-size: 25px !important;
  }
  .card {
    height: 70vh;
  }
}

</style>
