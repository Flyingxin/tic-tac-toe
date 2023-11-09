import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateTypes } from '@/components/Game/gameConfig';
import { startGame  } from '@/store/gameStatus'; // endGame
// import calcWinner from '@/utils/judge';
import Board from './Board';
import Notification from '../Notification';
import './index.css';

/**
 * 游戏组件，用于管理五子棋与井字棋组件
 * @returns component
 */
export default function Game () {
    const dispatch = useDispatch();
    const gameState = useSelector((state: { gameState: StateTypes }) => state.gameState);
    const { boardSize, chess, gameType } = gameState;
    // const { boardSize, chess, gameType, activeUser, finishCount } = gameState;

    const [history, setHistory] = useState([initBoard(boardSize)]);
    const [axisHistory, setAxisHistory] = useState([[0, 0]]);
    const [currentMove, setCurrentMove] = useState(0);
    const nextChessIndex = currentMove % 2;
    const currentSquares = history[currentMove];

    // 切换游戏
    useEffect(() => {
        setHistory([initBoard(boardSize)]);
        setCurrentMove(0);
    }, [gameType]);

    /**
     * 初始化棋盘值
     * @param boardSize
     * @returns string[][]
     */
    function initBoard (boardSize: number) {
        const rowArr =  Array(boardSize).fill(null);
        const listArray = rowArr.map(() => {
            return rowArr;
        });
        return listArray;
    }

    /**
     * 记录回退记录
     * @param nextSquares
     * retrun void
     */
    function handlePlay (nextSquares: string[][], coordinate:number[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        const axisArry = [...axisHistory.slice(0, currentMove + 1), coordinate];
        setCurrentMove(nextHistory.length - 1);
        setHistory(nextHistory);
        setAxisHistory(axisArry);
    }

    /**
     * 渲染回退按钮
     */
    const historyEl = history.map((_item: string[][], step: number) => {
        const [row, colum] = axisHistory[step];
        let description: string;
        step > 0 ?
            description = `${step}执棋  ${chess[step % 2]} (${row + 1},${colum + 1})` :
            description = '游戏开始';

        const className = currentMove === step ? 'game-step-button--active' : 'game-step-button';
        return (
            <li key={step}>
                <button className={className} onClick={() => jumpTo(step)}>{description}</button>
            </li>
        );
    });

    /**
     * 悔棋
     * @param lastMove
     * return void
     */
    function jumpTo (step: number) {
        if (step !== 0 && step === currentMove) return;
        if (step === history.length - 1) return;
        setCurrentMove(step);
        // if (calcWinner(axisHistory[step], activeUser, finishCount, history[step])) {
        //     const obj = {
        //         winner: activeUser,
        //         gameOver: true,
        //     };
        //     dispatch(endGame(obj));
        //     return;
        // }
        dispatch(startGame({
            activeUser: step % 2 === 0 ? chess[1] : chess[0],
            currentMove: step,
            winner: '',
            gameOver: false,
        }));
    }

    return (
        <div className="game-status">
            <div className="game-board">
                <Board
                    nextChessIndex={nextChessIndex}
                    squares={currentSquares}
                    currentMove = {currentMove}
                    onPlay={handlePlay} />
                <Notification></Notification>
            </div>
            <div className="game-info">
                <ol>{historyEl}</ol>
            </div>
        </div>
    );
}
