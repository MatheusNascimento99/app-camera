import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column-reverse',
        backgroundColor: 'transparent',
        margin: 64,
        borderColor: 'green',
        borderWidth: 2,
        alignItems:"center"
    },
    button: {
        
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth: 2,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    takePhoto: {
        
    },
    takePhotoText: {
        fontSize: 20,
        marginBottom: 15,
        color: '#fff',
    },
    takePermission: {
        fontSize: 20,
        marginBottom: 15,
        color: '#fff',
        borderColor: 'orange',
        borderWidth: 2,
    },
});

export default styles;
