import { Component } from 'react';
import { connect } from 'react-redux';
import calcWinner from '@/utils/judge';
import { playGame, recordStep, callBackStep } from '@/store/action';
import mapStateToProps from '@/utils/mapStateToProps';
import { StateTypes } from '@/components/Game/gameConfig';
import Board from './Board';
import History from './History';
import Notification from '../Notification';
import './index.css';

type Props = {
    gameState: StateTypes;
    gameOver: boolean;
    winner: string;
    dispatch: Function;
    setCountdown: Function;
    setGameStatus: Function;
}
/**
 * 游戏组件，用于管理棋盘与历史记录组件
 * @param gameOver 游戏状态
 * @param winner 胜利者
 * @param setGameOver: 修改游戏状态;
 * @param setWinner: 修改胜利者;
 * @param setCountDown: 修改倒计时;
 * @returns component
 */
class Game extends Component<Props, any> {
    constructor(props: any) {
        super(props);

        this.recordStep = this.recordStep.bind(this);  // 更改this指向
        this.calcGameStatus = this.calcGameStatus.bind(this);
    }
    /**
     * 记录回退记录
     * @param nextBoard 最新棋盘
     * @param coordinate 最新坐标
     * retrun void
     */
    recordStep(nextBoard: string[][], nextCoordinate: number[]) {
        const { dispatch } = this.props;
        const { boardHistory, axisHistory, currentMove } = this.props.gameState;
        const nextBoardHistory = [...boardHistory.slice(0, currentMove + 1), nextBoard];
        const nextAxisHistory = [...axisHistory.slice(0, currentMove + 1), nextCoordinate];
        const newState = {
            boardHistory: nextBoardHistory,
            axisHistory: nextAxisHistory,
            currentMove: nextBoardHistory.length - 1,
        };
        dispatch(recordStep(newState));
        // setBoardStatus(nextBoardHistory, nextAxisHistory, nextBoardHistory.length - 1);
    }

    /**
     * 计算游戏状态
     * @param coordinate 最新坐标
     * @param step 步骤
     * @param isJumpTo 是否回退查看
     * @returns
     */
    calcGameStatus(coordinate: number[], step: number, isJumpTo: boolean) {
        const { setGameStatus, dispatch } = this.props;
        const { boardHistory } = this.props.gameState;
        const { chess, finishCount, boardSize, time } = this.props.gameState;
        // 当前选手,下一个选手
        let nextPlayer; let currentPlayer;

        if (isJumpTo) {
            nextPlayer = step % 2 === 0 ? chess[1] : chess[0];
            currentPlayer = chess[step % 2];
            dispatch(callBackStep({ currentMove: step }));
        } else {
            nextPlayer = chess[step % 2];
            currentPlayer = step % 2 === 0 ? chess[1] : chess[0];
        }

        // 游戏规则
        if (calcWinner(coordinate, currentPlayer, finishCount, boardHistory[step])) { // 胜利
            // console.log('win');
            setGameStatus(true, 0, currentPlayer);
            return;
        } else if (step === (isJumpTo ? (boardSize * boardSize) : (boardSize * boardSize) - 1)) { // 和棋
            // console.log('peace');
            setGameStatus(true);
        } else {  // 继续游戏
            // console.log(`---${step}:当前${currentPlayer}——游戏继续——下一步${nextPlayer}---`);
            setGameStatus(false, time);
            dispatch(playGame({ activeUser: nextPlayer }));
        }
    }
    render() {
        const { gameOver, winner } = this.props;
        const { boardHistory, currentMove, axisHistory } = this.props.gameState;
        const board = boardHistory[currentMove];
        return (
            <div className="game-status">
                <div className="game-board">
                    <Board
                        board={board}
                        gameOver={gameOver}
                        currentMove={currentMove}
                        recordStep={this.recordStep}
                        calcGameStatus={this.calcGameStatus} />
                    <Notification
                        gameOver={gameOver}
                        winner={winner} />
                </div>
                <div className="game-history">
                    <History
                        currentMove={currentMove}
                        axisHistory={axisHistory}
                        boardHistory={boardHistory}
                        calcGameStatus={this.calcGameStatus} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Game);
