<script>
import sidebar from "../../public/sidebar.component.vue";
import { ref, computed, watch } from "vue";

export default {
  name: "operations",
  components: { sidebar },
  setup() {
    const tea = ref(0);
    const desgravamen = ref(0);
    const selectedBank = ref(null);
    const selectedLetters = ref([]);
    const selectedLetterIds = ref([]);
    const teaError = ref(false);
    const desgravamenError = ref(false);

    const banks = ref([
      { label: 'BCP', value: 'bcp' },
      { label: 'Interbank', value: 'interbank' },
      { label: 'Scotiabank', value: 'scotiabank' },
      { label: 'Personalizado', value: 'custom' }
    ]);

    const bankRates = {
      bcp: { teaMin: 8.9, teaMax: 87.5, desgravamen: 0.165 },
      interbank: { teaMin: 4.5, teaMax: 44.92, desgravamen: 0.075 },
      scotiabank: { teaMin: 19.9, teaMax: 65.99, desgravamen: 0.256 },
    };

    const letters = ref([
      {
        id:'1',
        letterNumber: '001',
        issueDate: '01/01/2023',
        expirationDate: '01/06/2023',
        discountDate: '01/05/2023',
        faceValue: 10000.00
      },
      {
        id:'2',
        letterNumber: '002',
        issueDate: '01/02/2023',
        expirationDate: '01/07/2023',
        discountDate: '01/06/2023',
        faceValue: 20000.00
      },
      {
        id:'3',
        letterNumber: '003',
        issueDate: '01/03/2023',
        expirationDate: '01/08/2023',
        discountDate: '01/07/2023',
        faceValue: 15000.00
      },
    ]);

    const formatCurrency = (value) => {
      return `S/. ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };


    // calcular la tea proporcionalmente al monto
    const calculateTEA = (amount, bank) => {
      const minAmount = 1000;
      const maxAmount = 100000;
      const { teaMin, teaMax } = bankRates[bank];

      if (amount <= minAmount) return teaMin;
      if (amount >= maxAmount) return teaMax;

      return teaMin + ((teaMax - teaMin) * (amount - minAmount) / (maxAmount - minAmount));
    };

    // watch para rastrear la selección de letras y actualizar la TEA
    const updateTEA = () => {
      if (selectedBank.value && bankRates[selectedBank.value.value]) {
        const totalAmount = selectedLetters.value.reduce((total, letter) => total + letter.faceValue, 0);
        tea.value = calculateTEA(totalAmount, selectedBank.value.value);
        desgravamen.value = bankRates[selectedBank.value.value].desgravamen;
        teaError.value = false;
        desgravamenError.value = false;
      } else if (selectedBank.value && selectedBank.value.value === 'custom') {
        teaError.value = tea.value < 3 || tea.value > 90;
        desgravamenError.value = desgravamen.value < 0 || desgravamen.value > 1.5;
      }
    };

    watch([tea, desgravamen], updateTEA);

    watch(selectedLetters, updateTEA, { deep: true });

    // watch para rastrear la selección del banco y actualizar las tasas de interés
    watch(selectedBank, (newBank) => {
      if (newBank && bankRates[newBank.value]) {
        updateTEA();
      } else if (newBank && newBank.value === 'custom') {
        tea.value = 0;
        desgravamen.value = 0;
      } else {
        tea.value = 0;
        desgravamen.value = 0;
      }
    });

    // computed para calcular el monto entregado
    const delivered = computed(() => {
      return selectedLetters.value.reduce((total, letter) => {
        return total + calculateValorEntregado(letter.faceValue);
      }, 0);
    });

    // computed para calcular el monto recibido
    const received = computed(() => {
      let totalReceived = 0;
      if (selectedLetters.value.length > 0 && selectedBank.value) {
        selectedLetters.value.forEach(letter => {
          const periodoDias = calculatePeriodoDias(letter.expirationDate, letter.discountDate);
          const teaForPeriod = calculateTEAForPeriod(tea.value / 100, periodoDias);
          const tasaDescontada = calculateTasaDescontada(teaForPeriod);
          totalReceived += calculateValorRecibido(letter.faceValue, tasaDescontada, desgravamen.value / 100);
        });
      }
      return totalReceived;
    });


    // Calculus 🤓
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

    const isInvalid = computed(() => {
      return teaError.value || desgravamenError.value;
    });

    // watch para actualizar los IDs seleccionados
    watch(selectedLetters, (newSelection) => {
      selectedLetterIds.value = newSelection.map(letter => letter.id);
    }, { deep: true });

    // evento para enviar los IDs seleccionados al backend
    const sellLetters = () => {
      if (!isInvalid.value) {
        //TODO: enviar selectedLetterIds.value al backend
      }
    };

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
      calculateValorEntregado,
      selectedLetterIds,
      sellLetters,
      teaError,
      desgravamenError,
      isInvalid
    };
  }
};
</script>

<template>
  <div class="container">
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
                    <pv-select v-model="selectedBank" :options="banks" optionLabel="label" placeholder="Select a Bank"
                               class="p-select"/>
                  </div>
                  <div class="input">
                    <p>Tasa Efectiva Anual</p>
                    <pv-inputNumber v-model="tea" :disabled="selectedBank?.value !== 'custom'" :mode="'decimal'" :minFractionDigits="2" :maxFractionDigits="2" :min="0"/>
                    <div v-if="teaError" class="error">Los valores son entre 3 y 90*</div>
                  </div>
                  <div class="input">
                    <p>Seguro Desgravamen</p>
                    <pv-inputNumber v-model="desgravamen" :disabled="selectedBank?.value !== 'custom'" :mode="'decimal'" :minFractionDigits="2" :maxFractionDigits="2" :min="0"/>
                    <div v-if="desgravamenError" class="error">Los valores son entre 0 y 1.50*</div>
                  </div>
                </div>
                <div class="values-input">
                  <div class="input">
                    <p>Valor Entregado</p>
                    <pv-inputNumber v-model="delivered"/>
                  </div>
                  <div class="input">
                    <p>Valor Recibido</p>
                    <pv-inputNumber v-model="received"/>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="button">
              <pv-button :disabled="isInvalid" @click="$emit('sellLetters', selectedLetters)">Vender letra</pv-button>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-family: 'Lato', sans-serif;
  font-weight: 800;
  font-size: 0.8em;
  margin: 5px 0 0 20px;
}
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
  font-family: "Open Sans", serif;
  font-size: 31px !important;
  text-align: center !important;
}

.p-cascadeselect {
  width: 220px !important;
}

.p-inputtext:disabled {
  width: 220px !important;
  height: 45px;
}

.button {
  display: flex;
  justify-content: center;
}

.input-container {
  margin-top: 20px;
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
  margin-top: 60px;
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