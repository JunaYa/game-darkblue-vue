import Vec from './Vec';
import Player from './Player';
import Coin from './Coin';
import Lava from './Lava';

const levelChars = {
    '.' : 'empty',
    '#' : 'wall',
    '+' : 'lava',
    '@' : Player,
    'o' : Coin,
    '=' : Lava,
    '|' : Lava,
    'v' : Lava,
};

export default class Level {
    constructor(plan) {
        let rows = plan.trim().split(/\n/).map(l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];
        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if( typeof type == 'string' ) {
                    return type;
                }
                this.startActors.push(type.create(new Vec(x,y), ch));
                console.log(this.startActors);
                return 'empty';
            });
        })
    }
}