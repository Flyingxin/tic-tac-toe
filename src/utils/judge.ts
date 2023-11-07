/* eslint-disable max-len */
/**
 * 判断游戏是否结束
 * @param coordinate
 * @param piece
 * @param finishCount
 * @param list
 * @returns
 */
export default function calcWinner (coordinate: number[], piece: string, finishCount: number, list: string[][]) {
    const direction = ['horizontal', 'plusTilt', 'vertical', 'minusTilt'];
    for (const angle of direction) {
        let count = 1;
        count = checkLineChess(coordinate, coordinate, [angle, 'front'], piece, list, count);
        if (count >= finishCount) return true;
    }

    return false;
}
/**
 * 计算不同方向上连棋
 * @param coordinate
 * @param nextChess
 * @param direction
 * @param piece
 * @param list
 * @param count
 */
function checkLineChess (coordinate: number[], nextChess: number[], direction: string[], piece: string, list: string[][], count: number) {
    const [angle, orientation] = direction;
    const [nextX, nextY] = getNextAxis(nextChess, direction);
    // 下一颗棋子是否存在
    const isExitNextChess = list[nextX] && list[nextX][nextY] && list[nextX][nextY] === piece;

    // 对应角度前边棋子
    if (orientation === 'front') {
        if (isExitNextChess) {
            count++;
            return checkLineChess(coordinate, [nextX, nextY], direction, piece, list, count);
        }
        return checkLineChess(coordinate, coordinate, [angle, 'back'], piece, list, count);
    }
    // 对应角度后边边棋子
    if (orientation === 'back' && isExitNextChess) {
        count++;
        return checkLineChess(coordinate, [nextX, nextY], direction, piece, list, count);
    }
    return count;
}
/**
 * 确定下一个棋子坐标
 * @param coordinate
 * @param direction
 * @returns
 */
function getNextAxis (coordinate: number[], direction: string[]) {
    const [angle, orientation] = direction;
    const constant = orientation === 'front' ? 1 : -1;
    let [xAxis, yAxis] = coordinate;
    switch (angle) {
        case 'horizontal':
            yAxis += constant;
            break;
        case 'plusTilt':
            xAxis -= constant;
            yAxis += constant;
            break;
        case 'vertical':
            xAxis -= constant;
            break;
        case 'minusTilt':
            xAxis += constant;
            yAxis += constant;
            break;
    }
    return [xAxis, yAxis];
}
