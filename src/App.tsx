import { useState } from 'react';
import { useSelector } from 'react-redux';
import Game from './components/Game';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import { StateTypes } from './components/Game/gameConfig';
import './App.css';

/**
 * App组件用于管理所有子组件
 * @returns
 */
export default function App () {
    const gameState = useSelector((state: { gameState: StateTypes }) => state.gameState);
    const { time, gameType, chess, boardSize } = gameState;

    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] =  useState('');
    const [countdown, setCountDown] = useState(time);
    const [boardHistory, setBoardHistory] = useState([initBoard(boardSize)]);
    const [axisHistory, setAxisHistory] = useState([[0, 0]]);
    const [currentMove, setCurrentMove] = useState(0);

    /**
     * 棋盘初始化
     * @param boardSize 棋盘尺寸
     * @returns string[][]
     */
    function initBoard (boardSize: number) {
        const rowArr = Array(boardSize).fill(null);
        return rowArr.map(() =>  rowArr);
    }

    return (
        <>
            <Header
                gameOver={gameOver}
                setGameOver={setGameOver}
                setWinner={setWinner}
                countdown={countdown}
                setCountDown={setCountDown}
                setBoardHistory={setBoardHistory}
                setAxisHistory={setAxisHistory}
                setCurrentMove={setCurrentMove}/>
            <div className='main'>
                <StatusBar
                    gameType={gameType}
                    chess={chess}/>
                <Game
                    boardHistory={boardHistory}
                    setBoardHistory={setBoardHistory}
                    axisHistory={axisHistory}
                    setAxisHistory={setAxisHistory}
                    currentMove={currentMove}
                    setCurrentMove={setCurrentMove}
                    gameOver={gameOver}
                    winner={winner}
                    setGameOver={setGameOver}
                    setCountDown={setCountDown}
                    setWinner={setWinner}
                />
            </div>
        </>
    );
}
