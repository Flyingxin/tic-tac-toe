import { Component } from 'react';
import './index.css';
type Props = {
    gameType: string;
    row: number;
    colum: number;
    value: string;
    handleClick: Function;
}
type State = {
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
class Square extends Component<Props, State> {
    componentDidMount() {
        console.warn('Square Loading -----------');
    }
    render() {
        const { gameType, row, colum, value, handleClick } = this.props;

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

