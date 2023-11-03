/**
 * 生成uuid
 * @param length
 * @returns
 */
export default function generateUuid (length = 5) {
    return Number(Math.random().toString()
        .substr(3, length) + Date.now()).toString(36);
}
