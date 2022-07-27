import React from 'react';
import { View, ImageBackground, Text, StyleSheet} from'react-native'
import { fontStyles } from '../App';


function StartingScreen({updateState, setStateTracker}) {
    return (
        <View 
            style={styles.container}
            onTouchStart={() => {setStateTracker(1)}}
        >
            <ImageBackground
                source={require("../assets/BackgroundImages/prison.png")}
                resizeMode="cover"
                style= {styles.background}
            >
                <View style={styles.content}>  
                    <Text style={[styles.title, fontStyles.pixelBoldFont]}>
                        Spoon{"\n"}Fingers
                    </Text>
                    <Text style={[styles.helpText, fontStyles.pixelFont]} >
                        Press anywhere to continue
                    </Text>
                </View>
            </ImageBackground>  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {

        flex: 1,
        justifyContent: "flex-end"
    },
    title: {
        fontSize: 70, 
        textAlign: "center",
        color: "black",
        
    },
    content: {
        flex: .75,
        textAlign: "center",
        alignItems: "center",
        
    },
    helpText: {
        marginTop: 50,
        padding: 8,
        backgroundColor: "rgba(0, 0, 0, 0.6)",     
        color: "white"
    }


})

export default StartingScreen;