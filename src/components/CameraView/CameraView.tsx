import { useState, useEffect, useRef } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Modal,
    Image,
    Button,
} from 'react-native';
import { CameraView, CameraType, Camera, ImageType } from 'expo-camera';

import styles from './styles';
import * as MediaLibrary from 'expo-media-library';
import { CameraCapturedPicture } from 'expo-camera/build/legacy/Camera.types';

export default function CameraViewComponet() {
    const [facing, setFacing] = useState<CameraType>('back');
    const camRef = useRef<CameraView>(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [modalisOpen, setModalisOpen] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const options = {
        quality: 0.8,
        imageType: 'png',
        onPictureSaved: (picture: CameraCapturedPicture) =>
            console.log('Foto salva'),
    };

    async function requestPermissionAgain() {
        //estudo de caso, botao para pedir permissão novamente caso negado a 1 vez
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted'); //verificação se são iguais retornando true or
        console.log('Camera Permissão', status);
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted'); //verificação se são iguais retornando true or
        })();
    }, [hasPermission]);

    const toggleCamera = () => {
        setFacing((prevState) => (prevState === 'back' ? 'front' : 'back'));
    };

    async function takePicture() {
        if (camRef && camRef.current) {
            const data = await camRef.current.takePictureAsync();
            setModalisOpen(true);
            if (data) {
                setCapturedPhoto(data.uri);
            }
        }
    }

    async function salvePicture() {
        if (capturedPhoto != null) {
            MediaLibrary.saveToLibraryAsync(capturedPhoto).then(() =>
                setCapturedPhoto(null),
            );
        }
    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={camRef}
                zoom={0.5}
                style={styles.camera}
                facing={facing}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCamera}
                    >
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.takePhoto}
                        onPress={takePicture}
                    >
                        <Text style={styles.text}>Take a picture</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.takePermission}
                        onPress={requestPermissionAgain}
                    >
                        <Text style={styles.text} >Pedir permissão</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
            {capturedPhoto && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalisOpen}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 20,
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{ margin: 10 }}
                                onPress={() => setModalisOpen(false)}
                            >
                                <Text>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ margin: 10 }}
                                onPress={salvePicture}
                            >
                                <Text>Salvar</Text>
                            </TouchableOpacity>
                        </View>

                        <Image
                            style={{
                                width: '100%',
                                height: 300,
                                borderRadius: 20,
                            }}
                            source={{ uri: capturedPhoto }}
                        />
                    </View>
                </Modal>
            )}
        </View>
    );
}
