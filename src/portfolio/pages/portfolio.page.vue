<script>
import { ref, watch } from 'vue';
import { useLetterStore } from '../../stores/letterStore';
import emptyPortfolio from "../components/empty-portfolio.component.vue";
import letterList from "../components/letter-list.component.vue";
import newLetter from "../components/new-letter.component.vue";
import confirmationModal from "../components/confirmation-modal.component.vue";

export default {
  name: "Portfolio",
  components: {
    emptyPortfolio,
    letterList,
    newLetter,
    confirmationModal,
  },
  setup() {
    const letterStore = useLetterStore();
    const showModal = ref(false);
    const showConfirmation = ref(false);
    const lettersKey = ref(0);

    const fetchLetters = async () => {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        await letterStore.fetchLetters(userId);
        lettersKey.value += 1; // Update key to force re-render
      }
    };

    const addLetter = async (letter) => {
      await letterStore.addLetter(letter);
      await fetchLetters();
      showModal.value = false;
      showConfirmation.value = true;
    };

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = async () => {
      showModal.value = false;
      await fetchLetters();
    };

    const refreshLetters = async () => {
      showConfirmation.value = false;
      await fetchLetters();
    };

    fetchLetters();

    return {
      letters: letterStore.letters,
      carteraId: letterStore.carteraId,
      showModal,
      showConfirmation,
      lettersKey,
      addLetter,
      openModal,
      closeModal,
      refreshLetters,
    };
  }
};
</script>
<template>
  <div class="portfolio-container">
    <div class="content">
      <emptyPortfolio v-if="letters.length === 0" @add-letter="openModal"/>
      <letter-list v-else :letters="letters" :key="lettersKey" @add-letter="openModal"/>
    </div>

    <new-letter v-if="showModal" :carteraId="carteraId" @submit="addLetter" @close="closeModal"/>
    <confirmation-modal v-if="showConfirmation" @refresh-letters="refreshLetters"/>
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