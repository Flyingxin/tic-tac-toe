import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  initGame, endGame } from '@/store/gameStatus/reducer';  // action
import GAME_CONFIG, { stateTypes } from '@/components/Game/gameConfig';
import './index.css';

/**
 * 顶部组件，用于切换游戏，游戏倒计时
 * @returns component
 */
export default function Header () {
    const dispatch = useDispatch();
    const gameState = useSelector((state: { gameState: stateTypes }) => state.gameState);
    const { activeUser, chess, gameOver, gameType, time } = gameState;
    const [countdown, setCountdown] = useState(GAME_CONFIG[gameType].time);
    const [currentChess, setCurrentChess] = useState(activeUser);
    /**
     * 切换游戏
     * @param event
     * reture void
     */
    function changeGame (event:any) {
        const selectValue = event.target.value;
        // console.log(selectValue);
        dispatch(initGame({ gameType: selectValue }));
        setCountdown(time);
        event.preventDefault();
    }

    // option下拉选项
    const options = Object.keys(GAME_CONFIG);
    const optionEl = options.map((item, index) => {
        return (
            <option
                key={index}
                value={item}>
                {GAME_CONFIG[item].name}
            </option>);
    });


    // 倒计时,每次挂载和数据更新前都会执行一遍
    useEffect(() => {
        if (gameOver) return;
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer); // 清除定时器
        }
        const winner = activeUser === chess[0] ? chess[1] : chess[0];
        const obj = {
            winner,
            gameOver: true,
        };

        dispatch(endGame(obj));
        setCountdown(GAME_CONFIG[gameType].time);
    }, [countdown]);

    // 切换用户时重新计时
    if (currentChess !== activeUser) {
        setCurrentChess(activeUser);
        setCountdown(time);
    }

    // 倒计时
    let countdownEl: JSX.Element;
    gameOver ?
        countdownEl = (<div className='common'>结束</div>)    :
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
                onChange={changeGame}>
                {optionEl}
            </select>
            {countdownEl}
            <div className='tools'>
                <h3>Made</h3>
            </div>
        </div>
    );
}

