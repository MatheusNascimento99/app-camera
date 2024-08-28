import { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Image,
} from 'react-native';
import {
    CameraView,
    CameraType,
    useCameraPermissions,
    PermissionResponse,
} from 'expo-camera';

import styles from './styles';

export default function CameraViewComponet() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const camRef = useRef<CameraView>(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [modalisOpen, setModalisOpen] = useState<boolean>(false);

    useEffect(() => {
        console.log(permission?.status);
        if (permission?.status !== 'granted') {
            requestPermission();
        }
    }, [permission]);

    //TODO PERMISSION WORKS

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
                        <Text style={styles.takePhotoText}>
                            {' '}
                            Take a picture
                        </Text>
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
                        <TouchableOpacity
                            style={{ margin: 10 }}
                            onPress={() => setModalisOpen(false)}
                        >
                            <Text>Close</Text>
                        </TouchableOpacity>
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
