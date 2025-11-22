import { Scene } from './components/3d/Scene';
import { Overlay } from './components/ui/Overlay';
import { AudioController } from './components/logic/AudioController';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import './styles/global.css';

function App() {
    return (
        <>
            <AnimatedBackground />
            <Scene />
            <Overlay />
            <AudioController />
        </>
    );
}

export default App;
