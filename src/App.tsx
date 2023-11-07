import Game from './components/Game';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import './App.css';

// interface appType {
//     dispatch: Function;
//     gameState: stateTypes;
// }

/**
 * App组件用于管理所有子组件
 * @returns
 */
export default function App () {
    let isToggleGame:boolean = true;

    return (
        <>
            <Header toggleGame={(isToggle:boolean) => isToggleGame = isToggle}></Header>
            <div className='main'>
                <StatusBar></StatusBar>
                <Game isToggleGame={isToggleGame}></Game>
            </div>
        </>
    );
}

/**
 * 将状态管理数据以props形式传入
 * @param state
 * @returns
 */
// function mapStateToProps (state: appType) {
//     return { gameState: state.gameState };
// }

// connect(mapStateToProps)(App);
