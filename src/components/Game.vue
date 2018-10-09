<template>
  <div ref="main">
  </div>
</template>

<script>
import Level from "../js/Level.js";
import DOMDisplay from "../js/DOMDisplay.js";
import State from "../js/State.js";
import GAME_LEVELS from "../js/levels.js";

function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type == "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
}

const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
        let stop = false;
        if (lastTime != null) {
            let timeStep = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function runLevel(parent, level, Display) {
    let display = new DOMDisplay(parent, level);
    let state = State.start(level);
    let ending = 1;
    return new Promise(resolve => {
        runAnimation(time => {
            state = state.update(time, arrowKeys);
            display.setState(state);
            if (state.status == "playing") {
                return true;
            } else if (ending > 0) {
                ending -= time;
                return true;
            } else {
                display.clear();
                resolve(state.status);
                return false;
            }
        });
    });
}

async function runGame(parent, plans, Display) {
    for (let level = 0; level < plans.length; ) {
        let status = await runLevel(parent, new Level(plans[level]), Display);
        if (status == "won") {
            level++;
        }
    }
}

export default {
    name: "Game",
    mounted() {
        runGame(this.$refs.main, GAME_LEVELS.plans, DOMDisplay);
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
