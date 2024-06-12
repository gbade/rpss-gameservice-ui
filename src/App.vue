<template>
  <div id="app"  class="min-h-screen"
  >
    <header class="w-full text-center my-6">
      <h1 class="text-3xl" style="font-family: 'Monoton', cursive;">Rock Paper Scissors Lizard Spock</h1>
    </header>
    <main class="">
      <GameComponent />
      <ScoreboardComponent />
    </main>
  </div>
</template>

<script>
import ScoreboardComponent from './components/ScoreboardComponent.vue';
import GameComponent from './components/GameComponent.vue';

export default {
  name: 'App',
  components: {
    GameComponent,
    ScoreboardComponent,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
