export interface stateTypes {
    name: string;
    boardSize: number;
    activeUser: string;
    chess: string[];
    mode: string;
    first: string;
    winner: string;
    gameType: string;
    gameOver: boolean;
    finishCount: number;
    time: number;
}

const initialState: stateTypes = {
    name: '五字棋',
    boardSize: 14,
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

export default initialState;
