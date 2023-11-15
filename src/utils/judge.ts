/**
 * 判断游戏是否结束
 * @param coordinate 坐标 calcChainForChess;
 * @param piece 棋子类型
 * @param finishCount 连子数
 * @param list 棋盘信息
 * @returns
 */
export default function calcWinner (coordinate: number[], piece: string, finishCount: number, list: string[][]) {
    const direction = ['horizontal', 'plusTilt', 'vertical', 'minusTilt'];
    for (const angle of direction) {
        let count1 = 0;
        let count2 = 0;
        count1 = checkLineChess(coordinate, angle, 'front', piece, list, count1);
        count2 = checkLineChess(coordinate, angle, 'back', piece, list, count2);

        const totalCount = count1 + count2 + 1;

        if (totalCount >= finishCount) return true;
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
function checkLineChess (
    coordinate: number[], angle: string, direction: string,
    piece: string, list: string[][], count: number
) {
    const [nextX, nextY] = getNextAxis(coordinate, angle, direction);
    // 下一颗棋子是否存在
    const isExitNextChess = list[nextX] && list[nextX][nextY] && list[nextX][nextY] === piece;

    if (isExitNextChess) {
        count++;
        return checkLineChess([nextX, nextY], angle, direction, piece, list, count);
    }
    return count;
}
/**
 * 确定下一个棋子坐标
 * @param coordinate
 * @param direction
 * @returns
 */
function getNextAxis (coordinate: number[], angle: string, direction: string) {
    const constant = direction === 'front' ? 1 : -1;
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
