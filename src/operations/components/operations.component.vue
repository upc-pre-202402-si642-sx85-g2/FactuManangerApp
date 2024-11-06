<script>
import sidebar from "../../public/sidebar.component.vue";
import { ref, computed, watch, onMounted } from "vue";
import { LetraService } from "../../services/letra.service.js";
import { OperationService } from "../../services/operation.service.js";

export default {
  name: "operations",
  components: { sidebar },
  setup(props, { emit }) {
    const tea = ref(0);
    const desgravamen = ref(0);
    const selectedBank = ref(null);
    const selectedLetters = ref([]);
    const selectedLetterIds = ref([]);
    const teaError = ref(false);
    const desgravamenError = ref(false);
    const letrasApiService = new LetraService();
    const operationService = new OperationService();
    const letters = ref([]);
    const handleSellLetters = () => {
      emit('sellLetters', selectedLetters.value);
      sellLetters();
    };


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

    const formatCurrency = (value) => {
      return `S/. ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const fetchLetters = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in session storage');
        }

        const carteraResponse = await letrasApiService.getCarteraByUserId(userId);
        const carteraId = carteraResponse.data[0]._id;

        const letrasResponse = await letrasApiService.getLetrasByCarteraId(carteraId);
        letters.value = letrasResponse.data.map((letra, index) => ({
          ...letra,
          id: letra._id,
          letterNumber: String(index + 1).padStart(3, '0'),
          issueDate: formatDate(letra.fecha_emision),
          expirationDate: formatDate(letra.fecha_vencimiento),
          discountDate: formatDate(letra.fecha_descuento),
          faceValue: letra.valor_nominal
        }));
      } catch (error) {
        console.error('Error fetching letters:', error);
      }
    };


    const formatDate = (date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    onMounted(fetchLetters);

    const calculateTEA = (amount, bank) => {
      const minAmount = 1000;
      const maxAmount = 100000;
      const { teaMin, teaMax } = bankRates[bank];

      if (amount <= minAmount) return teaMin;
      if (amount >= maxAmount) return teaMax;

      return teaMin + ((teaMax - teaMin) * (amount - minAmount) / (maxAmount - minAmount));
    };

    const updateTEA = () => {
      if (selectedBank.value && bankRates[selectedBank.value.value]) {
        const totalAmount = selectedLetters.value.reduce((total, letter) => total + letter.faceValue, 0);
        tea.value = calculateTEA(totalAmount, selectedBank.value.value);
        desgravamen.value = bankRates[selectedBank.value.value].desgravamen;
        teaError.value = false;
        desgravamenError.value = false;
      } else if (selectedBank.value && selectedBank.value.value === 'custom') {
        teaError.value = tea.value < 3 || tea.value > 90;
        desgravamenError.value = desgravamen.value < 0.01 || desgravamen.value > 1.5;
      }
    };

    watch([tea, desgravamen], updateTEA);

    watch(selectedLetters, updateTEA, { deep: true });

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

    const delivered = computed(() => {
      return selectedLetters.value.reduce((total, letter) => {
        return total + calculateValorEntregado(letter.faceValue);
      }, 0);
    });

    const received = computed(() => {
      let totalReceived = 0;
      if (selectedLetters.value.length > 0 && selectedBank.value) {
        selectedLetters.value.forEach(letter => {
          const periodoDias = calculatePeriodoDias(letter.expirationDate, letter.discountDate);
          const teaForPeriod = calculateTEAForPeriod(tea.value / 100, periodoDias);
          const tasaDescontada = calculateTasaDescontada(teaForPeriod);
          const valorRecibido = calculateValorRecibido(letter.faceValue, tasaDescontada, desgravamen.value / 100);
          if (!isNaN(valorRecibido)) {
            totalReceived += valorRecibido;
          } else {
            console.error('valores inválidos:', valorRecibido, {
              faceValue: letter.faceValue,
              teaForPeriod,
              tasaDescontada,
              desgravamen: desgravamen.value / 100
            });
          }
        });
      }
      return totalReceived;
    });

    const calculatePeriodoDias = (fecha_vencimiento, fecha_descuento) => {
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
      };

      const vencimiento = parseDate(fecha_vencimiento);
      const descuento = parseDate(fecha_descuento);

      const diffTime = Math.abs(vencimiento - descuento);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateTEAForPeriod = (tasaEfectivaAnual, periodo_dias) => {
      const result = Math.pow((1 + tasaEfectivaAnual), (periodo_dias / 360)) - 1;
      if (isNaN(result)) {
        console.error('tea inválida:', { tasaEfectivaAnual, periodo_dias });
      }
      return result;
    };

    const calculateTasaDescontada = (tea_for_period) => {
      const result = tea_for_period / (1 + tea_for_period);
      if (isNaN(result)) {
        console.error('tasa descontada inválida:', { tea_for_period });
      }
      return result;
    };

    const calculateValorRecibido = (valor_nominal, tasa_descontada, desgravamen) => {
      if (typeof valor_nominal !== 'number' || typeof tasa_descontada !== 'number' || typeof desgravamen !== 'number') {
        console.error('input para calcular:', {
          valor_nominal,
          tasa_descontada,
          desgravamen
        });
        return NaN;
      }
      const vneto = valor_nominal * (1 - tasa_descontada);
      return vneto - (desgravamen * valor_nominal);
    };

    const calculateValorEntregado = (valor_nominal) => {
      return valor_nominal;
    };

    const isInvalid = computed(() => {
      return teaError.value || desgravamenError.value;
    });

    watch(selectedLetters, (newSelection) => {
      console.log('New selection:', newSelection);
      selectedLetterIds.value = newSelection.map(letter => {
        console.log('Letter ID:', letter.id);
        return letter.id;
      }).filter(id => id !== undefined);
      console.log('selectedLetterIds:', selectedLetterIds.value);
    }, { deep: true });

    const sellLetters = async () => {
      if (!isInvalid.value && selectedLetterIds.value.length > 0) {
        const data = {
          letraIds: selectedLetterIds.value,
          banco: selectedBank.value?.label || '',
          tasa_efectiva_anual: tea.value / 100,
          desgravamen: desgravamen.value / 100
        };

        console.log('Datos a enviar:', data);

        try {
          const response = await operationService.createOperation(data);
          console.log('Respuesta del servidor:', response.data);
        } catch (error) {
          console.error('Error creando operación:', error);
        }
      } else {
        console.error('Datos inválidos o no hay letras seleccionadas');
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
      handleSellLetters,
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
                    <div v-if="desgravamenError" class="error">Los valores son entre 0.01 y 1.50*</div>
                  </div>
                </div>
                <div class="values-input">
                  <div class="input">
                    <p>Valor Entregado</p>
                    <pv-inputNumber v-model="delivered" disabled/>
                  </div>
                  <div class="input">
                    <p>Valor Recibido</p>
                    <pv-inputNumber v-model="received" disabled/>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="button">
              <pv-button :disabled="isInvalid" @click="handleSellLetters">Vender letra</pv-button>

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
