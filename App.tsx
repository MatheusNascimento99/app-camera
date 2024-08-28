import { useEffect, useState } from "react";
import CameraViewComponet from "./src/components/CameraView/CameraView";
import * as MediaLibrary from 'expo-media-library';
import { View, Text } from "react-native";


export default function App() {
    //TODO PERMISSION CAMERA WORKS
    const [hasMediaPermission, setHasMediaPermission] = useState <boolean> (false);
    
    useEffect(() =>{
        (async () =>{
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setHasMediaPermission(status ===  "granted");
            console.log("Mídia / Pastas Permissão",status);
        })();
    }, [])

    if(hasMediaPermission === false || null){
        <View>
            <Text>  VOCÊ NÃO POSSUI PERMISSÃO DE MÍDIA</Text>
        </View>
    }

    return <CameraViewComponet />;
}
