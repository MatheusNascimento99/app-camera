import { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import { CameraView, CameraType, Camera, ImageType } from 'expo-camera';

import { FontAwesome5 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from './styles';
import * as MediaLibrary from 'expo-media-library';
import { CameraCapturedPicture } from 'expo-camera/build/legacy/Camera.types';

//importanção actionCamera
import { toggleCameraState } from './actionsCamera';
import { takePictureState } from './actionsCamera';

export default function CameraViewComponet() {
    const { facing, setFacing, toggleCamera } = toggleCameraState();
    const {
        camRef,
        modalisOpen,
        setModalisOpen,
        capturedPhoto,
        setCapturedPhoto,
        takePicture,
    } = takePictureState();

    async function salvePicture() {
        if (capturedPhoto != null) {
            await saveToAlbum(capturedPhoto, 'Expo App');
            setModalisOpen(false);
            /* MediaLibrary.saveToLibraryAsync(capturedPhoto).then(() =>         salvar em álbum aleatório
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
                            backgroundColor="#F4F3F8"
                            name="flip-camera-ios"
                            size={50}
                            color="#000"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.takePhoto}
                        onPress={takePicture}
                    >
                        <FontAwesome5
                            backgroundColor="#F4F3F8"
                            name="camera"
                            size={50}
                            color="#000"
                        />
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
                                <Text style={styles.txtSalveModal}>Salvar</Text>
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
