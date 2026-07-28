import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { SharedValue, useSharedValue } from "react-native-reanimated";

interface GameContextProps{
    birdY: SharedValue<number>;
    velocity: SharedValue<number>;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    highscore: number;
    reset: () => void;
    gameOver: () => void;
    selectedSkin: number;
    setSelectedSkin: React.Dispatch<React.SetStateAction<number>>;
}

const GameContext = createContext({} as GameContextProps);

export function GameProvider({ children }: { children: ReactNode }) {
    const { height } = Dimensions.get("window");
    const hitAudio = useAudioPlayer(require("@/assets/audios/impact.mp3"));
    const birdY = useSharedValue(height / 2);
    const velocity = useSharedValue(0);
    const [score, setScore] = useState(0);
    const [highscore, setHightscore] = useState(0);
    const [selectedSkin, setSelectedSkin] = useState(0);

    function reset() {
        setScore(0);
        birdY.value = height / 2;
        velocity.value = 0;
    }

    function gameOver(){
        router.replace("/game-over");
        try{
            hitAudio.seekTo(0);
            hitAudio.play();
        }catch (error) {}
        if(score > highscore){
            setHightscore(score);
            AsyncStorage.setItem("highstore", score.toString());
        }
    }

    useEffect(() => {
        AsyncStorage.getItem("highscore").then((value) => setHightscore(+(value || 0)));
    }, []);

    return(
        <GameContext.Provider value={{birdY, velocity, score, setScore, highscore, reset, gameOver, selectedSkin, setSelectedSkin }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);

export default GameContext

