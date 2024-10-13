<script>
import HomeCardContent from "../home-card/home-card-content.component.vue";
import sidebar from "../../public/sidebar.component.vue";

export default {
  name: "home-content",
  components: {sidebar, HomeCardContent}
}
</script>

<template>
  <div class="container">
    <!--<sidebar></sidebar> cambiale de nombre oe-->
    <sidebar></sidebar>
    <home-card-content></home-card-content>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

@media (max-width: 767px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    display: none;
  }

  .toggle-sidebar {
    display: block;
    margin: 10px;
  }
}
@media (max-width: 1026px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    display: none;
  }

  .toggle-sidebar {
    display: block;
    margin: 10px;
  }
}

@media (min-width: 768px) {
  .toggle-sidebar {
    display: none;
  }
}
@media (min-width: 1026px) {
  .toggle-sidebar {
    display: none;
  }
}
home-card-content {
  margin-left: auto;
}

</style>