<template>
  <h1>Boombsquad</h1>

  <game :game="game" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { defineComponent, reactive } from 'vue'
import { createGame } from './game'
import Game from './components/Game.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Game
  },
  setup() {
    const game = reactive(createGame(10, 20))
    return {
      game
    }
  }
});
</script>
