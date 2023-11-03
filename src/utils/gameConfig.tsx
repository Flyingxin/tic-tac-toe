export const ticTacToe_CONFIG = {
    name: '井字棋',
    boardSize: 3,
    activeUser: 'X',
    chess: ['O', 'X'],
    mode: 'pve', // 人机   pvp是双人模式
    first: 'human',
    winner: '',
    gameType: 'nine',
    gameOver: false,
    finishCount: 2,
    time: 60,
};
export const goMoKu_CONFIG = {
    name: '五字棋',
    boardSize: 15,
    activeUser: 'black',
    chess: ['white', 'black'],
    mode: 'pve',
    first: 'human',
    winner: '',
    gameType: 'five',
    gameOver: false,
    finishCount: 4,
    time: 60,
};