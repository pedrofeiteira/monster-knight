const MAX_PAWNS_EASY = 6;
const MAX_PAWNS_NORMAL = 12;
const MAX_PAWNS_HARD = 16;

let knightPosition = [];
let savedKnightPosition = [];

let pawnsPosition = [];
let savedPawnsPosition = []; //In case the user makes a mistake and needs to restart the puzzle

let difficultyLevel = 'easy'; 

let observer = null;

export function startGame() {
    setPawnsPosition(); // This also initializes the knightPosition
}

export function restartGame() {
    pawnsPosition = savedPawnsPosition;
    knightPosition = savedKnightPosition;
    emitChange();
}

export function setDifficulty(difficulty) {
    difficultyLevel = difficulty;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getPossibleMoves(currentX, currentY) {
    let possibleMoves = [];

    //Check all cases of possible knight moves
    if(canPlacePawn(currentX + 2, currentY + 1, currentX, currentY)) {
        possibleMoves.push({x: currentX + 2, y: currentY + 1});
    }
    if(canPlacePawn(currentX + 2, currentY - 1, currentX, currentY)) {
        possibleMoves.push({x: currentX + 2, y: currentY - 1});
    }
    if(canPlacePawn(currentX + 1, currentY - 2, currentX, currentY)) {
        possibleMoves.push({x: currentX + 1, y: currentY - 2});
    }
    if(canPlacePawn(currentX + 1, currentY + 2, currentX, currentY)) {
        possibleMoves.push({x: currentX + 1, y: currentY + 2});
    }
    if(canPlacePawn(currentX - 2, currentY + 1, currentX, currentY)) {
        possibleMoves.push({x: currentX - 2, y: currentY + 1});
    }
    if(canPlacePawn(currentX - 2, currentY - 1, currentX, currentY)) {
        possibleMoves.push({x: currentX - 2, y: currentY - 1});
    }
    if(canPlacePawn(currentX - 1, currentY + 2, currentX, currentY)) {
        possibleMoves.push({x: currentX - 1, y: currentY + 2});
    }
    if(canPlacePawn(currentX - 1, currentY - 2, currentX, currentY)) {
        possibleMoves.push({x: currentX - 1, y: currentY - 2});
    }

    return possibleMoves;
}

export function setPawnsPosition() {
    let positions = [];
    //Pick random start position for first pawn
    let currentPieceX = getRandomInt(8);
    let currentPieceY = getRandomInt(8);
   
    let pawnsPlaced = 0;

    console.log(currentPieceX + ", " + currentPieceY );
    
    let hasLegalPawnPlacement = true;
    
    do {
        let possibleMoves = getPossibleMoves(currentPieceX, currentPieceY);
       
        let moves = possibleMoves.filter(function(move) { 
            return positions.findIndex(position => position.x === move.x && position.y === move.y) < 0;
          });

        
        // If there are no free squares available or reached max number of pawns, place knight at current position and end pawn placement
        if(moves.length === 0 || pawnsPlaced >= getMaxPawns()) {    
            knightPosition = [currentPieceX, currentPieceY];
            savedKnightPosition = knightPosition;
            hasLegalPawnPlacement = false;
            // console.log("Placed knight on " + currentPieceX + ", " + currentPieceY);
        }
        else {
            //Put a pawn in the current position
            positions.push({x: currentPieceX, y: currentPieceY});
            // console.log("Placed pawn on " + currentPieceX + ", " + currentPieceY);
            pawnsPlaced++;

            //Get the next position
            let randomMoveIndex = getRandomInt(moves.length);

            const newPos = moves[randomMoveIndex];
            currentPieceX = newPos.x;
            currentPieceY = newPos.y;

        }
    } while (hasLegalPawnPlacement);
    
   pawnsPosition = positions;
   savedPawnsPosition = positions;

   if(observer) {
    emitChange();
   }
}

function emitChange() {
    observer({knightPosition: knightPosition, pawnsPosition: pawnsPosition});
}

function getMaxPawns() {

    let difficulty = '';

    switch(difficultyLevel) {
        case 'easy': {
            difficulty = MAX_PAWNS_EASY;
            break;
        }
        case 'normal': {
            difficulty = MAX_PAWNS_NORMAL;
            break;
        }
        case 'hard': {
            difficulty = MAX_PAWNS_HARD;
            break;
        }
        default : {
            difficulty = MAX_PAWNS_EASY;
        }
    }

    return difficulty;
}

export function observe(o) {
    if(observer) {
        throw new Error('Multiple observers not implemented');
    }

    observer = o;
    emitChange();
}

export function moveKnight(toX, toY) {
    knightPosition = [toX, toY];

    // If the knight has moved then by rules of canMoveKnight a pawn was captured, so remove that pawn 
    const newPawnsPosition = pawnsPosition.filter(pos => pos.x !== toX || pos.y !== toY);
    pawnsPosition = newPawnsPosition;

    emitChange();
}

function canPlacePawn(onX, onY, pawnPositionX, pawnPositionY) {

    if(onX < 0 || onX >= 8 || onY < 0 || onY >= 8) {
        return false;
    }

    const dx = onX - pawnPositionX;
    const dy = onY - pawnPositionY;

    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}

/*
A Knight can move to a square if it moves according to chess rules AND if it is capturing a piece
*/
export function canMoveKnight(toX, toY) {
    const [x, y] = knightPosition;
    const dx = toX - x;
    const dy = toY - y;

    const isCapturing = pawnsPosition.find(function(pawn) {
        return toX === pawn.x && toY === pawn.y;
    });

    return ((Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2)) &&
            isCapturing;
}