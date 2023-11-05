import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import calculateWinner from '@/utils/judge';
import { stateTypes } from '@/store/gameStatus/index';
import { end_game, play_game } from '@/store/gameStatus/reducer';  // action
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
function Board ({ nextChessIndex, squares, currentMove, onPlay }: BoardType) {
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
    function handleClick (row: number, colum: number) {
        if (gameOver || squares[row][colum]) return;

        const coordinate: number[] = [row, colum];
        const nextSquares: string[][] = JSON.parse(JSON.stringify(squares));  // 深拷贝 slice是浅拷贝
        
        nextSquares[row][colum] = activeUser;
        onPlay(nextSquares);
        
        // console.log(nextChessIndex, activeUser, nextChess);
        if (calculateWinner(coordinate, activeUser, finishCount, squares)) {
            const obj = {
                winner: activeUser,
                gameOver: true,
            };
            dispatch(end_game(obj));
        }else if (currentMove === boardSize*boardSize -1) {
            const obj = {
                winner: '',
                gameOver: true,
            };
            console.log(obj);
            
            dispatch(end_game(obj));            
        } else {
            dispatch(play_game({ activeUser: nextChess }));
        }
    }
    /**
     * 渲染棋盘
     * @returns string[][]
     */
    function renderBoard () {
        const boardSize = squares.length;
        const squareList: string[][] = [];
        // console.log(squares);

        for (let row = 0; row < boardSize; row++) {
            squareList.push([]);
            for (let colum = 0; colum < boardSize; colum++) {
                const square: any = (
                    <span
                        key={`${row * boardSize * 2}${colum * boardSize * 2}`}>
                        <Square
                            key={`${row}${colum}`}
                            value={squares[row][colum]}
                            onSquareClick={() => handleClick(row, colum)} />
                        {/* 判断是否换行 */}
                        {boardSize - 1 === colum ? <br key={`${row * boardSize}${colum * boardSize}`}></br> : ''}
                    </span>
                );
                squareList.push(square);
            }
        }
        return squareList;
    }

    return (
        <>
            <div className='container'>
                <div className="game">
                    {renderBoard()}
                </div>
            </div>

        </>
    );
}

export default React.memo(Board);
