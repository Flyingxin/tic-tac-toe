
/**
 * 判断游戏是否结束
 * @param coordinate
 * @param piece
 * @param finishCount
 * @param list
 * @returns
 */
export default function (coordinate: number[], piece: string, finishCount: number, list: string[][]) {
    // console.log(piece);

    const [row, colum] = coordinate;
    // 统计数目
    let count = 0;
    // 0度角
    count = justiceXL(row, colum, piece, list, count);
    count = justiceXR(row, colum, piece, list, count);
    if (count >= finishCount) {
        return true;
    }

    count = 0;
    // 45度角
    count = justiceXYLL(row, colum, piece, list, count);
    count = justiceXYLR(row, colum, piece, list, count);
    if (count >= finishCount) {
        return true;
    }

    count = 0;
    // 90度角
    count = justiceYT(row, colum, piece, list, count);
    count = justiceYB(row, colum, piece, list, count);
    if (count >= finishCount) {
        return true;
    }

    count = 0;
    // 135度角
    count = justiceXYRR(row, colum, piece, list, count);
    count = justiceXYRL(row, colum, piece, list, count);
    if (count >= finishCount) {
        return true;
    }

    return false;
}

/**
 * 0度角左判断
 * @param row 行索引
 * @param colum 列索引
 * @param piece 填写文字
 * @param list 棋盘信息
 * @param count 相同棋子连续数
 * @returns  相同棋子连续数
 */
function justiceXL (row: number, colum: number, piece: string, list: string[][], count: number) {
    if (list[row] && list[row][colum - 1] && list[row][colum - 1]) {
        if (list[row][colum - 1] === piece) {
            count++;
            return justiceXL(row, colum - 1, piece, list, count);
        }
    }

    return count;
}

/**
 * 0度角右边判断
 * @param row 行索引
 * @param colum 列索引
 * @param piece 填写文字
 * @param list 棋盘信息
 * @param count 相同棋子连续数
 * @returns  相同棋子连续数
 */
function justiceXR (row: number, colum: number, piece: string, list: string[][], count: number) {
    if (list[row] && list[row][colum + 1] && list[row][colum + 1]) {
        if (list[row][colum + 1] === piece) {
            count++;
            return justiceXR(row, colum + 1, piece, list, count);
        }
    }

    return count;
}

/**
 * 45度角左判断
 * @param row 行索引
 * @param colum 列索引
 * @param piece 填写文字
 * @param list 棋盘信息
 * @param count 相同棋子连续数
 * @returns  相同棋子连续数
 */
function justiceXYLL (row: number, colum: number, piece: string, list: string[][], count: number) {
    if (list[row + 1] && list[row + 1][colum - 1] && list[row + 1][colum - 1]) {
        if (list[row + 1][colum - 1] === piece) {
            count++;
            return justiceXYLL(row + 1, colum - 1, piece, list, count);
        }
    }

    return count;
}

/**
 * 45度角右边判断
 * @param row 行索引
 * @param colum 列索引
 * @param piece 填写文字
 * @param list 棋盘信息
 * @param count 相同棋子连续数
 * @returns  相同棋子连续数
 */
function justiceXYLR (row: number, colum: number, piece: string, list: string[][], count: number) {
    if (list[row - 1] && list[row - 1][colum + 1] && list[row - 1][colum + 1]) {
        if (list[row - 1][colum + 1] === piece) {
            count++;
            return justiceXYLR(row + 1, colum + 1, piece, list, count);
        }
    }

    return count;
}

/**
 * 90度角上判断
 * @param row 行索引
 * @param colum 列索引
 * @param piece 填写文字
 * @param list 棋盘信息
 * @param count 相同棋子连续数
 * @returns  相同棋子连续数
 */
function justiceYT (row: number, colum: number, piece: string, list: string[][], count: number) {
    if (list[row - 1] && list[row - 1][colum] && list[row - 1][colum]) {
        if (list[row - 1][colum] === piece) {
            count++;
            return justiceYT(row - 1, colum, piece, list, count);
        }
    }

    return count;
}

/**
 * 90度角下判断
 * @param row 行索引
 * @param colum 列索引
 * @param piece 填写文字
 * @param list 棋盘信息
 * @param count 相同棋子连续数
 * @returns  相同棋子连续数
 */
function justiceYB (row: number, colum: number, piece: string, list: string[][], count: number) {
    if (list[row + 1] && list[row + 1][colum] && list[row + 1][colum]) {
        if (list[row + 1][colum] === piece) {
            count++;
            return justiceYB(row + 1, colum, piece, list, count);
        }
    }

    return count;
}


/**
 * 135度角左判断
 * @param row 行索引
 * @param colum 列索引
 * @param piece 填写文字
 * @param list 棋盘信息
 * @param count 相同棋子连续数
 * @returns  相同棋子连续数
 */
function justiceXYRR (row: number, colum: number, piece: string, list: string[][], count: number) {
    if (list[row - 1] && list[row - 1][colum - 1] && list[row - 1][colum - 1]) {
        if (list[row - 1][colum - 1] === piece) {
            count++;
            return justiceXYRR(row - 1, colum - 1, piece, list, count);
        }
    }

    return count;
}

/**
 * 135度角右判断
 * @param row 行索引
 * @param colum 列索引
 * @param piece 填写文字
 * @param list 棋盘信息
 * @param count 相同棋子连续数
 * @returns  相同棋子连续数
 */
function justiceXYRL (row: number, colum: number, piece: string, list: string[][], count: number) {
    if (list[row + 1] && list[row + 1][colum + 1] && list[row + 1][colum + 1]) {
        if (list[row + 1][colum + 1] === piece) {
            count++;
            return justiceXYRL(row + 1, colum + 1, piece, list, count);
        }
    }

    return count;
}
