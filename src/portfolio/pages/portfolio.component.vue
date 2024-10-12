<script>
import emptyPortfolio from "../components/empty-portfolio.component.vue";
import letterList from "../components/letter-list.component.vue";
import newLetter from "../components/new-letter.component.vue";
import sidebar from "../../public/sidebar.component.vue";

export default {
  name: "Portfolio",
  components: {
    sidebar,
    emptyPortfolio,
    letterList,
    newLetter,
  },
  data() {
    return {
      letters: [],
      showModal: false,
    };
  },
  methods: {
    addLetter(letter) {
      console.log('letra letra', letter);
      this.letters.push(letter);
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
  },
};
</script>

<template>
  <div class="portfolio-container">
    <sidebar />

    <div class="content">
      <empty-portfolio v-if="letters.length === 0" @add-letter="openModal" />
      <letter-list v-else :letters="letters" @add-letter="openModal" />
    </div>

    <new-letter v-if="showModal" class="new-letter-modal" @submit="addLetter" />
  </div>
</template>


<style scoped>
.portfolio-container {
  display: flex;
  height: 100vh;
}

.content {
  margin: auto;
  width: 100%;
}

</style>
