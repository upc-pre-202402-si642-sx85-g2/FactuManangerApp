import { defineStore } from 'pinia';
import { LetraService } from '../services/letra.service.js';

export const useLetterStore = defineStore('letterStore', {
  state: () => ({
    letters: [],
    carteraId: null,
  }),
  actions: {
    async fetchLetters(userId) {
      const letrasApiService = new LetraService();
      try {
        const carteraResponse = await letrasApiService.getCarteraByUserId(userId);
        const cartera = carteraResponse.data[0];
        this.carteraId = cartera._id;

        const letrasResponse = await letrasApiService.getLetrasByCarteraId(cartera._id);
        this.letters = letrasResponse.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    addLetter(letter) {
      this.letters.push(letter);
    }
  }
});