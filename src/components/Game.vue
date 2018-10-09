<template>
  <div ref="main">
  </div>
</template>

<script>
import GAME_LEVELS from "../js/levels.js";
import Game from "../js/Game.js";

export default {
    name: "Game",
    mounted() {
        Game.run(this.$refs.main, GAME_LEVELS.plans);
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
