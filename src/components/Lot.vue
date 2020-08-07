<template>
  <td
    :class="getClass(bomb)"
    @click="leftClicked(bomb)"
    @contextmenu.prevent="rightClicked(bomb)"
  >{{ text }}</td>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Bomb } from "../game";

const textBomb = "💣";
const textPinned = "📌";

export default defineComponent({
  props: {
    bomb: Object as PropType<Bomb>,
  },
  setup(props, { emit }) {
    const bomb = props.bomb;
    const nearby = computed(() => `${bomb.nearByBombs}`);
    const xy = computed(() => `${bomb.x}/${bomb.y}`);

    const getText = (bomb: Bomb) => {
      if (!bomb.hidden && bomb.bomb) {
        return textBomb;
      }
      if (bomb.pinned) {
          return textPinned;
      }
      if (bomb.hidden) {
          return ''
      }
      return `${bomb.nearByBombs}`;
    };

    const text = computed(() => getText(bomb));

    const getClass = (bomb: Bomb) => {
      return {
   //     bomb: bomb.bomb,
      };
    };

    const leftClicked = (bomb: Bomb) => {
        emit('left-click', bomb);
    };

    const rightClicked = (bomb: Bomb) => {
        emit('right-click', bomb);
    };

    return {
      text: text,
      getClass,
      leftClicked,
      rightClicked,
    };
  },
});
</script>
<style scoped>
td {
  border: 1px solid blue;
  width: 30px;
  height: 30px;
  
}
.bomb {
  background: tomato;
}
</style>