

import { useSelector } from 'react-redux';
import { StateTypes } from '../gameConfig';
import './index.css';
interface HistoryType {
    currentMove: number;
    axisHistory: number[][];
    boardHistory: string[][][];
    calcGameStatus: Function;
}

/**
 * 历史记录组件
 * @param currentMove 当前步骤数
 * @param axisHistory 坐标历史记录;
 * @param boardHistory 棋盘历史记录;
 * @param calcGameStatus 计算游戏状态;
 * @returns component
 */
function History({ currentMove, axisHistory, boardHistory, calcGameStatus }: HistoryType): JSX.Element {
    const gameState = useSelector((state: { gameState: StateTypes }) => state.gameState);
    const { chess } = gameState;

    /**
     * 悔棋
     * @param step 步骤
     * return void
     */
    function jumpToStep(step: number) {
        if (step !== 0 && step === currentMove) return;
        // 计算游戏状态
        calcGameStatus(axisHistory[step], step, true);
    }

    /**
     * 渲染步骤按钮组
     */
    const boardHistoryEl = boardHistory.map((_item: string[][], step: number) => {
        const [row, colum] = axisHistory[step];
        let description: string;
        step > 0 ?
            description = `${step}执棋  ${chess[step % 2]} (${row + 1},${colum + 1})` :
            description = '游戏开始';

        const className = currentMove === step ? 'game-history-button--active' : 'game-history-button';
        return (
            <li key={step}>
                <button className={className} onClick={() => jumpToStep(step)}>{description}</button>
            </li>
        );
    });

    return (
        <ul>
            {boardHistoryEl}
        </ul>
    );
}
export default History;
