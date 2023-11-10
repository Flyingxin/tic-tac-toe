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
    },
});

// 为每个 case reducer 函数生成 Action creators
export const {
    initGame,
    playGame,
} = gameStatus.actions;

export default gameStatus.reducer;
