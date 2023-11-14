// action 类型
export const INIT_GAME = 'INIT_GAME';
export const PLAY_GAME = 'PLAY_GAME';
export const RECORD_STEP = 'RECORD_STEP';
export const CALLBACK_STEP = 'CALLBACK_STEP';
/**
 * 初始化游戏
 * @param nextStatus
 * @returns
 */
export function initGame (nextStatus:any) {
    return {
        type: INIT_GAME,
        nextStatus,
    };
}
/**
 * 游戏继续
 * @param coord
 * @returns
 */
export function playGame (nextStatus:any) {
    return {
        type: PLAY_GAME,
        nextStatus,
    };
}
/**
 * 记录步骤记录
 * @param nextStatus
 * @returns
 */
export function recordStep (nextStatus:any) {
    return {
        type: RECORD_STEP,
        nextStatus,
    };
}
/**
 * 回滚历史记录
 * @param nextStatus
 * @returns
 */
export function callBackStep (nextStatus:any) {
    return {
        type: CALLBACK_STEP,
        nextStatus,
    };
}
