<script>
import { letra } from "../../models/letra.entity.js";
import { LetraService } from "../../services/letra.service.js";

export default {
  name: "home-card-content",
  data() {
    return {
      letras: [],
      letrasApiService: new LetraService(),
      lastLetra: null,
      lastSoldLetra: null
    };
  },
  async created() {
    const response = await this.letrasApiService.getLetra();
    this.letras = response.data.map(item => new letra(
        item.Bank,
        item.FaceValue,
        item.TEA,
        item.TCEA,
        item.Period,
        item.TEP,
        item.DiscountRate,
        item.DeliveredValue,
        item.ReceivedValue,
        item.Number,
        item.RUC,
        item.EmissionDate,
        item.ExpirationDate,
        item.DiscountDate,
        item.Sold
    ));
    const soldLetra = this.letras.filter(letra => letra.sold === true);
    if (soldLetra.length > 0) {
      this.lastSoldLetra = soldLetra[soldLetra.length - 1];
    }
    if (this.letras.length > 0) {
      this.lastLetra = this.letras[this.letras.length - 1];
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);
    }
  }
};
</script>
<template>
  <div class="container">
    <div class="title">
      <h1 class="blue-text section-title">Bienvenido !!</h1>
    </div>
    <!-- Sección Última Letra Vendida -->
    <div class="section">
      <h1 class="black-text section-title">Última Letra Vendida</h1>
      <div v-if="lastSoldLetra" class="card">
        <div class="card-content-grid-sold">
          <div class="card-item">
            <h2 class="blue-text no-wrap">Banco</h2>
            <h2 class="black-text">{{ lastSoldLetra.bank }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Valor Nominal</h2>
            <h2 class="black-text">{{ formatCurrency(lastSoldLetra.faceValue) }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">TEA</h2>
            <h2 class="black-text">{{ lastSoldLetra.tea }}%</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">TCEA</h2>
            <h2 class="black-text">{{ lastSoldLetra.tcea }}%</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Período en días</h2>
            <h2 class="black-text">{{ lastSoldLetra.period }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">TEP</h2>
            <h2 class="black-text">{{ lastSoldLetra.tep }}%</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Tasa descontada</h2>
            <h2 class="black-text">{{ lastSoldLetra.discountRate }}%</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Valor Entregado</h2>
            <h2 class="black-text">{{ formatCurrency(lastSoldLetra.deliveredValue) }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Valor Recibido</h2>
            <h2 class="black-text">{{ formatCurrency(lastSoldLetra.receivedValue) }}</h2>
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
            <h2 class="black-text">{{ lastLetra.number }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Razón social</h2>
            <h2 class="black-text">{{ lastLetra.ruc }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Fecha de emisión</h2>
            <h2 class="black-text">{{ lastLetra.emissionDate }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Fecha de vencimiento</h2>
            <h2 class="black-text">{{ lastLetra.expirationDate }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Fecha de descuento</h2>
            <h2 class="black-text">{{ lastLetra.discountDate }}</h2>
          </div>
          <div class="card-item">
            <h2 class="blue-text no-wrap">Valor Nominal</h2>
            <h2 class="black-text">{{ formatCurrency(lastLetra.faceValue) }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 23.5rem;
  padding: 20px;
  flex-direction: column;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
}

.section {
  margin-bottom: 60px; /* Espacio entre las secciones */
}

.section-title {
  margin-bottom: 20px; /* Espacio entre el título y la tarjeta */
  text-align: center; /* Centrar el título */
  margin-left: 10rem;
}

.card {
  background-color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 50px;
  width: 120%;
}

.card-content-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px;
}

.card-content-grid-sold {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 40px;
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

@media (max-width: 1804px) {
  .card-content-grid {
    grid-template-columns: repeat(4, 1fr); /* Ajustar a 4 columnas en pantallas medianas */
  }
  .card-content-grid-sold {
    grid-template-columns: repeat(4, 1fr); /* Ajustar a 4 columnas en pantallas medianas */
  }
  .container {
    margin: 0 320px; /* Ajustar el margen para dejar espacio para el sidebar */
  }
}

@media (max-width: 1430px) {
  .card-content-grid {
    grid-template-columns: repeat(3, 1fr); /* Ajustar a 3 columnas en pantallas medianas */
  }
  .card-content-grid-sold {
    grid-template-columns: repeat(3, 1fr); /* Ajustar a 3 columnas en pantallas medianas */
  }
  .container {
    margin: 0 320px; /* Ajustar el margen para dejar espacio para el sidebar */
  }
}

@media (max-width: 1220px) {
  .card-content-grid {
    grid-template-columns: repeat(2, 1fr); /* Ajustar a 2 columnas en pantallas medianas */
  }
  .card-content-grid-sold {
    grid-template-columns: repeat(2, 1fr); /* Ajustar a 2 columnas en pantallas medianas */
  }
  .container {
    margin: 0 320px; /* Ajustar el margen para dejar espacio para el sidebar */
  }
}

@media (max-width: 1024px) {
  .card-content-grid {
    grid-template-columns: repeat(2, 1fr); /* Ajustar a 2 columnas en pantallas pequeñas */
  }
  .card-content-grid-sold {
    grid-template-columns: repeat(2, 1fr); /* Ajustar a 2 columnas en pantallas pequeñas */
  }
  .container {
    margin: 0 auto;
  }
}

@media (max-width: 1000px) {
  .container {
    display: none; /* Ocultar el contenido principal en pantallas pequeñas */
  }
}

@media (max-width: 768px) {
  .card-content-grid {
    grid-template-columns: 1fr; /* Ajustar a 1 columna en pantallas muy pequeñas */
  }
  .card-content-grid-sold {
    grid-template-columns: 1fr; /* Ajustar a 1 columna en pantallas muy pequeñas */
  }
  .container {
    margin: 0 auto;
  }
}
</style>





