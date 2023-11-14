import { Component } from 'react';
import './index.css';

type Props = {
    gameOver: boolean;
    winner:string;
}
type State = {
}
/**
 * 通知栏组件，用于展示游戏是否结束
 * @param gameOver 游戏状态
 * @param winner 胜利者
 * @returns component
 */
class Notification extends Component<Props, State> {
    componentDidMount () {
        console.warn('Notification loading----');
    }

    render () {
        const { gameOver, winner } = this.props;

        const winnerEl = (<h3>胜利方为：{winner}</h3>);
        const peaceEl = (<h3>和棋</h3>);

        return (
            !gameOver ?
                (<div style={{ display: 'none' }}></div>) :
                (<div className='notificationWrapper'>
                    <div className='notificationBg'></div>
                    <div className='notificationContent'>
                        <h1>游戏结束!</h1>
                        {winner === '' ? peaceEl : winnerEl}
                    </div>
                </div>)
        );
    }
}
export default Notification;
