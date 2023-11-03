import React, { useState, useEffect } from 'react';
import { stateTypes } from '@/store/gameStatus/index';
import { useSelector, useDispatch } from 'react-redux';
import {  change_game, end_game } from '@/store/gameStatus/reducer';  // action
import { ticTacToe_CONFIG, goMoKu_CONFIG } from '@/utils/gameConfig';
import './index.css';

/**
 * 顶部组件，用于切换游戏，游戏倒计时
 * @returns component
 */
function Header () {
    const dispatch = useDispatch();
    const gameState = useSelector((state: { gameState: stateTypes }) => state.gameState);
    const { activeUser, chess, gameOver, gameType } = gameState;

    const [time, setTime] = useState(goMoKu_CONFIG.time);
    const [currentChess, setCurrentChess] = useState(activeUser);

    // 倒计时,每次挂载和数据更新前都会执行一遍
    useEffect(() => {
        if (0 <= time) {
            const timer = setTimeout(() => {
                setTime(time - 1);
                // console.log(time);
            }, 1000);
            return () => clearTimeout(timer); // 清除定时器
        }
        const winner = currentChess === chess[0] ? chess[1] : chess[0];
        const obj = {
            winner,
            gameOver: true,
        };
        dispatch(end_game(obj));
        setTime(goMoKu_CONFIG.time);
    }, [time]);

    // 切换用户时重新计时
    if (currentChess !== activeUser) {
        setCurrentChess(activeUser);
        setTime(goMoKu_CONFIG.time);
    }

    /**
     * 切换游戏
     * @param event
     * reture void
     */
    function changeGame () {
        const select = document.querySelector('select') as HTMLSelectElement;
        const index = select.selectedIndex;
        const gameType = select.options[index].value;
        // console.log(gameType);
        dispatch(change_game(gameType));
        setTime(60);
    }

    // 选手倒计时
    let countdown: string = '';
    let countdownEl: any;
    if (gameType === ticTacToe_CONFIG.gameType) {
        countdown = activeUser;
    } else if (gameType === goMoKu_CONFIG.gameType) {
        countdown = activeUser === goMoKu_CONFIG.activeUser ? '黑方' : '白方';
    }
    if (!gameOver) {
        countdownEl =
            (
                <div className={'common'}>
                    <span>{countdown}</span>玩家：
                    <span className={10 >= time ? 'danger' : ''}>{`${time} 秒`}</span>
                </div>
            );
    } else {
        countdownEl = (<span className='common'>结束</span>);
    }

    return (

        <div className='toolbar'>
            <select
                className='gameType'
                onChange={changeGame}>
                <option value="five">{goMoKu_CONFIG.name}</option>
                <option value="nine">{ticTacToe_CONFIG.name}</option>
            </select>
            {countdownEl}
            <div className='tools'>
                <h3>Made</h3>
            </div>
        </div>
    );
}

export default React.memo(Header);
