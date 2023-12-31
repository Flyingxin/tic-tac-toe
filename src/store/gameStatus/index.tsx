import { createSlice } from '@reduxjs/toolkit';
import GAME_CONFIG from '@/components/Game/gameConfig';
export const gameStatus = createSlice({
    name: 'gameStatus',
    initialState: GAME_CONFIG.goMoKu,
    reducers: {
        initGame: (state, action) => {
            const { gameType } = action.payload;
            state = GAME_CONFIG[gameType];
            return state;
        },
        playGame: (state, action) => {
            const { activeUser } = action.payload;
            state = { ...state, activeUser };
            return state;
        },
        recordSteps: (state, action) => {
            const { boardHistory, axisHistory, currentMove } = action.payload;
            state = { ...state, boardHistory, axisHistory, currentMove };
            return state;
        },
        callBackStep: (state, action) => {
            const { currentMove } = action.payload;
            state = { ...state, currentMove };
            return state;
        },
    },
});

// 为每个 case reducer 函数生成 Action creators
export const {
    initGame,
    playGame,
    recordSteps,
    callBackStep,
} = gameStatus.actions;

export default gameStatus.reducer;
