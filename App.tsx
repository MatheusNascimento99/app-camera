import { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { Camera } from 'expo-camera';
import CameraViewComponet from "./src/components/CameraView/CameraView";
import * as MediaLibrary from 'expo-media-library';
import styles from "./src/components/CameraView/styles";



export default function App() {
    //TODO PERMISSION CAMERA WORKS
    const [hasMediaPermission, setHasMediaPermission] = useState <boolean> (false);
    const [hasCameraPermission, sethasCameraPermission] = useState<boolean>(false);

    
    useEffect(() =>{
        (async () =>{
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setHasMediaPermission(status ===  "granted");
            console.log("Mídia / Pastas Permissão",status);
        })();

        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            sethasCameraPermission(status === 'granted'); //verificação se são iguais retornando true or
        })();

    }, [])

    return (
        hasMediaPermission && hasCameraPermission ? (
          <CameraViewComponet />
        ) : (
          <View style={styles.notPermission}>
            <Text style={styles.notPermissionText}>
              VOCÊ AINDA NÃO POSSUI PERMISSÕES DE MÍDIA OU CÂMERA
            </Text>
          </View>
        )
      );
}
