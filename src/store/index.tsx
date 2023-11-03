import { configureStore } from '@reduxjs/toolkit';
import gameStatusReducer from './gameStatus/reducer';

// 组合各个模块的reducer
export default configureStore({ reducer: { gameState: gameStatusReducer } });
