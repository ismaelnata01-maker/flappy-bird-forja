import { Skin } from "@/constants/skins";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGame } from "@/hooks/game";

interface Props {
    item: Skin;
    index: number;
}

export default function SkinItem({ item, index }: Props) {

    const { CoinLow, coin, selectSkin, selectedSkin, unlockedSkins } = useGame();

    const unlocked =
        item.price === 0 || unlockedSkins.includes(item.name);

    return (
        <View style={[styles.container, selectedSkin === index && styles.border]}>
            <Image
                source={item.image}
                style={{ height: item.height, width: item.width }}
                resizeMode="center"
            />

            {unlocked ? (
                <TouchableOpacity style={styles.button} onPress={() => selectSkin(index)}>
                    <LinearGradient colors={["#464a4d", "#a1a7aa"]} style={styles.buttonGradient}>
                        <Text style={styles.buttonText}>select</Text>
                    </LinearGradient>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} onPress={() => CoinLow(item)} disabled={item.price > coin}>
                    <LinearGradient colors={["#464a4d", "#a1a7aa"]} style={styles.buttonGradient}>
                        <Image
                            source={require("@/assets/images/coin.gif")}
                            style={styles.scoreImage}
                        />
                        <Text style={styles.buttonText}>{item.price}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center"
    },
    border:{
        borderColor: "#eeff00",
        borderWidth: 5,
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 23,
        fontFamily: "ShareTech",
    },
    buttonGradient: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: "100%",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 9,
    },
    button: {
        borderRadius: 30,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        boxShadow: "0px 4px 2px",
        width: "100%"
    },
    scoreImage: {
        height: 30,
        width: 30,
    }
});