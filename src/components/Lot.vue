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

export default defineComponent({
  props: {
    bomb: Object as PropType<Bomb>,
  },
  setup(props) {
    const bomb = props.bomb;
    const text = computed(() => `${bomb?.x}/${bomb?.y}`);

    const getClass = (bomb: Bomb) => {
      return {
        bomb: bomb.bomb,
      };
    };

    const leftClicked = (bomb: Bomb) => {
      bomb.bomb = true;
    };

    const rightClicked = (bomb: Bomb) => {
      bomb.bomb = false;
    };

    return {
      text,
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
  width: 20px;
  height: 20px;
}
.bomb {
  background: tomato;
}
</style>