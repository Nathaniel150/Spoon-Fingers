import React, { useState } from 'react';
import { Modal, Text, Button, Pressable, StyleSheet, View, SafeAreaView } from 'react-native';
import { fontStyles } from '../../App';

function Popup({visible, text, button1, button2}) {
    const [popupVisible, setPopupVisible] = useState(visible);
    console.log("In pop up")
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}>
        <SafeAreaView style={styles.centeredView}>

        <View style={styles.modalView}>
            <View style={styles.content}>
                <Text style={[styles.message, fontStyles.pixelFont]}>{text}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    style={styles.closeButton}
                    onPress={button1.onPress}
                >
                    <Text style={[styles.btnText, fontStyles.pixelBoldFont]}>{button1.title}</Text>
                </Pressable>
                {button2 ? 
                <Pressable 
                    style={styles.closeButton}
                    onPress={button2.onPress}
                >
                    <Text style={[styles.btnText, fontStyles.pixelBoldFont]}>{button2.title}</Text>
                </Pressable> :
                null}
                
            </View>
        </View>

            
        </SafeAreaView>
        </Modal>
        
    );
}

const styles = StyleSheet.create({
    modalView: {
        marginHorizontal: 20,
        marginVertical: 85,
        backgroundColor: "white",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 250,
        width: 300
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex:1,
    },
    message: {
        fontSize: 18
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    closeButton: {
        backgroundColor:"grey",
        padding: 10,
        margin: 5,
        flex: 1,
        alignItems:'center',

    },
    btnText: {
        color: "white"
    }
})

export default Popup;