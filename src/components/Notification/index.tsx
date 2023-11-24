import { PureComponent } from 'react';
import './index.css';

interface NotificationProps  {
    gameOver: boolean;
    winner: string;
}
interface NotificationState  {
}
/**
 * 通知栏组件，用于展示游戏是否结束
 * @param gameOver 游戏状态
 * @param winner 胜利者
 * @returns component
 */
class Notification extends PureComponent<NotificationProps, NotificationState> {
    render () {
        console.warn('Notification loading----');

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
