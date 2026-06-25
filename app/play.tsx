import MovingBackground from "@/components/MovingBackground";
import { Image, ImageBackground, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

export default function Play(){
    const jumpSound = useAudioPlayer(require("@/assets/audios/wing.mp3"));

    function handleJump(){
        jumpSound.seekTo(0);
        jumpSound.play();
    }

    //useEffect(() => {
    //    jumpSound.seekTo(0);
    //    jumpSound.loop = true;
    //    jumpSound.play();
    //    return() => {
    //        jumpSound.pause();
    //    }
    //});

    return (
        <ImageBackground
            source={require("@/assets/images/flappy-bird-background.png")}
            resizeMode="stretch"
            style={styles.background}
        >
            <Pressable onPress={handleJump} style={styles.background}>
                <SafeAreaView style={styles.screen}>

                    <Image
                        source={require("@/assets/images/bird2.gif")}
                        style={styles.bird}
                    />
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
        width: 70,
        height: 48,
        position: "absolute",
        top: "50%",
        left: 100,
    },
})