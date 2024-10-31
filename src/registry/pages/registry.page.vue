<script>
import EmptyRegistry from "../components/empty-registry.component.vue";
import RegistryTable from "../components/registry-table.component.vue";

export default {
  name: "registry",
  components: { RegistryTable, EmptyRegistry },
  data() {
    return {
      letters: [

      ]
    };
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