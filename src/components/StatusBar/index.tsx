import { useSelector } from 'react-redux';
import GAME_CONFIG, { StateTypes } from '@/components/Game/gameConfig';
// styles
import './index.css';
/**
 * 状态栏组件，呈现玩家棋子组件
 * @returns component
 */
export default function StatusBar () {
    const gameState = useSelector((state: { gameState: StateTypes }) => state.gameState);
    const { gameType, chess } = gameState;
    /**
     *  棋子样式
     */
    function playerEl (gameType:string) {
        return gameType === 'goMoKu' ?
            <>
                玩家1:
                <div className={ 'black'}></div>
                玩家2:
                <div className={ 'white'}></div>
            </> :
            <>
                玩家1:
                <div className={ 'black1'}> {chess[1]} </div>
                玩家2:
                <div className={ 'black1'}>  {chess[0]} </div>
            </>;
    }
    const gameList = Object.keys(GAME_CONFIG);
    return gameList.map((_item, index) => {
        if (gameType === gameList[index]) {
            return (
                <div
                    key={index}
                    className='players'>
                    {playerEl(gameType)}
                </div>
            );
        }
    });
}
