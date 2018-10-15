<template>
  <div id="app">
    <Game v-if="false"/>
    <GameCanvas/>
  </div>
</template>

<script>
import Game from './components/Game.vue';
import GameCanvas from './components/GameCanvas';

export default {
  name: 'app',
  components: {
    Game,
    GameCanvas,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
