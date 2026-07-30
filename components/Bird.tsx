import { GRAVITY } from "@/constants/animation";
import { BIRD } from "@/constants/bird";
import { GROUND_HEIGHT } from "@/constants/ground";
import { skins } from "@/constants/skins";
import { useGame } from "@/hooks/game";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useFrameCallback, useSharedValue } from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";

export default function Bird(){
    const { height } = Dimensions.get("window");
    const { birdY, velocity, gameOver, selectedSkin } = useGame();
    const selectedBird = skins[selectedSkin];
    const disable = useSharedValue(false);

    const frame = useFrameCallback((frameInfo) => {
        "worklet";

        if(disable.value) return;

        const t = (frameInfo.timeSincePreviousFrame ?? 0) / 1000;

        velocity.value += GRAVITY * t;
        birdY.value += velocity.value * t;
    

        if(birdY.value > height - BIRD.height + BIRD.hitBox.bottom - GROUND_HEIGHT) {
            disable.value = true;
            runOnJS (gameOver)();
        }

        if(birdY.value < 0){
            birdY.value = 0;
            velocity.value = 0;
        }
    });
    useEffect(() => {
        frame.setActive(true);

        return () => frame.setActive(false);
    }), [frame];

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: birdY.value },
            //{rotate: `${(velocity.value / 1000) * 90}deg`}
        ],
        
    }));

    return(
     <Animated.Image
        style={[styles.bird, animatedStyle,{height: selectedBird.height, width: selectedBird.width}]}
        source={selectedBird.image}
    />
    );
}

const styles = StyleSheet.create({
    bird: {
        position: "absolute",
        top: 0,
        left: BIRD.x,
    },
})