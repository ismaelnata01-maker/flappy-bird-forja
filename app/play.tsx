import MovingBackground from "@/components/MovingBackground";
import { Image, ImageBackground, StyleSheet, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import Pipe from "@/components/Pipe";
import { DURATION } from "@/constants/animation";
import BackgroundSound from "@/components/BackgroundSound";
import { CAP_HEIGHT, GAP_SIZE } from "@/constants/pipe";
import Bird from "@/components/Bird";
import { GROUND_HEIGHT } from "@/constants/ground";
import { useGame } from "@/hooks/game";
import { JUMP } from "@/constants/bird";

interface Obstacle{
    id: string;
    gapY: number;
}

export default function Play() {
    const { height } = Dimensions.get("window");
    const { velocity } = useGame();
    const [obstacles, setObstacle] = useState([] as Obstacle[]);
    const jumpSound = useAudioPlayer(require("@/assets/audios/wing.mp3"));
    const pointSound = useAudioPlayer(require("@/assets/audios/point.mp3"));

    function handleJump() {
        velocity.value = JUMP;
        try{
            jumpSound.seekTo(0);
            jumpSound.play();
        } catch (error) {}
    }

    function spawObstacle() {
        setObstacle((oldValue) => [...oldValue, {id: Date.now().toString(), gapY: randomGapY()},]);
    }

    function removeObstacle(id: string) {
        setObstacle((oldValue) => oldValue.filter((item) => item.id !== id));
        try{
            pointSound.seekTo(0);
            pointSound.play();
        } catch (error) {};
    }

    function randomGapY(){
        const min = CAP_HEIGHT + GAP_SIZE / 2;
        const max = height - CAP_HEIGHT - GROUND_HEIGHT - GAP_SIZE / 2;

        return Math.random() * (max - min) + min;
    }

    useEffect(() => {
        const interval = setInterval(() => spawObstacle(), DURATION / 4);

        return () => clearInterval(interval);
    }, []);

    

    return (
        <ImageBackground
            source={require("@/assets/images/flappy-bird-background.png")}
            resizeMode="stretch"
            style={styles.background}
        >

        <BackgroundSound source={require("@/assets/audios/hammer.mp3")}/>

            <Pressable onPress={handleJump} style={styles.background}>
                <SafeAreaView style={styles.screen}>
                    <Bird />

                    {obstacles.map((obstacle) => <Pipe key={obstacle.id} gapY={obstacle.gapY} onEnd={() => removeObstacle(obstacle.id)} />)}
                </SafeAreaView>
            </Pressable>

            <MovingBackground />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
    },
    screen: {
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    bird: {
        width: 109,
        height: 78,
        position: "absolute",
        top: "50%",
        left: 100,
    },
})