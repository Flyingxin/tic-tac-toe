import { Component } from 'react';
import { connect } from 'react-redux';
import { initGame } from '@/store/action';
import mapStateToProps from '@/utils/mapStateToProps';
import GAME_CONFIG, { StateTypes } from '@/components/Game/gameConfig';
import './index.css';
type Props = {
    gameState: StateTypes;
    gameOver: boolean;
    countdown: number;
    dispatch: Function;
    setCountdown: Function;
    setGameStatus: Function;
}
type State = {
}
/**
 * 顶部组件，用于切换游戏，游戏倒计时
 * @param gameOver 游戏状态
 * @param countdown 倒计时;
 * @param setGameOver: 修改游戏状态;
 * @param setWinner: 修改胜利者;
 * @param setCountDown: 修改倒计时;
 * @returns component
 */
class Header extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // const { gameType, activeUser } = this.props.gameState;

        this.changeGame = this.changeGame.bind(this);  // 更改this指向
    }
    timerId: NodeJS.Timeout | undefined;
    /**
     * 切换游戏
     * @param event
     * reture void
     */
    changeGame(event: any) {
        const { dispatch, setGameStatus } = this.props;
        const selectValue = event.target.value;
        const { time } = GAME_CONFIG[selectValue];
        dispatch(initGame({ gameType: selectValue }));
        setGameStatus(false, time);
        // clearInterval(this.timerId);
        // event.preventDefault();
    }

    // option下拉选项
    optionEl = Object.keys(GAME_CONFIG).map((item, index) => {
        return (
            <option
                key={index}
                value={item}>
                {GAME_CONFIG[item].name}
            </option>);
    });
    /**
     * 生命周期挂载
     * @returns
     */
    componentDidMount() {
        // 倒计时
        let { countdown } = this.props;
        this.timerId = setTimeout(() => {
            this.props.setCountdown(--countdown);
        }, 1000);
    }

    /**
     * 生命周期：数据更新
     */
    componentDidUpdate() {
        clearTimeout(this.timerId);
        const { gameOver } = this.props;
        if (gameOver) return;


        let { countdown } = this.props;
        this.timerId = setTimeout(() => {
            this.props.setCountdown(--countdown);
        }, 1000);
        // 倒计时结束
        if (!gameOver && countdown < 1) {
            const { activeUser, chess, time } = this.props.gameState;
            const winner = activeUser === chess[0] ? chess[1] : chess[0];
            this.props.setGameStatus(true, time, winner);
            clearTimeout(this.timerId);
        }
    }
    componentWillUnmount() {
        if (this.timerId) clearInterval(this.timerId);
    }
    render() {
        const { activeUser } = this.props.gameState;
        const { gameOver, countdown } = this.props;
        // 倒计时
        let countdownEl: JSX.Element;
        gameOver ?
            countdownEl = (<div className='common'>结束</div>) :
            countdownEl =
            (
                <div className='common'>
                    <span>{activeUser}</span>玩家：
                    <span className={10 >= countdown ? 'danger' : ''}>{`${countdown} 秒`}</span>
                </div>
            );

        return (
            <div className='toolbar'>
                <select
                    className='gameType'
                    onChange={this.changeGame}>
                    {this.optionEl}
                </select>
                {countdownEl}
                <div className='tools'>
                    <h3>Made</h3>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(Header);
