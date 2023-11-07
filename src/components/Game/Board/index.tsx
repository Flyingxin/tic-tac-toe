import { useSelector, useDispatch } from 'react-redux';
import { stateTypes } from '@/components/Game/gameConfig';
import { endGame, playGame } from '@/store/gameStatus/reducer';  // action
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
    const gameState = useSelector((state: { gameState: stateTypes }) => state.gameState);
    const { gameOver, finishCount, activeUser, chess, boardSize } = gameState;
    const nextChess = chess[nextChessIndex];

    /**
     * 棋盘格子点击事件
     * @param row 棋子行索引
     * @param colum 棋子列索引
     * @returns void
     */
    function handleClick (row: number, colum: number, squares:string[][]) {
        if (gameOver || squares[row][colum]) return;
        const coordinate: number[] = [row, colum];
        const nextSquares: string[][] = JSON.parse(JSON.stringify(squares));  // 深拷贝 slice是浅拷贝
        nextSquares[row][colum] = activeUser;
        onPlay(nextSquares);
        // console.log(nextChessIndex, activeUser, nextChess);
        if (calcWinner(coordinate, activeUser, finishCount, squares)) {
            const obj = {
                winner: activeUser,
                gameOver: true,
            };
            dispatch(endGame(obj));
        } else if (currentMove === (boardSize * boardSize) - 1) {
            const obj = {
                winner: '',
                gameOver: true,
            };
            dispatch(endGame(obj));
        } else {
            dispatch(playGame({ activeUser: nextChess }));
        }
    }

    // 渲染棋盘
    const boardEl = squares.map((item, rowIndex) => {
        return item.map((_item, columIndex) => {
            return (
                <span
                    key={`${(rowIndex + 1) * boardSize * 2}${(columIndex + 1) * boardSize * 2}`}>
                    <Square
                        key={`${rowIndex}${columIndex}`}
                        value={squares[rowIndex][columIndex] }
                        onSquareClick={() => handleClick(rowIndex, columIndex, squares)} />
                    {/* 判断是否换行 */}
                    {boardSize - 1 === columIndex ? <br ></br> : ''}
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
