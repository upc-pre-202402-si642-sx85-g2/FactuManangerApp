<script>
import emptyPortfolio from "../components/empty-portfolio.component.vue";
import letterList from "../components/letter-list.component.vue";
import newLetter from "../components/new-letter.component.vue";
import confirmationModal from "../components/confirmation-modal.component.vue";
import { LetraService } from "../../services/letra.service.js";

export default {
  name: "Portfolio",
  components: {
    emptyPortfolio,
    letterList,
    newLetter,
    confirmationModal,
  },
  data() {
    return {
      letters: [],
      showModal: false,
      showConfirmation: false,
      letrasApiService: new LetraService(),
      carteraId: null,
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
      this.carteraId = cartera._id;

      // Fetch letras
      const letrasResponse = await this.letrasApiService.getLetrasByCarteraId(cartera._id);
      this.letters = letrasResponse.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    addLetter(letter) {
      this.letters.push(letter);
      this.showModal = false;
      this.showConfirmation = true;
    },
    openModal() {
      this.showModal = true;
    },
    closeModal(){
      this.showModal = false;
    }
  },
};
</script>
<template>
  <div class="portfolio-container">
    <div class="content">
      <emptyPortfolio v-if="letters.length === 0" @add-letter="openModal"/>
      <letter-list v-else :letters="letters" @add-letter="openModal"/>
    </div>

    <new-letter v-if="showModal" :carteraId="carteraId" @submit="addLetter" @close="closeModal"/>
    <confirmation-modal v-if="showConfirmation" @close="showConfirmation = false" />
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
