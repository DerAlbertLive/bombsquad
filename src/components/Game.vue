<template>
    <h2>Der Minesweeper Clone</h2>
    <table>
        <tr v-for="(row,y) in game.field" :key="y">
            <lot v-for="(bomb,x) in row" :key="x" :bomb="bomb"/>
        </tr>
    </table>
    {{ game.field.length }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Lot from './Lot.vue'

export default defineComponent({
    components: {
        Lot
    },
    props: ['game']
})
</script>

<style scoped>
    table {
        border: 1px solid red;
        padding: 0;

    }
</style>