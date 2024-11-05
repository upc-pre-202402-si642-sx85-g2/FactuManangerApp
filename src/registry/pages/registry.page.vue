<script>
import EmptyRegistry from "../components/empty-registry.component.vue";
import RegistryTable from "../components/registry-table.component.vue";
import { OperationService } from "../../services/operation.service.js";

export default {
  name: "registry",
  components: { RegistryTable, EmptyRegistry },
  data() {
    return {
      letters: []
    };
  },
  mounted() {
    this.fetchOperations();
  },
  methods: {
    async fetchOperations() {
      const operationService = new OperationService();
      try {
        const response = await operationService.getAllOperations();
        this.letters = response.data;
      } catch (error) {
        console.error('Error fetching operations:', error);
      }
    }
  }
};
</script>

<template>
  <div class="registry-container">
    <div class="content">
      <h1 style="text-align: center">Registro de Venta de Letra</h1>
      <empty-registry v-if="letters.length === 0" />
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