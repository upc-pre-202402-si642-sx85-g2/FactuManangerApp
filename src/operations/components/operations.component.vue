<script>
import sidebar from "../../public/sidebar.component.vue";
import { ref, watch } from "vue";

export default {
  name: "operations",
  components: { sidebar },
  setup() {
    const tea = ref('');
    const desgravamen = ref('');
    const delivered = ref('');
    const received = ref('');
    const selectedBank = ref(null);
    const selectedLetters = ref([]);

    const banks = ref([
      { label: 'BCP', value: 'bcp' },
      { label: 'Interbank', value: 'interbank' },
      { label: 'Scotiabank', value: 'scotiabank' }
    ]);

    const bankRates = {
      bcp: { tea: 10, desgravamen: 0.2 },
      interbank: { tea: 12, desgravamen: 0.25 },
      scotiabank: { tea: 11, desgravamen: 0.15 },
    };

    const letters = ref([
      {
        letterNumber: '001',
        issueDate: '01/01/2023',
        expirationDate: '01/06/2023',
        discountDate: '01/05/2023',
        faceValue: 1000.00
      },
      {
        letterNumber: '002',
        issueDate: '01/02/2023',
        expirationDate: '01/07/2023',
        discountDate: '01/06/2023',
        faceValue: 2000.00
      },
      {
        letterNumber: '003',
        issueDate: '01/03/2023',
        expirationDate: '01/08/2023',
        discountDate: '01/07/2023',
        faceValue: 1500.00
      },
    ]);

    const formatCurrency = (value) => {
      return `S/. ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    //watch para rastrear la selección del banco y actualizar las tasas de interés
    watch(selectedBank, (newBank) => {
      if (newBank && bankRates[newBank.value]) {
        tea.value = bankRates[newBank.value].tea;
        desgravamen.value = bankRates[newBank.value].desgravamen;
      } else {
        tea.value = 0;
        desgravamen.value = 0;
      }
    });

    //calculus 🤓
    const calculatePeriodoDias = (fecha_vencimiento, fecha_descuento) => {
      const diffTime = Math.abs(new Date(fecha_vencimiento) - new Date(fecha_descuento));
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateTEAForPeriod = (tasaEfectivaAnual, periodo_dias) => {
      return Math.pow((1 + tasaEfectivaAnual), (periodo_dias / 360)) - 1;
    };

    const calculateTasaDescontada = (tea_for_period) => {
      return tea_for_period / (1 + tea_for_period);
    };

    const calculateValorRecibido = (valor_nominal, tasa_descontada, desgravamen) => {
      const vneto = valor_nominal * (1 - tasa_descontada);
      return vneto - (desgravamen * valor_nominal);
    };

    const calculateValorEntregado = (valor_nominal) => {
      return valor_nominal;
    };

    //watch para rastrear la selección de letras y actualizar los valores de entrega y recepción
    watch(selectedLetters, (newLetters) => {
      if (newLetters.length > 0 && selectedBank.value) {
        let totalReceived = 0;
        let totalDelivered = 0;

        newLetters.forEach(letter => {
          const periodoDias = calculatePeriodoDias(letter.expirationDate, letter.discountDate);
          const teaForPeriod = calculateTEAForPeriod(tea.value / 100, periodoDias);
          const tasaDescontada = calculateTasaDescontada(teaForPeriod);
          totalReceived += calculateValorRecibido(letter.faceValue, tasaDescontada, desgravamen.value / 100);
          totalDelivered += calculateValorEntregado(letter.faceValue);
        });

        received.value = totalReceived;
        delivered.value = totalDelivered;
      } else {
        received.value = '';
        delivered.value = '';
      }
    });

    return {
      tea,
      desgravamen,
      letters,
      selectedLetters,
      banks,
      selectedBank,
      delivered,
      received,
      formatCurrency,
      calculatePeriodoDias,
      calculateTEAForPeriod,
      calculateTasaDescontada,
      calculateValorRecibido,
      calculateValorEntregado
    };
  }
};
</script>
<template>
  <div class="container">
    <sidebar></sidebar>
    <div class="content">
      <div class="operations">
        <pv-card class="card">
          <template #title>
            <h1 class="title">OPERACIONES</h1>
          </template>
          <template #content>
            <div class="card-content b1">
              <div class="list">
                <div class="subtitle">
                  <p>Letras seleccionadas</p>
                </div>
                <pv-card class="letter-card">
                  <template #content>
                    <div class="letter">
                      <pv-dataTable v-model:selection="selectedLetters" :value="letters">
                        <pv-column field="letterNumber" header="Nro. Letra"></pv-column>
                        <pv-column field="discountDate" header="Fecha de descuento"></pv-column>
                        <pv-column field="expirationDate" header="Fecha de vencimiento"></pv-column>
                        <pv-column field="faceValue" header="Valor nominal">
                          <template #body="slotProps">
                            <span>{{ formatCurrency(slotProps.data.faceValue) }}</span>
                          </template>
                        </pv-column>
                        <pv-column selectionMode="multiple" headerStyle="width: 3rem; text-align: right;"></pv-column>
                      </pv-dataTable>
                    </div>
                  </template>
                </pv-card>
              </div>

              <div class="input-container">
                <div class="disabled-inputs">
                  <div class="input">
                    <p>Banco</p>
                    <pv-select v-model="selectedBank" :options="banks" optionLabel="label" placeholder="Select a Bank" class="p-select" />
                  </div>
                  <div class="input">
                    <p>Tasa Efectiva Anual</p>
                    <pv-inputNumber v-model="tea" disabled />
                  </div>
                  <div class="input">
                    <p>Seguro Desgravamen</p>
                    <pv-inputNumber v-model="desgravamen" disabled />
                  </div>
                </div>
                <div class="values-input">
                  <div class="input">
                    <p>Valor Entregado</p>
                    <pv-inputNumber v-model="delivered"  />
                  </div>
                  <div class="input">
                    <p>Valor Recibido</p>
                    <pv-inputNumber v-model="received"  />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="button">
              <pv-button @click="$emit('add-letter')">Vender letra</pv-button>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>
<style scoped>
.p-select {
  min-width: 220px;
  width: auto;
  font-family: "Onest", sans-serif;
  font-weight: 200;
}
.subtitle {
  display: flex;
  align-self: start;
  font-size: 25px;
}


.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.letter-card {
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  box-shadow: 0 5px 5px rgb(0, 0, 0, 0.2);
  width: 60vw;
  height: 32vh;
  margin: 10px 0 20px 0;
  overflow-x: auto;
  overflow-y: auto;
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
  font-family: "Open Sans",serif;
  font-size: 31px !important;
  text-align: center !important;
}

.p-cascadeselect {
  width: 220px !important;
}

.p-inputtext:disabled{
  width: 220px !important;
  height: 45px;
}

.button {
  display: flex;
  justify-content: center;
}

.input-container {
  margin-top:20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

}

.values-input {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  width: 70%;
}

.disabled-inputs {
  display: flex;
  justify-content: space-around;

  width: 100%;
}

.disabled-inputs .input {
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 20px;
}

.content {
  flex: 1;
  padding: 20px;
  margin-left: 320px;
}

.p-button {
  background-color: #4A79F7;
  border-color: #4A79F7;
  color: white;
  border-radius: 15px;
  width: 8em;
  height: 2em;
  margin: 40px 50px;
  font-size: 25px;
}

.p-button:hover {
  background-color: #789cff !important;
  color: white !important;
  border-color: #789cff !important;
}

.title {
  color: #5b5b5b;
  font-family: 'Open Sans', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
}

.card {
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0 5px 5px rgb(0, 0, 0, 0.2);
  height: 82vh;
  margin-top: 20px;
  width: 90%;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: black;
  font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 20px;
}

.operations {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
