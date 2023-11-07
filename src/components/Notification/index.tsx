import { useSelector } from 'react-redux';
import { stateTypes } from '@/components/Game/gameConfig';
import './index.css';
/**
 * 通知栏组件，用于展示游戏是否结束
 * @returns component
 */
const Notification = () => {
    const gameState = useSelector((state: { gameState: stateTypes }) => state.gameState);
    const { gameOver, winner } = gameState;

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
};
export default  Notification;
