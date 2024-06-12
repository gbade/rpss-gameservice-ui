<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg max-w-[600px] mx-auto my-10">
    <table class="w-full bg-white text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase">
        <tr>
          <th scope="col" class="px-6 py-3 bg-gray-50">
           🕛
          </th>
          <th scope="col" class="px-6 py-3">
            Player
          </th>
          <th scope="col" class="px-6 py-3 bg-gray-50">
            Computer
          </th>
          <th scope="col" class="px-6 py-3">
            Result
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in scores" :key="game.timestamp">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(game.timestamp)) }}
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <span class="inline-flex items-center justify-center px-2 py-1 text-2xl font-bold leading-none text-green-100 rounded-full">
            {{ icons[game.player] }}
          </span>

        </td>

        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <span class="inline-flex items-center justify-center px-2 py-1 text-2xl font-bold leading-none text-red-100 rounded-full">
            {{ icons[game.computer] }}
          </span>
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <span class="inline-flex items-center justify-center px-2 py-1  font-bold leading-none rounded-full" :class="resultClass(game.result.toLowerCase())"
          >
            {{ game.result.toUpperCase() }}
          </span>
        </td>

      </tr>
      </tbody>
    </table>
    
    <div class="flex justify-center gap-4 my-4 mx-2">
      <button v-if="scores.length > 0" class="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded" @click="resetScores">Reset Scoreboard</button>

      <button class="bg-transparent hover:bg-green-500 text-black-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded" @click="fetchScores">Refresh Scoreboard</button>
    </div>
  </div>

</template>

<script>

import api from '../api';

export default {
  data() {
    return {
      scores: [],
      icons: {
        1: '✊',
        2: '✋',
        3: '✌️',
        4: '🦎',
        5: '🖖',
      },
    };
  },
  created() {
    this.fetchScores();
  },
  methods: {
    async fetchScores() {
      try {
        const response = await api.getScores();
        this.scores = response;
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    },
    async resetScores() {
      try {
        await api.resetScores();
        this.scores = await api.getScores();
      } catch (error) {
        console.error('Error resetting scores:', error);
      }
    },
    resultClass(result) {
      const colors = {
        win: 'text-green-500',
        lose: 'text-red-500',
      };
      return colors[result] || 'text-black';
    },
  },
};
</script>
