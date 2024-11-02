<script>
import emptyPortfolio from "../components/empty-portfolio.component.vue";
import letterList from "../components/letter-list.component.vue";
import newLetter from "../components/new-letter.component.vue";
import { LetraService } from "../../services/letra.service.js";

export default {
  name: "Portfolio",
  components: {
    emptyPortfolio,
    letterList,
    newLetter,
  },
  data() {
    return {
      letters: [],
      showModal: false,
      letrasApiService: new LetraService(),
    };
  },
  async created() {
    try {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in session storage');
      }

      // Fetch cartera
      const carteraResponse = await this.letrasApiService.getCarteraByUserId(userId);
      const cartera = carteraResponse.data[0];

      // Fetch letras
      const letrasResponse = await this.letrasApiService.getLetrasByCarteraId(cartera._id);
      this.letters = letrasResponse.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
    <div class="content">
      <emptyPortfolio v-if="letters.length === 0" @add-letter="openModal"/>
      <letter-list v-else :letters="letters" @add-letter="openModal"/>
    </div>

    <new-letter v-if="showModal" class="new-letter-modal" @submit="addLetter"/>
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