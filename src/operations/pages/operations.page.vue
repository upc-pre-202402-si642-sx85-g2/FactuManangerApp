<script>
import operations from '../components/operations.component.vue';
import modalInstructions from '../components/modal.component.vue';
import sidebar from "../../public/sidebar.component.vue";
import { ref } from 'vue';

export default {
  name: 'operations-page',
  components: {
    operations,
    modalInstructions,
    sidebar
  },
  setup() {
    const selectedLetters = ref([]);
    const showModal = ref(false);
    const modalType = ref('');

    const handleSellLetter = (letters) => {
      selectedLetters.value = letters;
      if (letters.length > 0) {
        modalType.value = 'success';
      } else {
        modalType.value = 'error';
      }
      showModal.value = true;
    };

    return {
      selectedLetters,
      showModal,
      modalType,
      handleSellLetter
    };
  }
};
</script>

<template>
  <sidebar></sidebar>
  <div class="operations-page">
    <operations v-model:selectedLetters="selectedLetters" @sell-letter="handleSellLetter"></operations>
    <modal-instructions :selected-letters="selectedLetters" v-if="showModal" :modal-type="modalType" @close-modal="showModal = false"></modal-instructions>
  </div>
</template>

<style scoped>
.operations-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>