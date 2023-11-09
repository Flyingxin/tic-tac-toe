import { memo } from 'react';
import './index.css';
interface SquareType {
    gameType: string;
    value: string;
}
/**
 * 棋盘格子组件，用于展示格子信息
 * @param value  格子文字
 * @param onSquareClick  格子点击事件
 * @returns
 */
const Square = ({ gameType, value }: SquareType) => {
    // console.log('----------------Square');

    return (
        gameType === 'goMoKu' ?
            <span className={value}></span> :
            <span >{value}</span>
    );
};
export default memo(Square);
