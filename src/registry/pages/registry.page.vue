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
  padding-left: 15%;
}

.content {
  height: 80%;
  margin: auto;
}
</style>