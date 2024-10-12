<script>
import sidebar from "../../public/sidebar.component.vue";

export default {
  name: "letter-list",
  components: { sidebar },
  props: {
    letters: Array,
    required: true,
  },
  computed: {
    formattedLetters() {
      return this.letters.map(letter => {
        return {
          ...letter,
          issueDate: this.formatDate(letter.issueDate),
          expirationDate: this.formatDate(letter.expirationDate),
          discountDate: this.formatDate(letter.discountDate),
        };
      });
    },
  },
  methods: {
    // fechas formato DD/MM/YYYY
    formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear(); // Año

      return `${day}/${month}/${year}`;
    },

    // formato valor nominal
    formatCurrency(value) {
      return `S/. ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },
  },
};
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
            <div class="letter">
              <pv-dataTable :value="formattedLetters">
                <pv-column field="letterNumber" header="Nro. Letra"></pv-column>
                <pv-column field="name" header="Razón social"></pv-column>
                <pv-column field="issueDate" header="Fecha de emisión"></pv-column>
                <pv-column field="expirationDate" header="Fecha de vencimiento"></pv-column>
                <pv-column field="discountDate" header="Fecha de descuento"></pv-column>
                <pv-column header="Valor nominal">
                  <template #body="slotProps">
                    <span>{{ formatCurrency(slotProps.data.faceValue) }}</span>
                  </template>
                </pv-column>
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
  box-shadow: 0 5px 5px rgb(0, 0, 0, 0.2);
  height: 70vh;
  margin-top: 20px;
  width: 90%;
}

.button {
  display: flex;
  justify-content: right;
  align-items: end;
  width: 85%;
  font-size: 25px;
  margin-top: -20px;
}

.p-button {
  background-color: #1f3c87;
  color: white;
  border-radius: 15px;
  border-color: #1f3c87;
  padding: 10px;
  width: 9em;
  font-size: 20px;
  font-family: "Onest", sans-serif;
  box-shadow: 0 3px 3px rgb(0, 0, 0, 0.2);
}

.p-button:hover {
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
  padding: 10px;
  width: 100%;
}

.p-datatable-tbody {
  width: 100%;
}

.p-datatable-tbody > tr {
  font-family: sans-serif !important;
}

:deep(.p-datatable-tbody > tr > td) {
  font-family: "Onest", sans-serif !important;
}

:deep(.p-datatable-header-cell) {
  font-size: x-large !important;
  text-align: center !important;
}
</style>
