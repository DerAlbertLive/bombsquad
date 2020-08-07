
type Bomb = {
    bomb: boolean;
    pinned: boolean;
    hidden: boolean;
    x: number;
    y: number;
    nearByBombs: number;
}

type BombsRow = Bomb[];

type BombField = BombsRow[];

type Game = {
    field: BombField;
    gameOver: boolean;
}

const createBomb = (): Bomb => {
    return {
        bomb: false,
        pinned: false,
        hidden: true,
        x: -1,
        y: -1,
        nearByBombs: 0
    };
}

const createBombRows = (width: number, y: number): BombsRow => {
    const row: BombsRow = [];
    for (let x = 0; x < width; x++) {
        const newBomb = createBomb();
        newBomb.x = x;
        newBomb.y = y;
        row.push(newBomb);
    }
    return row;
}

const createField = (height: number): BombsRow[] => {
    const rows: BombsRow[] = [];
    for (let y = 0; y < height; y++) {
        rows.push(createBombRows(height + 5, y));
    }
    return rows;
}

const fillWithRandomBombs = (field: BombField, count: number) => {
    const height = field.length;
    const width = field[0].length;
    const maxLot = height * width;

    const bombLots: number[] = [];

    while (bombLots.length < count) {
        const lot = Math.floor(Math.random() * maxLot);
        if (bombLots.indexOf(lot) < 0) {
            bombLots.push(lot)
        }
    }

    for (let lot of bombLots) {
        const y = Math.floor(lot / width);
        const x = Math.floor(lot % width)
        field[y][x].bomb = true;
    }
};

const positions = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
]

const calculateNearByBombs = (field: BombField) => {
    const height = field.length;
    const width = field[0].length;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            countBombs(x, y);
        }
    }

    function countBombs(x: number, y: number) {
        const currentBomb = field[y][x];
        if (!currentBomb.bomb) {
            return;
        }

        for (let position of positions) {
            const xc = x + position.x;
            const yc = y + position.y;
            if (xc >= 0 && xc < width && yc >= 0 && yc < height) {
                const countBomb = field[yc][xc];
                if (!countBomb.bomb) {
                    countBomb.nearByBombs++;
                }
            }
        }
    }
}

function createGame(size: number, bombs: number): Game {
    const newField = createField(size);
    fillWithRandomBombs(newField, bombs);
    calculateNearByBombs(newField);
    return {
        field: newField,
        gameOver: false,
    };
}


function useGame(game: Game) {
    const height = game.field.length;
    const width = game.field[0].length;

    const showBombLot = (x: number, y: number) => {
        const bomb = game.field[y][x];
        if (!bomb.hidden || bomb.nearByBombs > 0) {
            bomb.hidden = false;
            return;
        }
        bomb.hidden = false;
        for (let position of positions) {
            const xc = x + position.x;
            const yc = y + position.y;
            if (xc >= 0 && xc < width && yc >= 0 && yc < height) {
                const nearByLot = game.field[yc][xc];
                setTimeout(()=>{
                    showBombLot(nearByLot.x, nearByLot.y);
                }, 50);
            }
        }
    }

    const gameOver = () => {
        game.field.forEach(r=>r.forEach(b=>b.hidden = false));
        game.gameOver = true;
    }

    const leftClicked = (bomb: Bomb) => {
        if (bomb.bomb) {
            gameOver();
        }
        showBombLot(bomb.x, bomb.y);
    }

    const rightClicked = (bomb: Bomb) => {
        bomb.pinned = !bomb.pinned;
    }

    return {
        leftClicked,
        rightClicked,
    }

}

export {
    createGame,
    Lot as Bomb,
    useGame
}