import { Component } from 'react';
import { connect } from 'react-redux';
import clickForAI from '@/utils/judgeAI';
import mapStateToProps from '@/utils/mapStateToProps';
import { StateTypes } from '@/components/Game/gameConfig';
import Square from './Square';
import './index.css';
interface BoardProps {
    gameState: StateTypes;
    dispatch: Function;
    gameOver: boolean;
    currentMove: number;
    board: string[][];
    recordStep: Function;
    calcGameStatus: Function;
}
interface BoardState {
    isClickForAI: boolean;
}
/**
 * 棋盘组件，用于展示棋盘基础功能
 * @param gameState redux
 * @param dispatch 派发
 * @param gameOver 游戏状态
 * @param currentMove 当前棋子步骤数
 * @param board 最新棋盘
 * @param recordStep 记录棋盘步骤
 * @param calcGameStatus 计算游戏状态
 * @returns component
 */
class Board extends Component<BoardProps, BoardState> {
    constructor (props: BoardProps) {
        super(props);
        this.state = { isClickForAI: true };
        this.renderBoardEl = this.renderBoardEl.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * 生命周期：更新数据
     * AI下第一颗棋
     */
    componentDidUpdate () {
        const { gameMode, currentMove, activeUser, chess } = this.props.gameState;
        if (gameMode === 'pve_computer' && currentMove === 0) {
            const coordinate = clickForAI(this.props.board, activeUser, chess);
            if (coordinate) {
                const [row, colum] = coordinate;
                this.handleClick(row, colum);
            }
        }
    }
    /**
     * 下棋
     * @param row 行
     * @param colum 列
     * @returns
     */
    handleClick (row: number, colum: number) {
        const coordinate = [row, colum];
        const { activeUser } = this.props.gameState;
        const { gameOver, board, currentMove, recordStep, calcGameStatus } = this.props;

        if (gameOver || board[row][colum]) return;
        const nextBoard = JSON.parse(JSON.stringify(board));  // 深拷贝 slice是浅拷贝
        nextBoard[row][colum] = activeUser;

        // 记录历史记录
        recordStep(nextBoard, coordinate);
        // 计算游戏状态
        calcGameStatus(coordinate, currentMove, false);

        // AI下棋
        this.handleClickForAI(nextBoard);
    }

    /**
     * AI下棋
     * @param nextBoard 棋盘信息
     */
    handleClickForAI (nextBoard: string[][]) {
        const { isClickForAI } = this.state;
        const { gameMode, currentMove, activeUser, chess } = this.props.gameState;
        if (gameMode === 'pvp') return;
        if (gameMode === 'pve_computer' && currentMove === 0) return;

        if (isClickForAI) {
            const coordinate = clickForAI(nextBoard, activeUser, chess);
            if (coordinate) { // 下棋
                const [row, colum] = coordinate;
                setTimeout(() => this.handleClick(row, colum), 0);
            } else { // 棋盘已满
                setTimeout(() => {
                    this.setState({ isClickForAI: !this.state.isClickForAI }); // !== isClickForAI
                }, 0);
            }
        }
        this.setState({ isClickForAI: !isClickForAI });
    }

    /**
     * 渲染棋盘
     */
    renderBoardEl () {
        const { board } = this.props;
        const { gameType } = this.props.gameState;
        const boardEl = board.map((item, rowIndex) => {
            return item.map((_item, columIndex) => {
                return (
                    <span
                        key={`${rowIndex}${columIndex}`}>
                        {
                            <Square
                                key={`${rowIndex}${columIndex}`}
                                gameType={gameType}
                                row={rowIndex}
                                colum={columIndex}
                                value={board[rowIndex][columIndex]}
                                handleClick={this.handleClick}
                            />
                        }
                        {/* 判断是否换行 */}
                        {item.length - 1 === columIndex ? <br ></br> : ''}
                    </span>
                );
            });
        });
        return boardEl;
    }

    render () {
        return (
            <div className='container'>
                <div className="game">
                    {this.renderBoardEl()}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(Board);
