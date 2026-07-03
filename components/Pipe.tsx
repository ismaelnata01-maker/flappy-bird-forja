import { DURATION } from "@/constants/animation";
import { CAP_HEIGHT, GAP_SIZE, PIPE_WIDTH } from "@/constants/pipe";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Image } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from "react-native-reanimated";

interface Props {
    gapY: number;
    onEnd: () => void;
}

export default function Pipe({ gapY, onEnd }: Props) {
    const { height, width } = Dimensions.get("window");
    const topHeight = gapY - GAP_SIZE / 2;
    const bottomY = gapY + GAP_SIZE / 2;
    const bottomHeight = height - bottomY;

    const translateX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: -translateX.value}],
    }));

    useEffect(() => {
        translateX.value = withTiming(
            width,
            {
                duration: DURATION,
                easing: Easing.linear,
            },
            () => runOnJS(onEnd)(),
        )
    }, [translateX]);

    return (
        <>
      <Animated.View
        style={[
          styles.pipe,
          { left: width, top: 0, height: topHeight },
          animatedStyle,
        ]}
      >
        <Image
          source={require("@/assets/images/pipe.png")}
          style={[styles.image, { transform: [{ rotate: "180deg" }] }]}
          resizeMode="stretch"
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.cap,
          { left: width - 5, top: topHeight - CAP_HEIGHT },
          animatedStyle,
        ]}
      >
        <Image
          source={require("@/assets/images/cap.png")}
          style={[styles.image, { transform: [{ rotate: "180deg" }] }]}
          resizeMode="stretch"
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.pipe,
          { left: width, top: bottomY, height: bottomHeight },
          animatedStyle,
        ]}
      >
        <Image
          source={require("@/assets/images/pipe.png")}
          style={styles.image}
          resizeMode="stretch"
        />
      </Animated.View>

      <Animated.View
        style={[styles.cap, { left: width - 5, top: bottomY }, animatedStyle]}
      >
        <Image
          source={require("@/assets/images/cap.png")}
          style={styles.image}
          resizeMode="stretch"
        />
      </Animated.View>
    </>
    );
}

const styles = StyleSheet.create({
    pipe: {
        position: "absolute",
        width: PIPE_WIDTH,
    },
    cap: {
        position: "absolute",
        width: PIPE_WIDTH + 10,
        height: CAP_HEIGHT,
    },
    image: {
        width: "100%",
        height: "100%"
    },
});