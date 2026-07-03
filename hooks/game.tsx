import { createContext, ReactNode, useContext, useState } from "react";
import { Dimensions } from "react-native";
import { SharedValue, useSharedValue } from "react-native-reanimated"

interface GameContextProps{
    birdY: SharedValue<number>;
    velocity: SharedValue<number>;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    reset: () => void;
}

const GameContext = createContext({} as GameContextProps);

export function GameProvider({ children }: { children: ReactNode }) {
    const { height } = Dimensions.get("window");
    const birdY = useSharedValue(height / 2);
    const velocity = useSharedValue(0);
    const [score, setScore] = useState(0);

    function reset() {
        setScore(0);
        birdY.value = height / 2;
        velocity.value = 0;
    }

    return(
        <GameContext.Provider value={{birdY, velocity, score, setScore, reset }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);

export default GameContext