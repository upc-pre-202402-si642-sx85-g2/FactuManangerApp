<script>
import sidebar from "./public/sidebar.component.vue";
import { useRoute } from 'vue-router';
import {computed} from "vue";

export default {
  components: {
    sidebar
  },
  setup() {
    const route = useRoute();

    const showSidebar = computed(() => {
      return !['/login', '/register', '/forget-password', '/recovery-password'].includes(route.path);
    });

    return {
      showSidebar
    };
  }
};
</script>

<template>
  <main>
    <sidebar v-if="showSidebar"></sidebar>
    <RouterView></RouterView>
  </main>
</template>


<style>
main {
  width: 100%;
}
</style>
