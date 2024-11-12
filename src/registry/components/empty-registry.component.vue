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
  background-color: white;
  color: black;
  font-family: Inter, Arial, sans-serif;
  padding: 20px;
  box-shadow: 0 5px 5px rgb(0, 0, 0, 0.2);
}

.registry{
  display: flex;
  flex-direction: column;
  gap: 3em;
  align-items: center;
  height: 100%;
}

@media (max-width: 768px) {
  .card {
    width: 70%;
  }

}

@media (max-width: 480px) {
  .card {
    width: 70%;
  }


}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>