import SkinItem from "@/components/SkinItem";
import { skins } from "@/constants/skins";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Skins() {
    return (
        <ImageBackground
        source={require("@/assets/images/flappy-bird-background.png")}
        resizeMode="stretch"
        style={styles.background}>
    
         <SafeAreaView>
            <FlatList 
                data={skins}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.listContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (<SkinItem item={item} index={index}/>)}
            />

         </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background:{
        width: "100%",
        height: "100%",
    },
    bird:{
        top: "50%",
        left: "5%",
    },
    button: {
        borderRadius: 30,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        boxShadow: "0px 4px 2px",
        top:20,
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
    },
})