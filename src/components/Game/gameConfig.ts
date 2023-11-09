export interface StateTypes {
    name: string;
    boardSize: number;
    activeUser: string;
    chess: string[];
    winner: string;
    gameType: string;
    gameOver: boolean;
    currentMove:number;
    finishCount: number;
    time: number;
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
        currentMove: 0,
        activeUser: 'black',
        chess: ['white', 'black'],
        winner: '',
        gameType: 'goMoKu',
        gameOver: false,
    },
    // 井字棋
    ticTacToe: {
        name: '井字棋',
        boardSize: 3,
        finishCount: 3,
        time: 99,
        currentMove: 0,
        activeUser: 'X',
        chess: ['O', 'X'],
        winner: '',
        gameType: 'ticTacToe',
        gameOver: false,
    },
};
export default GAME_CONFIG;
