import { Scene } from './components/3d/Scene';
import { Overlay } from './components/ui/Overlay';
import { AudioController } from './components/logic/AudioController';
import './styles/global.css';

function App() {
    return (
        <>
            <Scene />
            <Overlay />
            <AudioController />
        </>
    );
}

export default App;
