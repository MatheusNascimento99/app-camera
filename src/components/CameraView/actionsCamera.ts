import { CameraType, CameraView } from 'expo-camera';
import { ImageType } from 'expo-camera/build/legacy/Camera.types';
import { useRef, useState } from 'react';

//ciração de função para retornar os estados da camera
export const toggleCameraState = () => {
    const [facing, setFacing] = useState<CameraType>('back');

    const toggleCamera = () => {
        setFacing((prevState) => (prevState === 'back' ? 'front' : 'back'));
    };

    return { facing, setFacing, toggleCamera };
};

export const takePictureState = () => {
    const camRef = useRef<CameraView>(null);
    const [modalisOpen, setModalisOpen] = useState<boolean>(false);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

    async function takePicture() {
        const options = {
            quality: 0.8,
            imageType: ImageType.png,
        };

        if (camRef && camRef.current) {
            const data = await camRef.current.takePictureAsync(options);
            setModalisOpen(true);
            if (data) {
                setCapturedPhoto(data.uri);
            }
        }
    }
    return {
        camRef,
        modalisOpen,
        setModalisOpen,
        capturedPhoto,
        setCapturedPhoto,
        takePicture,
    };
};
