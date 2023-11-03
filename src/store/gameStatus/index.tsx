import { goMoKu_CONFIG } from '@/utils/gameConfig';
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

const initialState: stateTypes = goMoKu_CONFIG;

export default initialState;
