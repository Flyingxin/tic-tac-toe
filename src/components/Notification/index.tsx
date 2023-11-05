import React from 'react';
import { useSelector } from 'react-redux';
import { stateTypes } from '@/store/gameStatus/index';
import { ticTacToe_CONFIG, goMoKu_CONFIG } from '@/utils/gameConfig';
import './index.css';
/**
 * 通知栏组件，用于展示游戏是否结束
 * @returns component
 */
function Notification () {
    const gameState = useSelector((state: { gameState: stateTypes }) => state.gameState);
    const {gameType,gameOver,winner} = gameState
    const winners = (
        gameType === goMoKu_CONFIG.gameType ?
            <h3>胜利方为：{winner === goMoKu_CONFIG.activeUser ? '黑方' : '白方'}</h3> :

            <h3>胜利方为：{winner === ticTacToe_CONFIG.activeUser ?
                ticTacToe_CONFIG.chess[1] :
                ticTacToe_CONFIG.chess[0]}
            </h3>
    );
    const peace = ( <h3>和棋</h3>)
    const notification = (
        !gameOver ?
            (<div style={{ display: 'none' }}></div>) :
            (<div className='notificationWrapper'>
                <div className='notificationBg'></div>
                <div className='notificationContent'>
                    <h1>游戏结束!</h1>
                    {winner === ''? peace: winners}
                </div>
            </div>)
    );
    return (notification);
}
export default React.memo(Notification);
