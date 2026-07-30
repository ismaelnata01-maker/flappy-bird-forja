import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import { Skin } from "@/constants/skins";

interface GameContextProps{
    birdY: SharedValue<number>;
    velocity: SharedValue<number>;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    highscore: number;
    reset: () => void;
    gameOver: () => void;
    selectedSkin: number;
    selectSkin: (index: number) => void;
    coin: number;
    CoinLow: (skin: Skin) => void;
    unlockedSkins: string[];
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
    const [coin, setCoin] = useState(0);
    const [unlockedSkins, setUnlockedSkins] = useState(["Starwalker"])

    function reset() {
        setScore(0);
        birdY.value = height / 2;
        velocity.value = 0;
    }

    function CoinLow(skin: Skin) {
        const updatedUnlocked = [...unlockedSkins, skin.name];

        AsyncStorage.setItem("coin", (coin - skin.price).toString())
            .then(() => setCoin((oldValue) => oldValue - skin.price));

        AsyncStorage.setItem("unlockedSkins", JSON.stringify(updatedUnlocked))
            .then(() => setUnlockedSkins(updatedUnlocked));
    }
    //function CoinLow(skin: Skin){
    //    
    //    AsyncStorage.setItem("coin", (coin - skin.price).toString()).then(() => setCoin((oldValue) => oldValue - skin.price));
    //}

    function selectSkin(index: number){
        AsyncStorage.setItem("index", (index).toString()).then(() => setSelectedSkin(index));
    }

    function gameOver(){
        router.replace("/game-over");
        try{
            hitAudio.seekTo(0);
            hitAudio.play();
        }catch (error) {}
        if(score > highscore){
            setHightscore(score);
            AsyncStorage.setItem("highscore", score.toString());
        }
        AsyncStorage.setItem("coin", (coin + score).toString()).then(() => setCoin((oldValue) => oldValue + score));
    }

    useEffect(() => {
    AsyncStorage.getItem("highscore").then((value) => setHightscore(+(value || 0)));
    AsyncStorage.getItem("coin").then((value) => setCoin(+(value || 0)));
    AsyncStorage.getItem("index").then((value) => setSelectedSkin(+(value || 0)));

    AsyncStorage.getItem("unlockedSkins").then((value) => {
        if (value) {
            setUnlockedSkins(JSON.parse(value));
        }
    
    });
}, []);

    //useEffect(() => {
    //    AsyncStorage.getItem("highscore").then((value) => setHightscore(+(value || 0)));
    //    AsyncStorage.getItem("coin").then((value) => setCoin(+(value || 0)));
    //    AsyncStorage.getItem("index").then((value) => setSelectedSkin(+(value || 0)));
    //}, []);

    return(
        <GameContext.Provider value={{birdY, velocity, score, setScore, highscore, reset, gameOver, selectedSkin, selectSkin, coin, CoinLow,
    unlockedSkins,
  }}
>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);

export default GameContext
