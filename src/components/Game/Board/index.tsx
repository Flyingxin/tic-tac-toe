import { useSelector, useDispatch } from 'react-redux';
import { StateTypes } from '@/components/Game/gameConfig';
import { endGame, playGame } from '@/store/gameStatus';  // action
import calcWinner from '@/utils/judge';
import Square from './Square';
import './index.css';
interface BoardType {
    nextChessIndex: number;
    squares: string[][];
    currentMove:number;
    onPlay: Function;
}
/**
 * 棋盘组件，用于展示棋盘基础功能
 * @param nextChessIndex 下一个棋子索引
 * @param squares 棋盘信息
 * @param currentMove 棋步数
 * @param onPlay 记录棋盘信息
 * @returns component
 */
const  Board = ({ nextChessIndex, squares, currentMove, onPlay }: BoardType) => {
    const dispatch = useDispatch();
    const gameState = useSelector((state: { gameState: StateTypes }) => state.gameState);
    const { gameOver, finishCount, activeUser, chess, boardSize, gameType } = gameState;
    const nextChess = chess[nextChessIndex];

    /**
     * 棋盘格子点击事件
     * @param row 棋子行索引
     * @param colum 棋子列索引
     * @returns void
     */
    function handleClick (row: number, colum: number) {
        if (gameOver || squares[row][colum]) return;
        const coordinate: number[] = [row, colum];
        const nextSquares: string[][] = JSON.parse(JSON.stringify(squares));  // 深拷贝 slice是浅拷贝
        nextSquares[row][colum] = activeUser;
        onPlay(nextSquares, coordinate);

        if (calcWinner(coordinate, activeUser, finishCount, nextSquares)) { // 胜利
            const obj = {
                winner: activeUser,
                gameOver: true,
            };
            dispatch(endGame(obj));
        } else if (currentMove === (boardSize * boardSize) - 1) { // 和棋
            const obj = {
                winner: '',
                gameOver: true,
            };
            dispatch(endGame(obj));
        } else { // 游戏继续
            dispatch(playGame({
                activeUser: nextChess,
                currentMove,
            }));
        }
    }
    // 渲染棋盘
    const boardEl = squares.map((item, rowIndex) => {
        const rowEl = item.map((_item, columIndex) => {
            return (
                <span
                    key={`${rowIndex}-${columIndex}`}>
                    <span
                        className='square'
                        onClick={() => handleClick(rowIndex, columIndex)}
                        key={`${rowIndex}${columIndex}`}>
                        {
                            squares[rowIndex][columIndex] ?
                                <Square
                                    key={`${rowIndex}${columIndex}`}
                                    gameType={gameType}
                                    value={squares[rowIndex][columIndex] }/> :
                                ''
                        }
                        {/* 判断是否换行 */}
                    </span>
                    {boardSize - 1 === columIndex ? <br ></br> : ''}
                </span>
            );
        });
        return rowEl;
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
