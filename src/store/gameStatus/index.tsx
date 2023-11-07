import GAME_CONFIG from '@/components/Game/gameConfig';
export interface stateTypes {
    name: string;
    boardSize: number;
    activeUser: string;
    chess: string[];
    winner: string;
    gameType: string;
    gameOver: boolean;
    finishCount: number;
    time: number;
}

const initialState: stateTypes = GAME_CONFIG.goMoKu;

export default initialState;
