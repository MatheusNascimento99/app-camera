import { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import { CameraView, CameraType, Camera, ImageType } from 'expo-camera';

import { FontAwesome5 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
            await saveToAlbum(capturedPhoto, 'Expo App');
            /* MediaLibrary.saveToLibraryAsync(capturedPhoto).then(() =>
                setCapturedPhoto(null),
            ); */
        }
    }

    async function saveToAlbum(uri: string, album: string) {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync(album, asset);
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
                        <MaterialIcons
                            name="flip-camera-ios"
                            size={40}
                            color="black"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.takePhoto}
                        onPress={takePicture}
                    >
                        <FontAwesome5 name="camera" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </CameraView>
            {capturedPhoto && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalisOpen}
                >
                    <View style={styles.modalContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{ margin: 10 }}
                                onPress={() => setModalisOpen(false)}
                            >
                                <FontAwesome5
                                    name="times"
                                    size={28}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ margin: 10 }}
                                onPress={salvePicture}
                            >
                                <Text>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            style={styles.photoOnModal}
                            source={{ uri: capturedPhoto }}
                        />
                    </View>
                </Modal>
            )}
        </View>
    );
}
