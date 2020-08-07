
type Bomb = {
    bomb: boolean;
    flag: boolean;
    hidden: boolean;
    x: number;
    y: number;
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
        flag: false,
        hidden: true,
        x: -1,
        y: -1,
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
        rows.push(createBombRows(height, y));
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
        field[x][y].bomb = true;
    }
};

function createGame(size: number): Game {
    const newField = createField(size);
    fillWithRandomBombs(newField, 15);
    return {
        field: newField,
        gameOver: false,
    };
}

export {
    createGame,
    Bomb
}