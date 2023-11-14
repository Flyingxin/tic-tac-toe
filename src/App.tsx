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
export default function App() {
    const gameState = useSelector((state: { gameState: StateTypes }) => state.gameState);
    const { time, gameType, chess } = gameState;

    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState('');
    const [countdown, setCountDown] = useState(time);


    return (
        <>
            <Header
                gameOver={gameOver}
                setGameOver={setGameOver}
                setWinner={setWinner}
                countdown={countdown}
                setCountDown={setCountDown} />
            <div className='main'>
                <StatusBar
                    gameType={gameType}
                    chess={chess} />
                <Game
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
