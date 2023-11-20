import { createStore } from 'redux';
import GAME_CONFIG, { StateTypes } from '@/components/Game/gameConfig';
import { INIT_GAME, PLAY_GAME, RECORD_STEP, CALLBACK_STEP, ChANGE_MODE } from './action';
// 初始化状态
const initialGameState = GAME_CONFIG.goMoKu;
/**
 * reducers
 * @param state
 * @param action
 * @returns
 */
function gameState (state = initialGameState, action: { type: string, nextStatus: StateTypes }) {
    let newState = JSON.parse(JSON.stringify(state));
    const newVal = action.nextStatus;
    switch (action.type) {
        case INIT_GAME:
            newState = GAME_CONFIG[newVal.gameType];
            return newState;
        case PLAY_GAME:
            newState = {
                ...newState,
                activeUser: newVal.activeUser,
            };
            return newState;
        case RECORD_STEP:
            newState = {
                ...newState,
                boardHistory: newVal.boardHistory,
                axisHistory: newVal.axisHistory,
                currentMove: newVal.currentMove,
            };
            return newState;
        case CALLBACK_STEP:
            newState = {
                ...newState,
                currentMove: newVal.currentMove,
            };
            return newState;
        case ChANGE_MODE:
            newState = {
                ...newState,
                gameMode: newVal.gameMode,
            };

            return newState;
        default:
            return newState;
    }
}

const store = createStore(gameState);
export default store;
