import { memo } from 'react';
import { useSelector } from 'react-redux';
import GAME_CONFIG, { stateTypes } from '@/components/Game/gameConfig';
import './index.css';
interface SquareType {
    value: string;
    onSquareClick: () => void;
}
/**
 * 棋盘格子组件，用于展示格子信息
 * @param value  格子文字
 * @param onSquareClick  格子点击事件
 * @returns
 */
const Square = memo(({ value, onSquareClick }: SquareType) => {
    const { gameType, activeUserClass } = useSelector((state: { gameState: stateTypes }) => state.gameState);

    // 小格子节点
    const gameList = Object.keys(GAME_CONFIG);
    const squareEl = gameList.map((_item, index) => {
        if (gameType === gameList[index]) {
            return (
                <button
                    key={index}
                    className='square' onClick={onSquareClick}>
                    {<span className={activeUserClass[1] ? value : ''}>{!activeUserClass[1] ? value : ''}</span>}
                </button>
            );
        }
    });
    return squareEl;
});
export default Square;
