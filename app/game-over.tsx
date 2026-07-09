import BackgroundSound from "@/components/BackgroundSound";
import GradientText from "@/components/GradientText";
import MovingBackground from "@/components/MovingBackground";
import { useGame } from "@/hooks/game";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameOver() {
    const {score} = useGame();

    return (
        <ImageBackground
            source={require("@/assets/images/over.png")}
            resizeMode="stretch"
            style={styles.background}
        >

            <BackgroundSound source={require("@/assets/audios/over.mp3")} delay={1000} />

            <SafeAreaView style={styles.screen}>
                <GradientText
                    colors={["#464a4d", "#a1a7aa"]}
                    style={styles.title}
                    start={[0, 0]}
                    end={[1, 1]}
                > </GradientText>

                <Link href="/" asChild replace>
                    <TouchableOpacity style={styles.button}>
                        <LinearGradient colors={["#464a4d", "#a1a7aa"]} style={styles.buttonGradient}>
                            <Text style={styles.buttonText}> Voltar ao menu </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </Link>

                <Image
                    source={require("@/assets/images/Starwalker_Bird1.gif")}
                    style={styles.bird}
                />

                <View style={styles.score}>
                    <Text style={styles.scoreText}>{score}</Text>
                    <Image
                        source={require("@/assets/images/coin.gif")}
                        style={styles.scoreImage}
                    />
                </View>
            </SafeAreaView>
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
    title: {
        fontSize: 50,
        color: "white",
        marginTop: 30,
        fontFamily: "BlackOpsOne",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: {
            width: 3,
            height: 3,
        },
        textShadowRadius: 1,
        paddingRight: 3,
    },
    button: {
        borderRadius: 30,
        position: "absolute",
        top: "50%",
        transform: [{ translateY: "-50%" }],
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        boxShadow: "0px 4px 2px",
    },
    buttonGradient: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: "100%",
        height: "100%",
        borderRadius: 100,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontFamily: "ShareTech",
    },
    bird: {
        width: 85,
        height: 58,
        position: "absolute",
        top: "40%",
        left: "30%",
        transform: [{ rotate: "-20deg" }],
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
})