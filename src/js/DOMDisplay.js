const scale = 20;
const width = 644;
const height = 375;
const baseWidth = 15;
const baseHeight = baseWidth;
let status = "";

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
        color: "#0000ff",
        lost: "#c90000",
        won: "#f5d865"
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

                if (status === "lost") {
                    ctx.fillStyle = hero.lost;
                } else if (status === "won") {
                    ctx.fillStyle = hero.won;
                } else {
                    ctx.fillStyle = hero.color;
                }

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
        this.dom = {
            scrollLeft: 0,
            scrollTop: 0
        };
        this.ctx = ctx;
        this.level = level;
        this.canvasWidth = baseWidth * level.width;
        this.canvasHeight = baseHeight * level.height;
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
    status = state.status;
    this.scrollPlayerIntoView(state);
};

DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
    let marginH = width / 6;
    let marginV = height / 8;

    // The viewport
    let left = 0;
    let right = left + width;
    let top = 0;
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

    if (this.dom.scrollLeft > this.canvasWidth - width + 2 * marginH) {
        this.dom.scrollLeft = this.canvasWidth - width;
    }
    if (this.dom.scrollTop > this.canvasHeight - height + 2 * marginV) {
        this.dom.scrollTop = this.canvasHeight - height;
    }
};
