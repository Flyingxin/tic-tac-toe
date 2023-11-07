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
        finishCount: 5,
        time: 30,
        activeUserClass: ['black', true],

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
        time: 20,
        activeUserClass: ['black', false],

        activeUser: 'X',
        chess: ['O', 'X'],
        winner: '',
        gameType: 'ticTacToe',
        gameOver: false,
    },
};
export default GAME_CONFIG;
