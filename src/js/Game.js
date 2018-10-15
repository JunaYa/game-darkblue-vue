import Level from "../js/Level.js";
import State from "../js/State.js";
import DOMDisplay from "../js/DOMDisplay.js";

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

function runLevel( ctx, level) {
    let display = new DOMDisplay(ctx, level);
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

async function run(ctx, plans) {
    for (let level = 0; level < plans.length; ) {
        let status = await runLevel(ctx, new Level(plans[level]));
        if (status == "won") {
            level++;
        }
    }
}

export default {
    run,
}