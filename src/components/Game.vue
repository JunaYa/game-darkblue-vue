<template>
  <div ref="main">
  </div>
</template>

<script>
import Level from "../js/Level.js";
import DOMDisplay from "../js/DOMDisplay.js";
import State from "../js/State.js";
const levelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

export default {
    name: "Game",
    mounted() {
        let simpleLevel = new Level(levelPlan);
        let display = new DOMDisplay(this.$refs.main, simpleLevel);
        console.log(simpleLevel);
        display.setState(State.start(simpleLevel));
    }
};
</script>

<style>
.background {
    background: rgb(140, 140, 140);
    table-layout: fixed;
    border-spacing: 0;
}

.background td {
    padding: 0;
}

.game {
    overflow: hidden;
    max-width: 600px;
    max-height: 450px;
    position: relative;
}

.lava {
    background: rgb(255, 100, 100);
}

.wall {
    background: white;
}

.actor {
    position: absolute;
}

.coin {
    background: rgb(241, 229, 89);
}

.player {
    background: rgb(64, 64, 64);
}

.won .player {
    box-shadow: -4px -7px 8px white, 4px -7px 8px white;
}

.lost .player {
    background: rgb(160, 64, 64);
}
</style>
