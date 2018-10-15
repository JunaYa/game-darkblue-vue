<template>
    <div>
        <canvas id="canvas" ref="canvas"></canvas>
        <div>

        </div>
    </div>
</template>

<script>
import GAME_LEVELS from "../js/levels.js";
import Game from "../js/Game.js";

export default {
    name: "GameCanvas",
    mounted() {
        let canvas = this.$refs.canvas;
        canvas.width = 1024;
        canvas.height = 375;
        let ctx = this.$refs.canvas.getContext("2d");
        Game.run(ctx, GAME_LEVELS.plans);
    }
};
</script>

<style>
</style>
