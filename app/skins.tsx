import SkinItem from "@/components/SkinItem";
import { skins } from "@/constants/skins";
import { FlatList, ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGame } from "@/hooks/game";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import BackgroundSound from "@/components/BackgroundSound";


export default function Skins() {
    const { coin } = useGame();
    return (
        
        <ImageBackground
            source={require("@/assets/images/flappy-bird-background.png")}
            resizeMode="stretch"
            style={styles.background}>
                <BackgroundSound source={require("@/assets/audios/Lantern.mp3")} />

            <SafeAreaView>
                <Link href="/" asChild replace>
                    <TouchableOpacity style={styles.button}>
                        <LinearGradient colors={["#464a4d", "#a1a7aa"]} style={styles.buttonGradient}>
                            <Text style={styles.buttonText}> Back </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </Link>
                <FlatList
                    data={skins}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={styles.listContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (<SkinItem item={item} index={index} />)}
                />

                <View style={styles.coins}>
                    <Text style={styles.coinText}>{coin}</Text>
                    <Image
                        source={require("@/assets/images/coin.gif")}
                        style={styles.coin}
                    />
                </View>

            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
    },
    bird: {
        top: "50%",
        left: "5%",
    },
    button: {
        borderRadius: 30,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        boxShadow: "0px 4px 2px",
    },
    buttonGradient: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: "20%",
        borderRadius: 100,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontFamily: "ShareTech",
    },
    listContainer: {
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 20,
        marginTop: 50,
    },
    coinText: {
        fontSize: 20,
        fontFamily: "ShareTech",
        color: "white",
    },
    coin: {
        height: 20,
        width: 20,
    },
    coins: {
        position: "absolute",
        top: 20,
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    }
})