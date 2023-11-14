import { memo } from 'react';
import GAME_CONFIG from '@/components/Game/gameConfig';
import './index.css';
interface StatusBarType {
    gameType: string;
    chess: string[];
}
/**
 * 状态栏组件，呈现玩家棋子组件
 * @param gameType 游戏类型
 * @param chess 棋子样式
 * @returns component
 */
function StatusBar({ gameType, chess }: StatusBarType) {
    console.warn('StatusBar loading----');

    const gameList = Object.keys(GAME_CONFIG);

    /**
     * 棋子样式
     * @param gameType 游戏类型
     * @returns component
     */
    const playerEl = (gameType: string) => {
        return gameType === 'goMoKu' ?
            <>
                玩家1:
                <div className={'black'}></div>
                玩家2:
                <div className={'white'}></div>
            </> :
            <>
                玩家1:
                <div className='black1'> {chess[1]} </div>
                玩家2:
                <div className='black1'> {chess[0]} </div>
            </>;
    };

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
export default memo(StatusBar);
