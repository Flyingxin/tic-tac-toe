/* eslint-disable max-len */

/**
 * 判断游戏是否结束
 * @param coordinate
 * @param piece
 * @param finishCount
 * @param list
 * @returns
 */
export default function (coordinate: number[], piece: string, finishCount: number, list: string[][]) {
    // 统计数目
    let count = 1;
    // 0度角
    count = justice(coordinate, coordinate, ['0', 'front'], piece, list, count);
    if (count >= finishCount) return true;

    count = 1;
    // 45度角
    count = justice(coordinate, coordinate, ['45', 'front'], piece, list, count);
    if (count >= finishCount) return true;

    count = 1;
    // 90度角
    count = justice(coordinate, coordinate, ['90', 'front'], piece, list, count);
    if (count >= finishCount) return true;

    count = 1;
    // 135度角
    count = justice(coordinate, coordinate, ['135', 'front'], piece, list, count);
    if (count >= finishCount) return true;

    return false;
}
/**
 *  水平判断
 * @param coordinate
 * @param nextChess
 * @param direction
 * @param piece
 * @param list
 * @param count
 */
function justice (coordinate:number[], nextChess:number[], direction:string[], piece:string, list:string[][], count:number) {
    const [nextX, nextY] = linner(nextChess, direction);
    const isExist = list[nextX] && list[nextX][nextY] && list[nextX][nextY] === piece;
    if (direction[1] === 'front') {
        if (isExist) {
            count++;
            return justice(coordinate, [nextX, nextY], direction, piece, list, count);
        }
        return justice(coordinate, coordinate, [direction[0], 'back'], piece, list, count);
    }
    if (direction[1] === 'back' && isExist) {
        count++;
        return justice(coordinate, [nextX, nextY], direction, piece, list, count);
    }
    return count;
}
/**
 * 确定下一个棋子坐标
 * @param coordinate
 * @param direction
 * @returns
 */
function linner (coordinate:number[], direction:string[]) {
    const  angle  = direction[0];
    const constant = direction[1] === 'front' ? 1 : -1;
    let [xAxis, yAxis] = coordinate;
    if (angle === '0') {
        yAxis = constant + yAxis;
    } else if (angle === '45') {
        xAxis = constant + xAxis;
        yAxis = constant + yAxis;
    } else if (angle === '90') {
        xAxis = constant + xAxis;
    } else if (angle === '135') {
        xAxis = xAxis -  constant;
        yAxis = yAxis -  constant;
    }

    return [xAxis, yAxis];
}
