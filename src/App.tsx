import { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '@/utils/mapStateToProps';
import { StateTypes } from './components/Game/gameConfig';
import { changeMode, initGame } from './store/action';
import Game from './components/Game';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import './App.css';
type Props = {
    gameState: StateTypes;
    dispatch: Function;
}
type State = {
    gameOver: boolean;
    winner: string;
    countdown: number;
    gameType: string;
    chess: string[];
}
/**
 * App组件用于管理所有子组件
 * @returns
 */
class App extends Component<Props, State> {
    constructor (props: Props) {
        super(props);
        const { time, gameType, chess } = this.props.gameState;
        this.state = {
            gameOver: false,
            winner: '',
            countdown: time,

            gameType,
            chess,
        };
        this.setGameStatus = this.setGameStatus.bind(this);
        this.setCountdown = this.setCountdown.bind(this);
        this.setGameMode = this.setGameMode.bind(this);
    }

    /**
     * 生命周期：数据更新
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate () {
        // 缓存 StatusBar组件
        const newGameType = this.props.gameState.gameType;
        if (this.state.gameType !== newGameType) {
            // 更新复杂对象的逻辑
            const { gameType, chess } = this.props.gameState;
            this.setState({ gameType, chess });
        }
    }

    /**
     * 修改游戏模式
     * @param boardSize 棋盘尺寸
     * @returns string[][]
     */
    setGameMode (gameMode: string) {
        const { time, gameType } = this.props.gameState;
        const { dispatch } = this.props;
        dispatch(initGame({ gameType }));
        dispatch(changeMode({ gameMode }));
        this.setGameStatus(false, time);
    }

    /**
     * 棋盘初始化
     * @param boardSize 棋盘尺寸
     * @returns string[][]
     */
    initBoard (boardSize: number) {
        const rowArr = Array(boardSize).fill(null);
        return rowArr.map(() => rowArr);
    }

    /**
     * 修改倒计时
     * @param boardSize 棋盘尺寸
     * @returns string[][]
     */
    setCountdown (countdown: number) {
        this.setState({
            ...this.state,
            countdown,
        });
    }

    /**
     * 修改游戏状态
     * @param boardSize 棋盘尺寸
     * @returns string[][]
     */
    setGameStatus (gameOver: boolean, countdown: number = 0, winner: string = '') {
        this.setState({
            gameOver,
            countdown,
            winner,
        });
    }

    /**
     * 修改棋盘状态(已废弃，改用redux)
     * @param boardSize 棋盘尺寸
     * @returns string[][]
     */
    // setBoardStatus (boardHistory:string[][][], axisHistory:number[][], currentMove:number) {
    //     this.setState({
    //         boardHistory,
    //         axisHistory,
    //         currentMove,
    //     });
    // }

    render () {
        const { gameOver, countdown, winner, gameType, chess  } = this.state;
        return (
            <>
                <Header
                    gameOver={gameOver}
                    countdown={countdown}
                    setCountdown={this.setCountdown}
                    setGameStatus={this.setGameStatus}/>
                <div className='main'>
                    <StatusBar
                        gameType={gameType}
                        chess={chess}
                        setGameMode={this.setGameMode}/>

                    <Game
                        gameOver={gameOver}
                        winner={winner}
                        setCountdown={this.setCountdown}
                        setGameStatus={this.setGameStatus}
                    />
                </div>
            </>
        );
    }
}
export default connect(mapStateToProps)(App);
