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
      <p class="title">Registro de Venta de Letra</p>
      <empty-registry v-if="letters.length === 0" />
      <registry-table v-else :letters="letters" />
    </div>
  </div>
</template>

<style scoped>
.title{
  color: #435a97;
  font-family: 'Open Sans', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 40px;
  font-weight: bold;
  padding-top: 40px;
  text-align: center;
}
.registry-container {
  display: flex;
  justify-content: flex-end;
  height: 100vh;
  margin-left: 310px;
}

.content {
  height: 80%;
  margin: auto;
}

@media (max-width: 1449px) {
  .registry-container {
    margin-left: 0;
    padding: 20px;
  }
}

@media (max-width: 769px) {
  .card {
    margin-left: 0;
    width: 100%;
    padding: 10px;
    align-self: flex-start;
  }

}
</style>