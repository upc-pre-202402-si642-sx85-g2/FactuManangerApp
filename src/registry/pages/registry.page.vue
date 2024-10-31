<script>
import emptyPortfolio from "../../portfolio/components/empty-portfolio.component.vue";
import RegistryTable from "../components/registry-table.component.vue";

export default {
  name: "registry",
  components: { RegistryTable, emptyPortfolio },
  data() {
    return {
      letters: [
        {
          bank: "BCP",
          nominalValue: 1000,
          tea: 5.0,
          tcea: 5.5,
          periodInDays: 30,
          tep: 0.5,
          discountedRate: 4.5,
          deliveredValue: 950,
          receivedValue: 1000
        },
        {
          bank: "Interbank",
          nominalValue: 2000,
          tea: 6.0,
          tcea: 6.5,
          periodInDays: 60,
          tep: 0.6,
          discountedRate: 5.5,
          deliveredValue: 1900,
          receivedValue: 2000
        },
        {
          bank: "Scotiabank",
          nominalValue: 3000,
          tea: 7.0,
          tcea: 7.5,
          periodInDays: 90,
          tep: 0.7,
          discountedRate: 6.5,
          deliveredValue: 2850,
          receivedValue: 3000
        }
      ]
    };
  }
};
</script>

<template>
  <div class="registry-container">
    <div class="content">
      <h1 style="text-align: center">Registro de Venta de Letra</h1>
      <empty-portfolio v-if="letters.length === 0" />
      <registry-table v-else :letters="letters" />
    </div>
  </div>
</template>

<style scoped>
.registry-container {
  display: flex;
  justify-content: flex-end;
  height: 100vh;
  padding-left: 15%;
}

.content {
  height: 80%;
  margin: auto;
}
</style>