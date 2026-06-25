import MaskedView from "@react-native-masked-view/masked-view"
import { Text } from "react-native"

interface Props{
    children: string;
}

export default function GradientText(){
    return(
        <MaskedView maskElement={<Text></Text>}></MaskedView>
    )
}