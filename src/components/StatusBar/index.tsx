import { useSelector } from 'react-redux';
import GAME_CONFIG, { stateTypes } from '@/components/Game/gameConfig';
// styles
import './index.css';

/**
 * 状态栏组件，呈现玩家棋子组件
 * @returns component
 */
export default function StatusBar () {
    const gameState = useSelector((state: { gameState: stateTypes }) => state.gameState);
    const { gameType, chess, activeUserClass } = gameState;
    // 五子棋
    const gameList = Object.keys(GAME_CONFIG);

    return gameList.map((_item, index) => {
        if (gameType === gameList[index]) {
            return (
                <div
                    key={index}
                    className='players'>
                    玩家1:
                    <div
                        className={activeUserClass[1] ? chess[1] : 'black1'}>
                        {!activeUserClass[1] ? chess[1] : ''}
                    </div>
                    玩家2:
                    <div
                        className={activeUserClass[1] ? chess[0] : 'black1'}>
                        {!activeUserClass[1] ? chess[0] : ''}
                    </div>
                </div>
            );
        }
    });
}
