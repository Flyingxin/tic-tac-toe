import { connect } from 'react-redux';
import { stateTypes } from './store/gameStatus/index';
import Game from './components/Game';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import './App.css';

interface appType {
    dispatch: Function;
    gameState: stateTypes;
}
/**
 * App组件用于管理所有子组件
 * @returns
 */
function App () {
    return (
        <>
            {/* <button onClick={ccc}>123</button> */}
            <Header></Header>
            <div className='main'>
                <StatusBar></StatusBar>
                <Game></Game>
            </div>
        </>
    );
}
/**
 * 将状态管理数据以props形式传入
 * @param state
 * @returns
 */
function mapStateToProps (state: appType) {
    return { gameState: state.gameState };
}

export default connect(mapStateToProps)(App);
