<template>
  <h2>Der Minesweeper Clone</h2>
  <table>
    <tr v-for="(row,y) in game.field" :key="y">
      <lot v-for="(bomb,x) in row" :key="x" :bomb="bomb" @left-click="leftClicked" @right-click="rightClicked" />
    </tr>
  </table>
  {{ game.field.length }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Lot from "./Lot.vue";
import { Bomb, useGame } from "../game";

export default defineComponent({
  components: {
    Lot,
  },
  props: ["game"],
  setup(props) {
      const game = useGame(props.game);

      return {
          leftClicked: game.leftClicked,
          rightClicked: game.rightClicked,
      }
  }
});
</script>

<style scoped>
table {
  border: 1px solid red;
  padding: 0;
}
</style>