import { Skin } from "@/constants/skins";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    item: Skin;
    index: number;
}

export default function SkinItem({ item, index }: Props) {
    return (
        <View style={styles.container}>
            <Image
                source={item.image}
                style={{ height: item.height, width: item.width }}
                resizeMode="center"
            />

            <TouchableOpacity style={styles.button}>
                <LinearGradient colors={["#464a4d", "#a1a7aa"]} style={styles.buttonGradient}>
                    <Image
                        source={require("@/assets/images/coin.gif")}
                        style={styles.coin}
                    />
                    <Text style={styles.buttonText}>20</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center"
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
    coin: {
        height: 30,
        width: 30,
    }
});