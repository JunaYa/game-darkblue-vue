<template>
    <div>
        <canvas 
            id="canvas" 
            ref="canvas" 
            width="644" 
            height="375" >
        </canvas>
    </div>
</template>

<script>
import GAME_LEVELS from "../js/levels.js";
import Game from "../js/Game.js";

export default {
    name: "GameCanvas",
    mounted() {
        Game.run(this.$refs.canvas, GAME_LEVELS.plans);
    }
};
</script>

<style>
</style>
