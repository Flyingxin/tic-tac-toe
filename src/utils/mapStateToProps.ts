
import { StateTypes } from '@/components/Game/gameConfig';
/**
 * 将状态管理数据以props形式传入
 * @param state
 * @returns
 */
export default function mapStateToProps(state: StateTypes) {
    return { gameState: state };
}
