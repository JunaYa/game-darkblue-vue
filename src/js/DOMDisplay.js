const scale = 20;
const width = 1024;
const height = 375;
let baseWidth = 10;
let baseHeight = 10;

function drawPixle(ctx, x, y, pixle) {
    const startX = x * pixle.width;
    const startY = y * pixle.height;
    ctx.fillStyle = pixle.color;
    ctx.fillRect(startX, startY, pixle.width, pixle.height);
}

function drawBackground(ctx) {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, width, height);
}

function drawActors(ctx, actors) {
    const coin = {
        width: baseWidth,
        height: baseHeight,
        color: "#00ff00"
    };
    const hero = {
        width: baseWidth,
        height: baseHeight,
        color: "#0000ff"
    };
    const lava = {
        width: baseWidth,
        height: baseHeight,
        color: "#ff0000"
    };
    actors.map(actor => {
        switch (actor.type) {
            case "coin":
                drawPixle(ctx, actor.pos.x, actor.pos.y, coin);
                break;
            case "player":
                const startX = actor.pos.x * hero.width;
                const startY = actor.pos.y * hero.height;
                ctx.fillStyle = hero.color;
                ctx.fillRect(startX, startY, hero.width, (hero.height * 3) / 2);
                break;
            case "lava":
                drawPixle(ctx, actor.pos.x, actor.pos.y, lava);
                break;
        }
    });
}

function drawWalls(ctx, level) {
    const wall = {
        width: baseWidth,
        height: baseHeight,
        color: "#ffffff"
    };
    const lava = {
        width: baseWidth,
        height: baseHeight,
        color: "#ff0000"
    };
    level.rows.map((row, y) => {
        return row.map((pixel, x) => {
            switch (pixel) {
                case "wall":
                    drawPixle(ctx, x, y, wall);
                    break;
                case "lava":
                    drawPixle(ctx, x, y, lava);
                    break;
            }
        });
    });
}

export default class DOMDisplay {
    constructor(ctx, level) {
        this.ctx = ctx;
        this.level = level;
        baseHeight = Math.floor(height / level.height);
        baseWidth = baseHeight;
    }
    clear() {
        this.ctx.clearRect(0, 0, width, height);
    }
}

DOMDisplay.prototype.setState = function(state) {
    this.clear();
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
