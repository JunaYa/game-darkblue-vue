const scale = 20;
const width = 644;
const height = 375;
let baseWidth = 10;
let baseHeight = 10;

function drawPixle(ctx, x, y, pixle, dom) {
    const startX = x * pixle.width - dom.scrollLeft;
    const startY = y * pixle.height - dom.scrollTop;
    ctx.fillStyle = pixle.color;
    ctx.fillRect(startX, startY, pixle.width, pixle.height);
}

function drawBackground(ctx) {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, width, height);
}

function drawActors(ctx, actors, dom) {
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
                drawPixle(ctx, actor.pos.x, actor.pos.y, coin, dom);
                break;
            case "player":
                const startX = actor.pos.x * hero.width;
                const startY = actor.pos.y * hero.height;
                ctx.fillStyle = hero.color;
                ctx.fillRect(
                    startX - dom.scrollLeft,
                    startY - dom.scrollTop,
                    hero.width,
                    (hero.height * 3) / 2
                );
                break;
            case "lava":
                drawPixle(ctx, actor.pos.x, actor.pos.y, lava, dom);
                break;
        }
    });
}

function drawWalls(ctx, level, dom) {
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
            switch (pixel.type) {
                case "wall":
                    drawPixle(ctx, x, y, wall, dom);
                    break;
                case "magma":
                    drawPixle(ctx, x, y, lava, dom);
                    break;
            }
        });
    });
}

export default class DOMDisplay {
    constructor(ctx, level) {
        console.log(level);
        this.ctx = ctx;
        this.level = level;
        baseHeight = Math.floor(height / level.height);
        baseWidth = baseHeight;
        this.dom = {
            scrollLeft: 0,
            scrollTop: 0
        };
    }
    clear() {
        this.ctx.clearRect(0, 0, width, height);
    }
    resetDom() {
        this.dom = {
            scrollLeft: 0,
            scrollTop: 0
        };
    }
}

DOMDisplay.prototype.setState = function(state) {
    this.clear();
    drawBackground(this.ctx);
    drawActors(this.ctx, state.actors, this.dom);
    drawWalls(this.ctx, this.level, this.dom);
    this.resetDom();
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
};

DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
    let marginH = width / 6;
    let marginV = height / 8;

    // The viewport
    let left = this.dom.scrollLeft;
    let right = left + width;
    let top = this.dom.scrollTop;
    let bottom = top + height;

    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5)).times(scale);

    if (center.x < left + marginH) {
        this.dom.scrollLeft = center.x - marginH;
    } else if (center.x > right - marginH) {
        this.dom.scrollLeft = center.x + marginH - width;
    }
    if (center.y < top + marginV) {
        this.dom.scrollTop = center.y - marginV;
    } else if (center.y > bottom - marginV) {
        this.dom.scrollTop = center.y + marginV - height;
    }

    this.dom.scrollLeft = Math.round(this.dom.scrollLeft);
    this.dom.scrollTop = Math.round(this.dom.scrollTop);
};
