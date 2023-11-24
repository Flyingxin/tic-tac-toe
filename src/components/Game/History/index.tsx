import { Component } from 'react';
import { connect } from 'react-redux';
import { StateTypes } from '../gameConfig';
import mapStateToProps from '@/utils/mapStateToProps';
import './index.css';
interface HistoryProps  {
    gameState: StateTypes;
    currentMove: number;
    axisHistory: number[][];
    boardHistory: string[][][];
    dispatch: Function;
    calcGameStatus: Function;
}
interface HistoryState  {
}
/**
 * 历史记录组件
 * @param gameState redux
 * @param currentMove 当前步骤数
 * @param axisHistory 坐标历史记录;
 * @param boardHistory 棋盘历史记录;
 * @param dispatch 派发;
 * @param calcGameStatus 计算游戏状态;
 * @returns component
 */
class History extends Component<HistoryProps, HistoryState> {
    constructor (props: HistoryProps) {
        super(props);

        this.jumpToStep = this.jumpToStep.bind(this);
        this.renderBoardHistoryEl = this.renderBoardHistoryEl.bind(this);
    }

    /**
     * 悔棋
     * @param step 步骤
     * return void
     */
    jumpToStep (step: number) {
        // 禁止回退至AI步骤
        const { gameMode } = this.props.gameState;
        if (gameMode === 'pve_computer' && step % 2 === 0) return;
        if (gameMode === 'pve_player' && (step % 2 === 1 || step === 0)) return;

        const { currentMove, axisHistory, calcGameStatus } = this.props;
        if (step !== 0 && step === currentMove) return;
        // 计算游戏状态
        calcGameStatus(axisHistory[step], step, true);
    }

    /**
     * 渲染步骤按钮组
     */
    renderBoardHistoryEl () {
        const { currentMove, axisHistory, boardHistory } = this.props;
        const { chess } = this.props.gameState;
        const boardHistoryEl = boardHistory.map((_item: string[][], step: number) => {
            const [row, colum] = axisHistory[step];
            let description: string;
            step > 0 ?
                description = `${step}执棋  ${chess[step % 2]} (${row + 1},${colum + 1})` :
                description = '游戏开始';

            const className = currentMove === step ? 'game-history-button--active' : 'game-history-button';
            return (
                <li key={step}>
                    <button className={className} onClick={() => this.jumpToStep(step)}>{description}</button>
                </li>
            );
        });
        return boardHistoryEl;
    }

    render () {
        return (
            <ul>
                {this.renderBoardHistoryEl()}
            </ul>
        );
    }
}


export default connect(mapStateToProps)(History);
