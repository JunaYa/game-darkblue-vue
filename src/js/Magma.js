import Vec from "./Vec";

export default class Magama {
    constructor(pos, basePos) {
        this.pos = pos;
        this.basePos = basePos;
    }
    get type() {
        return 'magma';
    }
    static create(pos) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Magama(pos, basePos);
    }
}

Magama.prototype.size = new Vec(0.6, 0.6);

Magama.prototype.update = function(dom) {
    let pos = new Vec(
        this.pos.x - dom.scrollLeft,
        this.pos.y - dom.scrollRight
    );
    return new Magama(
        pos,
        pos.plus(new Vec(0.2, 0.1)),
    );
};
