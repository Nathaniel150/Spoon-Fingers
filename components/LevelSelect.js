import React from 'react';
import { ScrollView, View, Text, StyleSheet,Image, Pressable } from 'react-native';
import { fontStyles } from '../App';
import Constants from './Constants';

function LevelSelect({updateState}) {
    // const level = [
    //     {
    //         lvlName: "1. The Cell",
    //         img: require("../assets/BackgroundImages/prison.png"),
    //         onPress: updateState(Constants.STORY_P1),
    //         unlocked: true,
    //     },
    //     {
    //         lvlName: "2. Locked In",
    //         img: require("../assets/BackgroundImages/prison.png"),
    //         onPress: updateState(Constants.LOCKLE),
    //         unlocked: false,
    //     },
    //     {
    //         lvlName: "3. Cafeteria",
    //         img: require("../assets/BackgroundImages/prison.png"),
    //         onPress: updateState(Constants.STORY_P2),
    //         unlocked: false,
    //     },
    //     {
    //         lvlName: "4. Spoon vs Fork",
    //         img: require("../assets/BackgroundImages/prison.png"),
    //         onPress: updateState(Constants.BATTLESHIP),
    //         unlocked: false,
    //     },
    //     {
    //         lvlName: "5. Run",
    //         img: require("../assets/BackgroundImages/prison.png"),
    //         onPress: updateState(Constants.STORY_P3),
    //         unlocked: false,
    //     },
    //     {
    //         lvlName: "6. Dig",
    //         img: require("../assets/BackgroundImages/prison.png"),
    //         onPress: updateState(Constants.DIG_DUG),
    //         unlocked: false,
    //     },
    //     {
    //         lvlName: "7. Freedom",
    //         img: require("../assets/BackgroundImages/prison.png"),
    //         onPress: updateState(Constants.STORY_P4),
    //         unlocked: false,
    //     },

    // ]
    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.title, styles.titleBottomBorder, fontStyles.pixelBoldFont]}>Levels</Text>
            <View style={styles.row}>
                <Pressable  onPress={() => {updateState(Constants.STORY_P1)}}>
                    <Image
                        source={require("../assets/BackgroundImages/prison.png")}
                        style={styles.photo}
                    />
                </Pressable>
                <Text style={[styles.lvlName, fontStyles.pixelFont]}>1. The Cell</Text>
            </View>
            <View style={[styles.row, styles.right]}>
                <Text style={[styles.lvlName, fontStyles.pixelFont]}>2. Locked In</Text>
                <Pressable  onPress={() => {updateState(Constants.LOCKLE)}} disabled={true}>
                    <Image
                        source={require("../assets/BackgroundImages/prison.png")}
                        style={styles.photo}
                    />
                </Pressable>
            </View>
            <View style={styles.row}>
                <Image
                    source={require("../assets/BackgroundImages/prison.png")}
                    style={styles.photo}
                />
                <Text style={[styles.lvlName, fontStyles.pixelFont]}>3. Cafeteria</Text>

            </View>
            <View style={[styles.row, styles.right]}>
                <Text style={[styles.lvlName, fontStyles.pixelFont]}>4. Spoon vs Fork</Text>
                <Image
                    source={require("../assets/BackgroundImages/prison.png")}
                    style={styles.photo}
                />

            </View>
            <View style={styles.row}>
                <Image
                    source={require("../assets/BackgroundImages/prison.png")}
                    style={styles.photo}
                />
                <Text style={[styles.lvlName, fontStyles.pixelFont]}>5. Run</Text>

            </View>
            <View style={[styles.row, styles.right]}>
                <Text style={[styles.lvlName, fontStyles.pixelFont]}>6. Dig</Text>

                <Image
                    source={require("../assets/BackgroundImages/prison.png")}
                    style={styles.photo}
                />
            </View>
            <View style={styles.row}>
                <Image
                    source={require("../assets/BackgroundImages/prison.png")}
                    style={styles.photo}
                />
                <Text style={[styles.lvlName, fontStyles.pixelFont]}>7. Freedom?</Text>

            </View>
            <Text style={[styles.title, fontStyles.pixelBoldFont]}>Levels</Text>


            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingHorizontal: 40,
        paddingVertical: 20
    },
    row: {
        width: "100%",
        height: 200,
        alignItems: "center",
        flexDirection: "row" ,
        borderBottomColor: "white",
        borderBottomWidth: 3,
        borderStyle: "dashed",
       
    },
    right: {
        justifyContent: "flex-end"
    },
    photo: {
        height: 125,
        width: 125,
        borderRadius: 63,
    },
    title: {
        width: "100%",
        fontSize: 65,
        color: "white",
        alignSelf: "center",
        paddingVertical: 20,
        textAlign: "center"
        
    },
    titleBottomBorder : {
        borderBottomWidth: 3,
        borderBottomColor: "white",
        borderStyle: "dashed"
    },
    lvlName: {
        marginHorizontal: 10,
        fontSize: 18,
        color: "white",
        justifyContent: "flex-start",
        
    }

})

export default LevelSelect;