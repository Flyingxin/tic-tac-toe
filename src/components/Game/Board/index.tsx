import { useSelector } from 'react-redux';
import { useCallback, useState, useEffect } from 'react';
import { StateTypes } from '@/components/Game/gameConfig';
import Square from './Square';
import './index.css';
interface BoardType {
    gameOver:boolean;
    currentMove:number;
    board: string[][];
    recordStep: Function;
    calcGameStatus:Function;
}
/**
 * 棋盘组件，用于展示棋盘基础功能
 * @param gameOver 游戏状态
 * @param currentMove 当前棋子步骤数
 * @param board 最新棋盘
 * @param recordStep 记录棋盘步骤
 * @param calcGameStatus 计算游戏状态
 * @returns component
 */
const Board = ({ gameOver, currentMove, board, recordStep, calcGameStatus }: BoardType) => {
    const gameState = useSelector((state: { gameState: StateTypes }) => state.gameState);
    const { activeUser, gameType } = gameState;
    const [coordinate, setCoordinate] = useState([0, 0]);
    const [isGameStart, setIsGameStart] = useState(false);

    // 新增棋子监听
    useEffect(() => {
        if (isGameStart) {
            const [row, colum] = coordinate;
            if (gameOver || board[row][colum]) return;
            const nextBoard = JSON.parse(JSON.stringify(board));  // 深拷贝 slice是浅拷贝
            nextBoard[row][colum] = activeUser;
            // 记录历史记录
            recordStep(nextBoard, coordinate);
            // 计算游戏状态
            calcGameStatus(coordinate, currentMove, false);
        } else {
            setIsGameStart(true);
        }
    }, [coordinate]);

    /**
     * 下棋
     * @param row 行
     * @param colum 列
     * @returns
     */
    const handleClick = useCallback((row: number, colum: number) => {
        setCoordinate([row, colum]);
    }, []);

    // 渲染棋盘
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
                            handleClick={handleClick}
                        />
                    }
                    {/* 判断是否换行 */}
                    {item.length - 1 === columIndex ? <br ></br> : ''}
                </span>
            );
        });
    });

    return (
        <div className='container'>
            <div className="game">
                {boardEl}
            </div>
        </div>
    );
};
export default Board;
