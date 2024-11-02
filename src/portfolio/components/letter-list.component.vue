<script>
import { LetraService } from "../../services/letra.service.js";
import { Letra } from "../../models/letra.entity.js";

export default {
  name: "letter-list",
  data() {
    return {
      letras: [],
      letrasApiService: new LetraService(),
      carteraId: null,
    };
  },
  async created() {
    try {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in session storage');
      }

      // Fetch cartera
      const carteraResponse = await this.letrasApiService.getCarteraByUserId(userId);
      const cartera = carteraResponse.data[0];
      this.carteraId = cartera._id;

      // Fetch letras
      const letrasResponse = await this.letrasApiService.getLetrasByCarteraId(this.carteraId);
      this.letras = letrasResponse.data.map((letra, index) => {
        return new Letra(
            index + 1,
            letra.carteraId,
            letra.razon_social,
            letra.ruc,
            this.formatDate(letra.fecha_emision),
            this.formatDate(letra.fecha_descuento),
            this.formatDate(letra.fecha_vencimiento),
            letra.valor_nominal,
            this.formatDate(letra.createdAt),
            this.formatDate(letra.updateAt)
        );
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);
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
          <pv-button @click="$emit('add-letter')">Agregar letra</pv-button>
        </div>
        <pv-card class="card">
          <template #content>
            <div class="letter">
              <pv-dataTable :value="letras">
                <pv-column field="_id" header="Nro. Letra"></pv-column>
                <pv-column field="razon_social" header="Razón social"></pv-column>
                <pv-column field="fecha_emision" header="Fecha de emisión"></pv-column>
                <pv-column field="fecha_vencimiento" header="Fecha de vencimiento"></pv-column>
                <pv-column field="fecha_descuento" header="Fecha de descuento"></pv-column>
                <pv-column header="Valor nominal">
                  <template #body="slotProps">
                    <span>{{ formatCurrency(slotProps.data.valor_nominal) }}</span>
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
  font-size: 25px !important;
  text-align: center !important;
}
</style>
