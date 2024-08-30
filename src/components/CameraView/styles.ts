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
        backgroundColor: 'transparent',
        margin: 20,
        borderColor: 'green',
        borderWidth: 2,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent:"flex-end",
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
    takePhoto: { borderColor: 'orange', borderWidth: 2 },
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        
    },
    photoOnModal: {
        width: '100%',
        height: 450,
        borderRadius: 20,
    },
    txtSalveModal:{
        fontSize:22,
        fontWeight:"600"
    },
    notPermission:{
        flex: 1,
        backgroundColor: 'white',
        margin: 20,
        marginTop:60
    },
    notPermissionText:{
        color:"red",
        textAlign:"center",
        fontWeight:"bold"
    }
});

export default styles;
