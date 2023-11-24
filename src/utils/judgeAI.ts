
// 人机永远是1 玩家永远是-1
const HUMAN = -1;
const COMP = +1;
/**
 * AI下棋
 * @param board
 */
export default function clickForAI (board: string[][], activeUser: string, chess:string[]) {
    // 棋盘数值化处理
    const digitalBoard = setDigitalForBoard(board, activeUser, chess,);

    const boardSize = digitalBoard.length;

    let xAxis = 0;
    let yAxis = 0;
    const emptySquares = getEmptySquare(digitalBoard);
    const isContinue = emptySquares.length > 0 && !gameOverAll(digitalBoard);

    // AI先手
    if (emptySquares.length === boardSize * boardSize)  return [xAxis, yAxis];

    if (isContinue) {
        const move = miniMax(digitalBoard, emptySquares.length, COMP);
        [xAxis, yAxis] = move;
        return [xAxis, yAxis];
    }
    return false;
}

/**
 * 极小化极大算法
 * @param digitalBoard 棋盘
 * @param depth 深度
 * @param player 当前选手
 * @returns number[] -- x、y与分数
 */
function miniMax (digitalBoard:number[][], depth:number, player:number) {
    let best:number[];
    best = player === COMP ?
        [-1, -1, -1000] :
        [-1, -1, +1000];

    if (depth === 0 || gameOverAll(digitalBoard)) {
        const score = evaluateScore(digitalBoard);
        return [-1, -1, score];
    }
    // 广度遍历
    getEmptySquare(digitalBoard).forEach((coordinate) => {
        const [xAxis, yAxis] = coordinate;
        digitalBoard[xAxis][yAxis] = player;
        // 深度遍历
        const score = miniMax(digitalBoard, depth - 1, -player);

        digitalBoard[xAxis][yAxis] = 0;
        score[0] = xAxis;
        score[1] = yAxis;

        if (player === COMP) {
            if (score[2] > best[2]) best = score;
        } else {
            if (score[2] < best[2]) best = score;
        }
    });
    return best;
}

/**
 * 评估结果
 * @param digitalBoard 棋盘
 * @returns
 */
function evaluateScore (digitalBoard:number[][]) {
    let score = 0;
    if (isGameOver(digitalBoard, COMP)) score = COMP;
    if (isGameOver(digitalBoard, HUMAN)) score = HUMAN;
    return score;
}

/**
 * 棋盘数值化处理
 * @param board 棋盘
 * @param chess 棋子样式
 * @param activeUser 当前选手
 * @returns
 */
function setDigitalForBoard (board: string[][], activeUser: string, chess: string[]) {
    return board.map(rowArr => {
        return rowArr.map(value => {
            // 人机为 O 时候
            if (activeUser === chess[0]) {
                if (value === chess[1]) return COMP;
                if (value === chess[0]) return HUMAN;
                return 0;
            }
            // 人机为 X 时候
            if (value === chess[1]) return HUMAN;
            if (value === chess[0]) return COMP;
            return 0;
        });
    });
}

/**
 * 获取空格坐标组
 * @param board
 * @returns number[][]
 */
function getEmptySquare (digitalBoard: number[][]) {
    const emptySquares:number[][] = [];
    digitalBoard.forEach((item, row) => {
        item.forEach((value, colum) => {
            if (!value) return emptySquares.push([row, colum]);
        });
    });
    return emptySquares;
}

/**
 * 决策游戏是否全结束
 * @param digitalBoard
 * @returns
 */
function gameOverAll (digitalBoard: number[][]) {
    return isGameOver(digitalBoard, HUMAN) || isGameOver(digitalBoard, COMP);
}

/**
 * 决策是否游戏结束
 * @param digitalBoard 棋盘
 * @param player 当前选手
 * @returns boolean
 */
function isGameOver (digitalBoard: number[][], player: number) {
    let isGameOver = false;
    const borderSize = digitalBoard.length; // 边长
    const winState = [];
    const plusTilt: number[] = [];
    const minusTilt: number[] = [];
    digitalBoard.forEach((item1, row) => {
        // 水平， 垂直，
        const vertical = item1.map((_item, colum) => digitalBoard[colum][row]);
        winState.push(item1, vertical);
        // 斜线
        item1.forEach((_item, colum) => {
            if (row === colum) plusTilt.push(digitalBoard[row][colum]); // 主对角线
            if (row + colum === borderSize - 1) minusTilt.push(digitalBoard[row][colum]); // 辅对角线
        });
    });
    winState.push(plusTilt, minusTilt);

    // 判断是否获胜
    winState.forEach(item => {
        let filled = 0;
        item.forEach(item2 => {
            if (item2 === player) filled++;
        });
        if (filled === borderSize) isGameOver = true;
    });

    return isGameOver;
}
