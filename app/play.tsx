import MovingBackground from "@/components/MovingBackground";
import { Image, ImageBackground, StyleSheet, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import Pipe from "@/components/Pipe";
import { DURATION, JUMP } from "@/constants/animation";
import BackgroundSound from "@/components/BackgroundSound";
import { CAP_HEIGHT, GAP_SIZE } from "@/constants/pipe";
import Bird from "@/components/Bird";
import { GROUND_HEIGHT } from "@/constants/ground";
import { useGame } from "@/hooks/game";
import { View, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { BIRD } from "@/constants/bird";

interface Obstacle {
    id: string;
    gapY: number;
}

const { height } = Dimensions.get("window");

export default function Play() {
    const { velocity, setScore, score } = useGame();
    const [obstacles, setObstacle] = useState([] as Obstacle[]);
    const [started, setStarted] = useState(false);

    const jumpSound = useAudioPlayer(require("@/assets/audios/wing.mp3"));
    const pointSound = useAudioPlayer(require("@/assets/audios/point.mp3"));

    function handleJump() {
        if (!started) setStarted(true);

        velocity.value = JUMP;
        try {
            jumpSound.seekTo(0);
            jumpSound.play();
        } catch (error) { }
    }

    function spawObstacle() {
        setObstacle((oldValue) => [...oldValue, { id: Date.now().toString(), gapY: randomGapY() },]);
    }

    function removeObstacle(id: string) {
        setScore((oldValue) => ++oldValue)
        setObstacle((oldValue) => oldValue.filter((item) => item.id !== id));
        try {
            pointSound.seekTo(0);
            pointSound.play();
        } catch (error) { };
    }

    function randomGapY() {
        const min = CAP_HEIGHT + GAP_SIZE / 2;
        const max = height - CAP_HEIGHT - GROUND_HEIGHT - GAP_SIZE / 2;

        return Math.random() * (max - min) + min;
    }

    useEffect(() => {
        if (started) {
            const interval = setInterval(() => spawObstacle(), DURATION / 3.5);

            return () => clearInterval(interval);
        }
    }, [started]);



    return (
        <ImageBackground
            source={require("@/assets/images/flappy-bird-background.png")}
            resizeMode="stretch"
            style={styles.background}
        >

            <BackgroundSound source={require("@/assets/audios/hammer.mp3")} />

            <Pressable onPress={handleJump} style={styles.background}>
                <SafeAreaView style={styles.screen}>
                    {started ? (
                        <Bird />
                    ) : (
                        <Image source={require("@/assets/images/Starwalker_Bird1.gif")} 
                        style={styles.bird}
                        />
                    )}

                    {obstacles.map((obstacle) => (<Pipe key={obstacle.id} gapY={obstacle.gapY} onEnd={() => removeObstacle(obstacle.id)} />))}

                    <View style={styles.score}>
                        <Text style={styles.scoreText}>{score}</Text>
                        <Image
                            source={require("@/assets/images/coin.gif")}
                            style={styles.scoreImage}
                        />
                    </View>

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
        overflow: "hidden",
    },
    score: {
        position: "absolute",
        top: 20,
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    scoreImage: {
        height: 20,
        width: 20,
    },
    scoreText: {
        fontSize: 20,
        fontFamily: "ShareTech",
        textShadowColor: "black",
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 1,
        color: "white"
    },
    bird: {
        width: BIRD.height * BIRD.aspectRatio,
        height: BIRD.height,
        position: "absolute",
        left: BIRD.x,
        top: height / 2,
    },
});