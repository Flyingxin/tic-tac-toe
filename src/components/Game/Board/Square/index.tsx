import { PureComponent } from 'react';
import './index.css';
interface SquareProps {
    gameType: string;
    row: number;
    colum: number;
    value: string;
    handleClick: Function;
}
interface SquareState {
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
class Square extends PureComponent<SquareProps, SquareState> {
    render () {
        const { gameType, row, colum, value, handleClick } = this.props;

        console.warn('Square Loading -----------');
        return (
            <button
                className='square'
                onClick={() => handleClick(row, colum)}>
                {
                    gameType === 'goMoKu' ?
                        <span className={value}></span> :
                        <span >{value}</span>
                }
            </button>
        );
    }
}

export default Square;

