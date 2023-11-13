import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateTypes } from '@/components/Game/gameConfig';
import Board from './Board';
import History from './History';
import Notification from '../Notification';
import calcWinner from '@/utils/judge';
import { playGame } from '@/store/gameStatus';
import './index.css';

interface GameType {
    boardHistory:string[][][];
    axisHistory:number[][];
    currentMove:number;
    gameOver: boolean;
    winner: string;
    setGameOver: Function;
    setWinner:Function;
    setCountDown:Function;
    setBoardHistory:Function;
    setAxisHistory:Function;
    setCurrentMove:Function;

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
function Game ({
    boardHistory, axisHistory, currentMove, gameOver, winner, setGameOver,
    setWinner,  setCountDown, setBoardHistory, setAxisHistory, setCurrentMove,
}:GameType) {
    const dispatch = useDispatch();
    const gameState = useSelector((state: { gameState: StateTypes }) => state.gameState);
    const { boardSize, finishCount, chess, time } = gameState;

    const board = boardHistory[currentMove];


    /**
     * 记录回退记录
     * @param nextBoard 最新棋盘
     * @param coordinate最新坐标
     * retrun void
     */
    function recordStep (nextBoard: string[][], nextCoordinate:number[]) {
        const nextBoardHistory = [...boardHistory.slice(0, currentMove + 1), nextBoard];
        const nextAxisHistory = [...axisHistory.slice(0, currentMove + 1), nextCoordinate];

        setCurrentMove(nextBoardHistory.length - 1);
        setBoardHistory(nextBoardHistory);
        setAxisHistory(nextAxisHistory);
    }

    /**
     * 计算游戏状态
     * @param coordinate 最新坐标
     * @param step 步骤
     * @param isJumpTo 是否回退查看
     * @returns
     */
    function calcGameStatus (coordinate:number[], step:number, isJumpTo:boolean) {
        // 当前选手,下一个选手
        let nextPlayer; let  currentPlayer;

        if (isJumpTo) {
            nextPlayer = step % 2 === 0 ? chess[1] : chess[0];
            currentPlayer = chess[step % 2];
            setCurrentMove(step);
        } else {
            nextPlayer = chess[step % 2];
            currentPlayer = step % 2 === 0 ? chess[1] : chess[0];
        }

        // 游戏规则
        if (calcWinner(coordinate, currentPlayer, finishCount, boardHistory[step])) { // 胜利
            // console.log('win');
            setWinner(currentPlayer);
            setGameOver(true);
            return;
        } else if (step === (isJumpTo ? (boardSize * boardSize) : (boardSize * boardSize) - 1)) { // 和棋
            // console.log('peace');
            setGameOver(true);
            setWinner('');
        } else {  // 继续游戏
            // console.log(`---${step}:当前${currentPlayer}——游戏继续——下一步${nextPlayer}---`);
            setGameOver(false);
            setCountDown(time);
            dispatch(playGame({ activeUser: nextPlayer }));
        }
    }

    return (
        <div className="game-status">
            <div className="game-board">
                <Board
                    board={board}
                    recordStep={recordStep}
                    calcGameStatus={calcGameStatus}
                    currentMove={currentMove}
                    gameOver={gameOver}/>
                <Notification
                    gameOver={gameOver}
                    winner={winner}/>
            </div>
            <div className="game-history">
                <History
                    currentMove={currentMove}
                    axisHistory={axisHistory}
                    boardHistory={boardHistory}
                    calcGameStatus={calcGameStatus}/>
            </div>
        </div>
    );
}
export default memo(Game);
