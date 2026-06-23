
import { Link } from "expo-router";
import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const PIPE_WIDTH = 52;
const PIPE_GAP = 160;
const PIPE_SPACING = 220;
const PIPE_SPEED = 1.5;
const GROUND_HEIGHT = 80;
const NUM_PIPES = 4;

function generateGapY() {
    const minY = SCREEN_HEIGHT * 0.55;
    const maxY = SCREEN_HEIGHT - GROUND_HEIGHT - PIPE_GAP - 40;
    return minY + Math.random() * (maxY - minY);
}

function Pipe({ xAnim, gapYRef }: { xAnim: Animated.Value; gapYRef: React.MutableRefObject<number> }) {
    const gapY = gapYRef.current;
    const topPipeHeight = gapY;
    const bottomPipeY = gapY + PIPE_GAP;
    const bottomPipeHeight = SCREEN_HEIGHT - GROUND_HEIGHT - bottomPipeY;

    return (
        <Animated.View style={[styles.pipeContainer, { transform: [{ translateX: xAnim }] }]}>
            {/* Cano de cima */}
            <View style={[styles.pipeBody, { top: 0, height: Math.max(0, topPipeHeight - 24) }]} />
            <View style={[styles.pipeCap, { top: Math.max(0, topPipeHeight - 24) }]} />

            {/* Cano de baixo */}
            <View style={[styles.pipeCap, { top: bottomPipeY }]} />
            <View style={[styles.pipeBody, { top: bottomPipeY + 24, height: Math.max(0, bottomPipeHeight - 24) }]} />
        </Animated.View>
    );
}

export default function Home() {
    const pipes = useRef(
        Array.from({ length: NUM_PIPES }, (_, i) => ({
            xAnim: new Animated.Value(SCREEN_WIDTH + i * PIPE_SPACING),
            gapYRef: { current: generateGapY() },
        }))
    ).current;

    useEffect(() => {
        const pixelsPerMs = PIPE_SPEED / 16;
        let lastTime: number | null = null;
        let rafId: number;

        const tick = (timestamp: number) => {
            if (lastTime === null) lastTime = timestamp;
            const delta = Math.min(timestamp - lastTime, 32); // cap delta para evitar saltos
            lastTime = timestamp;

            pipes.forEach((pipe) => {
                const currentX = (pipe.xAnim as any)._value;
                const newX = currentX - pixelsPerMs * delta;

                if (newX < -(PIPE_WIDTH + 12)) {
                    // Reposiciona após o último cano
                    const maxX = Math.max(...pipes.map((p) => (p.xAnim as any)._value));
                    pipe.xAnim.setValue(maxX + PIPE_SPACING);
                    pipe.gapYRef.current = generateGapY();
                } else {
                    pipe.xAnim.setValue(newX);
                }
            });

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <ImageBackground
            source={require("@/assets/images/flappy-bird-background.png")}
            resizeMode="stretch"
            style={styles.background}
        >
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                {pipes.map((pipe, i) => (
                    <Pipe key={i} xAnim={pipe.xAnim} gapYRef={pipe.gapYRef} />
                ))}
            </View>

            <SafeAreaView style={styles.screen}>
                <Text style={styles.title}>Flappy Bird</Text>

                <Link href="/play" asChild>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>🎮 Jogar 🎮</Text>
                    </TouchableOpacity>
                </Link>
            </SafeAreaView>
        </ImageBackground>
    );
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
        fontWeight: "bold",
        color: "white",
        marginTop: 30,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#a1a7aa",
        borderRadius: 30,
        position: "absolute",
        top: "50%",
        transform: [{ translateY: "-50%" }],
        boxShadow: "0px 4px 2px",
    } as any,
    buttonText: {
        color: "white",
        fontSize: 20,
    },
    pipeContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: PIPE_WIDTH + 12,
        height: SCREEN_HEIGHT,
        opacity: 0.75,
    },
    pipeBody: {
        position: "absolute",
        left: 6,
        width: PIPE_WIDTH,
        backgroundColor: "#5ab552",
        borderColor: "#3a7a33",
        borderWidth: 3,
        borderRadius: 4,
    },
    pipeCap: {
        position: "absolute",
        left: 0,
        width: PIPE_WIDTH + 12,
        height: 24,
        backgroundColor: "#5ab552",
        borderColor: "#3a7a33",
        borderWidth: 3,
        borderRadius: 4,
    },
});