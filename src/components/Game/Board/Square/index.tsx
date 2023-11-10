import { memo } from 'react';
import './index.css';
interface SquareType {
    gameType: string;
    row:number;
    colum:number;
    value: string;
    handleClick: Function;
}

/**
 * 棋盘格子组件，用于展示格子信息
 * @param gameType  游戏类型
 * @param row  行
 * @param colum  列
 * @param value  值
 * @param handleClick  格子点击事件
 * @returns
 */
const Square = ({ gameType, row, colum, value, handleClick }: SquareType) => {
    console.warn('Square loading----');

    /**
     * 格子点击事件
     * return void
     */
    const onSquareClick = () => {
        handleClick(row, colum);
    };
    return (
        <button
            className='square'
            onClick={onSquareClick}>
            {        gameType === 'goMoKu' ?
                <span className={value}></span> :
                <span >{value}</span>
            }
        </button>
    );
};
export default memo(Square);

