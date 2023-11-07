import { createSlice } from '@reduxjs/toolkit';
import initialState from './index';
import GAME_CONFIG from '@/components/Game/gameConfig';
export const gameStatus = createSlice({
    name: 'gameStatus',
    initialState,
    reducers: {
        startGame: (state, action) => {
            const { gameOver, winner, activeUser } = action.payload;
            state = { ...state, activeUser, gameOver, winner };
            // console.log(action.payload);

            return state;
        },
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
        endGame: (state, action) => {
            const { gameOver, winner } = action.payload;
            state = { ...state, gameOver, winner };

            return state;
        },
    },
});

// 为每个 case reducer 函数生成 Action creators
export const {
    startGame,
    initGame,
    playGame,
    endGame,
} = gameStatus.actions;

export default gameStatus.reducer;
