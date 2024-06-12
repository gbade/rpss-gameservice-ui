<template>
  <div class="w-full">
    <h2 class="my-4 text-center text-xl">Choose your move:</h2>
    <div class="flex justify-center gap-4 mx-6 flex-wrap">
      <div class="flex flex-col gap-3" v-for="choice in choices" :key="choice.id">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-6 px-10 border-b-4 border-gray-700 hover:border-gray-500 rounded flex flex-col items-center justify-center"
          @click="playGame(choice.id)"><span>{{ choice.name }}</span> <span class="text-3xl text-red-400">{{
            icons[choice.id] }}</span>
        </button>
      </div>
    </div>
    <div class="my-12" v-if="result">
      <div class="flex mx-auto px-4 max-w-[600px] justify-between align-middle items-center">
        <div class="text-3xl font-semibold">
          <h3>You</h3>
          <span>{{ icons[result.player] }}</span>
        </div>
        <div style="font-family: 'Monoton', cursive;" class="text-lg font-bold">
        <span>{{ result.result }}</span>
      </div>
        <div class="text-3xl font-semibold">
          <h3>Computer</h3>
          <span>{{ icons[result.computer] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      choices: [],
      result: null,
      icons: {
        1: '✊',
        2: '✋',
        3: '✌️',
        4: '🦎',
        5: '🖖',
      }
    };
  },
  created() {
    this.fetchChoices();
  },
  methods: {
    async fetchChoices() {
      try {
        const response = await api.getChoices();
        console.log('Choices:', response);
        this.choices = response;
      } catch (error) {
        console.error('Error fetching choices:', error);
      }
    },
    async playGame(playerChoice) {
      try {
        const response = await api.playGame(playerChoice);

        console.log('Result:', response);
        this.result = response;
      } catch (error) {
        console.error('Error playing game:', error);
      }
    },
  },
};
</script>
