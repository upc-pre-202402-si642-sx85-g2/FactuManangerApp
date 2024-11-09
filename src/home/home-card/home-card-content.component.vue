<script>
import { LetraService } from "../../services/letra.service.js";
import { Letra } from "../../models/letra.entity.js";

export default {
  name: "home-card-content",
  data() {
    return {
      letras: [],
      letrasApiService: new LetraService(),
      lastLetra: null,
      cantidadLetras: 0,
      valorNominalTotal: 0
    };
  },
  async created() {
    try {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }

      // Fetch cartera
      const carteraResponse = await this.letrasApiService.getCarteraByUserId(userId);
      const cartera = carteraResponse.data[0];
      this.cantidadLetras = cartera.cantidad_letras;
      this.valorNominalTotal = cartera.valor_nominal_total;

      // Fetch letras
      const letrasResponse = await this.letrasApiService.getLetrasByCarteraId(cartera._id);
      this.letras = letrasResponse.data.map((letra, index) => {
        const formattedLetra = new Letra(
            index + 1, // Set the letter number as its position
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
        return formattedLetra;
      });
      if (this.letras.length > 0) {
        this.lastLetra = this.letras[this.letras.length - 1];
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);
    },
    formatDate(date) {
      return new Date(date).toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="title">
      <h1 class="blue-text section-title">Bienvenido !!</h1>
    </div>
    <!-- Sección Cantidad de Letras y Valor Nominal -->
    <div class="section">
      <div class="card-content-grid-sold">
        <div class="card-item special-card">
          <h2 class="black-text no-wrap">Cantidad de Letras</h2>
          <div class="card">
            <h2 class="black-text">{{ cantidadLetras }}</h2>
          </div>
        </div>
        <div class="card-item special-card">
          <h2 class="black-text no-wrap">Valor Nominal</h2>
          <div class="card">
            <h2 class="black-text">{{ formatCurrency(valorNominalTotal) }}</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- Sección Última Letra Agregada -->
    <div class="section">
      <h1 class="black-text section-title">Última Letra Agregada</h1>
      <div v-if="lastLetra" class="card">
        <div class="card-content-grid">
          <div class="card-item">
            <h2 class="blue-text no-wrap">Nro. Letra</h2>
            <h2 class="black-text">{{ lastLetra._id }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Razón social</h2>
            <h2 class="black-text">{{ lastLetra.razon_social }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Fecha de emisión</h2>
            <h2 class="black-text">{{ lastLetra.fecha_emision }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Fecha de vencimiento</h2>
            <h2 class="black-text">{{ lastLetra.fecha_vencimiento }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Fecha de descuento</h2>
            <h2 class="black-text">{{ lastLetra.fecha_descuento }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Valor Nominal</h2>
            <h2 class="black-text">{{ formatCurrency(lastLetra.valor_nominal) }}</h2>
          </div>
        </div>
      </div>
      <div v-else class="card">
        <h2 class="black-text">Actualmente no ha agregado ninguna Letra/Facturado</h2>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  flex-direction: column;
  margin-left: 400px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
}

.section {
  margin-bottom: 60px; /* Space between sections */
}

.section-title {
  margin-bottom: 20px; /* Space between title and card */
  text-align: center; /* Center the title */
}

.card {
  background-color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 50px;
  width: 100%; /* Adjust width to 100% */
}

.card-content-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px;
}

.special-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center; /* Center text within the card */
}

.special-card h2 {
  margin: 15px 0;
  font-size: 50px; /* Increase text size */
}

.card-content-grid-sold {
  display: flex;
  flex-wrap: wrap; /* Ensure responsiveness */
  justify-content: center; /* Center the cards */
  gap: 20px; /* Space between cards */
}

@media (max-width: 1700px) {
  .card-content-grid-sold {
    gap: 10px; /* Reduce gap between cards */
  }
  .special-card h2{
    font-size: 30px;
  }

  .special-card {
    width: 45%; /* Shrink the cards */
  }
}
@media (max-width: 1500px) {
  .container {
    margin-left: auto;
  }
}
@media (max-width: 1024px) {
  .card-content-grid {
    grid-template-columns: repeat(2, 1fr); /* Adjust to 2 columns on small screens */
  }

  .special-card {
    width: 100%; /* Full width on small screens */
  }
}

@media (max-width: 768px) {
  .card-content-grid {
    grid-template-columns: 1fr; /* Collapse to 1 column on very small screens */
  }

  .special-card {
    width: 100%; /* Full width on small screens */
  }
}

.card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-item h2 {
  margin: 15px 0;
}

.blue-text {
  color: #4A79F7;
}

.black-text {
  color: #333333;
}

.no-wrap {
  white-space: nowrap;
}
</style>