import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initGame } from '@/store/gameStatus';
import GAME_CONFIG, { StateTypes } from '@/components/Game/gameConfig';
import './index.css';
interface HeaderType {
    gameOver: boolean;
    countdown: number;
    setGameOver: Function;
    setWinner: Function;
    setCountDown: Function;
}
/**
 * 顶部组件，用于切换游戏，游戏倒计时
 * @param gameOver 游戏状态
 * @param countdown 倒计时;
 * @param setGameOver: 修改游戏状态;
 * @param setWinner: 修改胜利者;
 * @param setCountDown: 修改倒计时;
 * @returns component
 */
function Header({ gameOver, countdown, setGameOver, setWinner, setCountDown }: HeaderType) {
    const dispatch = useDispatch();
    const gameState = useSelector((state: { gameState: StateTypes }) => state.gameState);
    const { activeUser, chess } = gameState;

    // 倒计时,每次挂载和数据更新前都会执行一遍
    useEffect(() => {
        if (gameOver) return;
        if (countdown >= 1) {
            const timer = setTimeout(() => {
                setCountDown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer); // 清除定时器
        }

        const winner = activeUser === chess[0] ? chess[1] : chess[0];
        setGameOver(true);
        setWinner(winner);
    }, [countdown, gameOver]);


    /**
     * 切换游戏
     * @param event
     * return void
     */
    function changeGame(event: any) {
        const selectValue = event.target.value;
        // console.log(selectValue);
        dispatch(initGame({ gameType: selectValue }));
        setGameOver(false);
        setCountDown(GAME_CONFIG[selectValue].time);
        // event.preventDefault();
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

    // 倒计时
    let countdownEl: JSX.Element;
    gameOver ?
        countdownEl = (<div className='common'>结束</div>) :
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
export default Header;
