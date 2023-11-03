import { createSlice } from '@reduxjs/toolkit';
import initialState from './index';
import { ticTacToe_CONFIG, goMoKu_CONFIG } from '@/utils/gameConfig';
export const gameStatus = createSlice({
    name: 'gameStatus',
    initialState,
    reducers: {
        start_game: (state, action) => {
            const { gameOver, winner, activeUser } = action.payload;
            state.activeUser = activeUser;
            state.gameOver = gameOver;
            state.winner = winner;
            // console.log(action.payload);

            return state;
        },
        change_game: (state, action) => {
            if (action.payload === goMoKu_CONFIG.gameType) {
                state = goMoKu_CONFIG;
            } else if (action.payload === ticTacToe_CONFIG.gameType) {
                state = ticTacToe_CONFIG;
            } else {
                console.warn('游戏类型错误');
            }

            return state;
        },
        play_game: (state, action) => {
            const { activeUser } = action.payload;
            state.activeUser = activeUser;
            return state;
        },
        end_game: (state, action) => {
            const { gameOver, winner } = action.payload;
            state.gameOver = gameOver;
            state.winner = winner;
            // console.log(action.payload);

            return state;
        },
    },
});

// 为每个 case reducer 函数生成 Action creators
export const {
    start_game,
    change_game,
    play_game,
    end_game,
} = gameStatus.actions;

export default gameStatus.reducer;
