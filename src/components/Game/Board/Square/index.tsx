import React from 'react';
import { useSelector } from 'react-redux';
import { stateTypes } from '@/store/gameStatus/index';
import { ticTacToe_CONFIG } from '@/utils/gameConfig';
import './index.css';
interface SquareType {
    value: string;
    onSquareClick?: () => void;
}
/**
 * 棋盘格子组件，用于展示格子信息
 * @param value  格子文字
 * @param onSquareClick  格子点击事件
 * @returns
 */
function Square ({ value, onSquareClick }: SquareType) {
    const { gameType } = useSelector((state: { gameState: stateTypes }) => state.gameState);
    return (
        <button className='square' onClick={onSquareClick}>
            {gameType === ticTacToe_CONFIG.gameType ?
                value :
                <span className={value}></span>}
        </button>
    );
}
export default React.memo(Square);
