import React from 'react';
import { useSelector } from 'react-redux';
import { stateTypes } from '@/store/gameStatus/index';
import { ticTacToe_CONFIG, goMoKu_CONFIG } from '@/utils/gameConfig';
// styles
import './index.css';

/**
 * 状态栏组件，呈现玩家棋子组件
 * @returns component
 */
function StatusBar () {
    const gameState = useSelector((state: { gameState: stateTypes }) => state.gameState);
    const { first, mode, gameType } = gameState;
    // 五子棋
    if (mode === ticTacToe_CONFIG.mode && gameType === goMoKu_CONFIG.gameType) {
        const humanClass = first === 'human' ? 'black' : 'white';
        const computerClass = first === 'computer' ? 'black' : 'white';

        return (
            <div className='statusBar'>
                <h3>无禁手</h3>

                <div className='players'>
                    玩家：
                    <div className={humanClass}></div>
                    电脑：
                    <div className={computerClass}></div>
                </div>
            </div>
        );
    }
    // 井字棋
    if (gameType === ticTacToe_CONFIG.gameType) {
        return (
            <div className='statusBar'>

                <div className='players1'>
                    玩家1:
                    <div className='black1'>{ticTacToe_CONFIG.chess[1]}</div>
                    玩家2:
                    <div className='black1'>{ticTacToe_CONFIG.chess[0]}</div>
                </div>
            </div>
        );
    }

    // if (mode === ticTacToe_CONFIG.mode && gameType === ticTacToe_CONFIG.gameType) {
    //     const itemClass = gameState.activeUser === 'black' ? 'black' : 'white';
    //     return (
    //         <div className='statusBar'>
    //             <h3>无禁手</h3>
    //             <div className='players'>
    //                 下棋方：
    //                 <div className={itemClass}></div>
    //             </div>
    //         </div>
    //     );
    // }
}
export default  React.memo(StatusBar);
