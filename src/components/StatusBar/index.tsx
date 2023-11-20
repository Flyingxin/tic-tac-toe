import { PureComponent } from 'react';
import GAME_CONFIG from '@/components/Game/gameConfig';
import './index.css';
type Props = {
    gameType: string;
    chess: string[];
    setGameMode: Function;
}
type State = {
}
/**
 * 状态栏组件，呈现玩家棋子组件
 * @param gameType 游戏类型
 * @param chess 棋子样式
 * @returns component
 */
class StatusBar extends PureComponent<Props, State> {
    constructor (props: Props) {
        super(props);
        this.changeMode = this.changeMode.bind(this);
    }

    /**
     * 切换游戏模式
     * @returns void
     */
    changeMode (event:any) {
        const { setGameMode } = this.props;
        const selectValue = event.target.value;
        setGameMode(selectValue);
        // console.log(selectValue);
    }


    render () {
        const gameList = Object.keys(GAME_CONFIG);
        const { gameType, chess } = this.props;

        console.warn('StatusBar loading----');
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

        /**
         * 游戏模式
         * @param gameType 游戏类型
         * @returns component
         */
        const modeEl = (gameType: string) => {
            return gameType !== 'goMoKu' ?
                <>
                    <select
                        className='gameMode'
                        onChange={this.changeMode}>
                        <option value="pvp">双人对战</option>
                        <option value="pve_player">玩家先手(人机)</option>
                        <option value="pve_computer">人机先手(人机)</option>
                    </select>
                </> :
                <></>;
        };

        return gameList.map((_item, index) => {
            if (gameType === gameList[index]) {
                return (
                    <div
                        key={index}>
                        <div
                            key={index}
                            className='players'>
                            {playerEl(gameType)}
                        </div>
                        {modeEl(gameType)}
                    </div>
                );
            }
        });
    }
}

export default StatusBar;
