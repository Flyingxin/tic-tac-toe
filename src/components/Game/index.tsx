import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stateTypes } from '@/components/Game/gameConfig';
import { startGame } from '@/store/gameStatus/reducer';
import Board from './Board';
import Notification from '../Notification';
import './index.css';
interface gameTypes {
    isToggleGame: boolean;
}
/**
 * 游戏组件，用于管理五子棋与井字棋组件
 * @returns component
 */
export default function Game ({ isToggleGame }: gameTypes) {
    const dispatch = useDispatch();
    const gameState = useSelector((state: { gameState: stateTypes }) => state.gameState);
    const { boardSize, chess, gameType } = gameState;

    // const [gameMode, setGameMode] = useState(gameType);
    const [history, setHistory] = useState([initBoard(boardSize)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [stepBtnActive, setStepBtnActive] = useState(0);
    const nextChessIndex = currentMove % 2;
    const currentSquares = history[currentMove];

    useEffect(() => {
        // 切换游戏
        if (isToggleGame) {
            // setGameMode(gameType);
            setHistory([initBoard(boardSize)]);
            setCurrentMove(0);
            setStepBtnActive(0);
        }
    }, [gameType]);

    /**
     * 初始化棋盘值
     * @param boardSize
     * @returns string[][]
     */
    function initBoard (boardSize: number) {
        const listArray: string[][] = [];
        const rowArr =  Array(boardSize).fill(null);
        rowArr.forEach(() => {
            listArray.push(rowArr);
        });
        return listArray;
    }

    /**
     * 记录回退记录
     * @param nextSquares
     * retrun void
     */
    function handlePlay (nextSquares: string[][]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setCurrentMove(nextHistory.length - 1);
        setHistory(nextHistory);
    }


    /**
     * 渲染回退按钮
     */
    const historyEl = history.map((_item: string[][], step: number) => {
        let description: string;
        step > 0 ?
            description = `${step}执棋   ${step % 2 === 0 ? chess[1] : chess[0]}` :
            description = '游戏开始';

        const className = stepBtnActive === step ? 'game-step-button--active' : 'game-step-button';
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
        if (step === history.length - 1) return;
        setCurrentMove(step);
        setStepBtnActive(step);
        dispatch(startGame({
            activeUser: step % 2 === 0 ? chess[1] : chess[0],
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
