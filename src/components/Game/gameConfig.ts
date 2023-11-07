export interface stateTypes {
    name: string;
    boardSize: number;
    activeUser: string;
    activeUserClass: [string, boolean];
    chess: string[];
    winner: string;
    gameType: string;
    gameOver: boolean;
    finishCount: number;
    time: number;
}
interface configTypes {
    [gameType: string]: stateTypes;
}
// 游戏规则及其配置信息
const GAME_CONFIG: configTypes = {
    // 五子棋
    goMoKu: {
        name: '五字棋',
        boardSize: 14,
        activeUser: 'black',
        activeUserClass: ['black', true],
        chess: ['white', 'black'],
        winner: '',
        gameType: 'goMoKu',
        gameOver: false,
        finishCount: 5,
        time: 30,
    },
    // 井字棋
    ticTacToe: {
        name: '井字棋',
        boardSize: 3,
        activeUser: 'X',
        activeUserClass: ['black', false],
        chess: ['O', 'X'],
        winner: '',
        gameType: 'ticTacToe',
        gameOver: false,
        finishCount: 3,
        time: 20,
    },
};
export default GAME_CONFIG;
