export interface StateTypes {
    name: string;
    boardSize: number;
    activeUser: string;
    chess: string[];
    gameType: string;
    finishCount: number;
    time: number;
    boardHistory: string[][][];
    axisHistory: number[][];
    currentMove: number;
}
interface ConfigTypes {
    [gameType: string]: StateTypes;
}
// 游戏规则及其配置信息
const GAME_CONFIG: ConfigTypes = {
    // 五子棋
    goMoKu: {
        name: '五字棋',
        boardSize: 14,
        finishCount: 5,
        time: 5,
        activeUser: 'black',
        chess: ['white', 'black'],

        gameType: 'goMoKu',
        boardHistory: [initBoard(14)],
        axisHistory: [[0, 0]],
        currentMove: 0,
    },
    // 井字棋
    ticTacToe: {
        name: '井字棋',
        boardSize: 3,
        finishCount: 3,
        time: 99,
        activeUser: 'X',
        chess: ['O', 'X'],
        gameType: 'ticTacToe',
        boardHistory: [initBoard(3)],
        axisHistory: [[0, 0]],
        currentMove: 0,
    },
};
export default GAME_CONFIG;
/**
 * 棋盘初始化
 * @param boardSize 棋盘尺寸
 * @returns string[][]
 */
function initBoard(boardSize: number) {
    const rowArr = Array(boardSize).fill(null);
    return rowArr.map(() => rowArr);
}
