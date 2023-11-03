import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stateTypes } from '@/store/gameStatus/index';
import { start_game } from '@/store/gameStatus/reducer';
import { ticTacToe_CONFIG } from '@/utils/gameConfig';
import Board from './Board';
import Notification from '../Notification';
import './index.css';
/**
 * 游戏组件，用于管理五子棋与井字棋组件
 * @returns component
 */
function Game () {
    const dispatch = useDispatch();
    const gameState = useSelector((state: { gameState: stateTypes }) => state.gameState);
    const { boardSize, gameType, gameOver, chess } = gameState;

    const [gameTypes, setGameType] = useState(gameType);
    const [history, setHistory] = useState([initBoard(boardSize)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [stepBtnActive, setStepBtnActive] = useState(0);
    const nextChessIndex = currentMove % 2;
    const currentSquares = history[currentMove];

    // 切换游戏时
    if (gameTypes !== gameType) {
        setGameType(gameType);
        setHistory([initBoard(boardSize)]);
        setCurrentMove(0);
    }

    /**
     * 初始化棋盘值
     * @param boardSize
     * @returns string[][]
     */
    function initBoard (boardSize: number) {
        const listArray: string[][] = [];
        for (let index = 0; index < boardSize; index++) {
            listArray.push(Array(boardSize).fill(null));
        }
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
    function renderMoves () {
        const moves = history.map((_item: string[][], step: number) => {
            let description: string;
            if (step > 0) {
                description = gameTypes === ticTacToe_CONFIG.gameType ?
                    `${step}执棋   ${step % 2 === 0 ? ticTacToe_CONFIG.chess[0] : ticTacToe_CONFIG.chess[1]}` :
                    `${step}执棋   ${step % 2 === 0 ? '白方' : '黑方'}`;
            } else {
                description = '游戏开始';
            }
            const className = stepBtnActive === step ? 'game-step-button--active' : 'game-step-button';
            return (
                <li key={step}>
                    <button className={className} onClick={() => jumpTo(step)}>{description}</button>
                </li>
            );
        });
        return moves;
    }
    /**
     * 悔棋
     * @param lastMove
     * return void
     */
    function jumpTo (step: number) {
        if (step === history.length - 1) return;
        setCurrentMove(step);
        setStepBtnActive(step);
        if (gameOver) {
            dispatch(start_game({
                activeUser: step % 2 === 0 ? chess[1] : chess[0],
                winner: '',
                gameOver: false,
            }));
        }
    }
    return (
        <div className="game-status">
            <div className="game-board">
                <Board
                    nextChessIndex={nextChessIndex}
                    squares={currentSquares}
                    onPlay={handlePlay} />
                <Notification></Notification>
            </div>
            <div className="game-info">
                <ol>{renderMoves()}</ol>
            </div>
        </div>
    );
}
export default React.memo(Game);
