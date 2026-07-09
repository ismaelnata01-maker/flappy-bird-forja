import { useAudioPlayer } from "expo-audio";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

interface Props{
    source: string;
    loop?: boolean;
    delay?: number;
}

export default function BackgroundSound({source, loop = true, delay = 0}: Props){
    const audio = useAudioPlayer(source);

    useFocusEffect(
        useCallback(() => {
            try{
                setTimeout(() => {
                    audio.seekTo(0);
                    audio.loop = loop;
                    audio.play();
                }, delay);
            } catch (error) {}
            return() => {
                try{
                    audio.pause();
                }catch(error) {}
            }
        }, [])
    )

    return <></>
}