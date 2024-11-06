<script>
import operations from '../components/operations.component.vue';
import modalInstructions from '../components/modal.component.vue';
import { ref } from 'vue';

export default {
  name: 'operations-page',
  components: {
    operations,
    modalInstructions,
  },
  setup() {
    const selectedLetters = ref([]);
    const selectedBank = ref(null);
    const showModal = ref(false);
    const modalType = ref('');

    const handleSellLetter = (letters) => {
      selectedLetters.value = letters;
      if (letters.length > 0 && selectedBank.value) {
        modalType.value = 'success';
      } else {
        modalType.value = 'error';
      }
      showModal.value = true;
    };

    return {
      selectedLetters,
      selectedBank,
      showModal,
      modalType,
      handleSellLetter
    };
  }
};
</script>

<template>
  <operations v-model:selectedLetters="selectedLetters" v-model:selectedBank="selectedBank" @sellLetters="handleSellLetter"></operations>
  <modal-instructions :selected-letters="selectedLetters" v-if="showModal" :modal-type="modalType" @close-modal="showModal = false"></modal-instructions>
</template>
<style scoped>
</style>