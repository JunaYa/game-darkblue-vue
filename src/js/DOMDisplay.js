const scale = 20;

function drawBackground(ctx) {
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, 1024, 375);
}

function drawActors(ctx, actors) {
    const coin = {
        width: 10,
        height: 10
    };
    const hero = {
        width: 10,
        height: 20
    };
    const lava = {
        width: 10,
        height: 10
    };
    let startX = 0;
    let startY = 0;
    actors.map(actor => {
        switch (actor.type) {
            case "coin":
                startX = actor.pos.x * coin.width;
                startY = actor.pos.y * coin.height;
                ctx.fillStyle = "#00ff00";
                ctx.fillRect(startX, startY, coin.width, coin.height);
                break;
            case "player":
                startX = actor.pos.x * hero.width;
                startY = actor.pos.y * hero.height;
                ctx.fillStyle = "#0000ff";
                ctx.fillRect(startX, startY, hero.width, hero.height);
                break;
            case "lava":
                startX = actor.pos.x * lava.width;
                startY = actor.pos.y * lava.height;
                ctx.fillStyle = "#ff0000";
                ctx.fillRect(startX, startY, lava.width, lava.height);
                break;
        }
    });
}

function drawWalls(ctx, level) {
    const wall = {
        width: 10,
        height: 10
    };
    ctx.fillStyle = "#ffffff";
    let startX = 0;
    let startY = 0;
    level.rows.map((row, y) => {
        return row.map((pixel, x) => {
            startX = x * wall.width;
            startY = y * wall.height;
            if (pixel === "wall") {
                ctx.fillRect(startX, startY, wall.width, wall.height);
            }
        });
    });
}

export default class DOMDisplay {
    constructor(ctx, level) {
        this.ctx = ctx;
        this.level = level;
        console.log(level);
    }
    clear() {
        this.ctx.clearRect(0, 0, 1024, 375);
    }
}

DOMDisplay.prototype.setState = function(state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.ctx.clearRect(0, 0, 1024, 375);
    drawBackground(this.ctx);
    drawActors(this.ctx, state.actors);
    drawWalls(this.ctx, this.level);
    // this.dom.className = `game ${state.status}`;
    // this.scrollPlayerIntoView(state);
};

DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;

    // The viewport
    let left = this.dom.scrollLeft;
    let right = left + width;
    let top = this.dom.scrollTop;
    let bottom = top + height;

    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5)).times(scale);

    if (center.x < left + margin) {
        this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
        this.dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
        this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
        this.dom.scrollTop = center.y + margin - height;
    }
};
