import React from 'react';
import { ScrollView, View, Text, StyleSheet,Image, Pressable } from 'react-native';
import { fontStyles } from '../App';
import Constants from './Constants';

function LevelSelect2({updateState}) {
    const levels = [
        {
            lvlName: "1. The Cell",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {updateState(Constants.STORY_P1)},
            unlocked: true,
        },
        {
            lvlName: "2. Locked In",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {updateState(Constants.LOCKLE)},
            unlocked: false,
        },
        {
            lvlName: "3. Cafeteria",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {updateState(Constants.STORY_P2)},
            unlocked: false,
        },
        {
            lvlName: "4. Spoon vs Fork",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {updateState(Constants.BATTLESHIP)},
            unlocked: false,
        },
        {
            lvlName: "5. Run",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {updateState(Constants.STORY_P3)},
            unlocked: false,
        },
        {
            lvlName: "6. Dig",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {updateState(Constants.DIG_DUG)},
            unlocked: false,
        },
        {
            lvlName: "7. Freedom",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {updateState(Constants.STORY_P4)},
            unlocked: false,
        },

    ]
    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.title, styles.titleBottomBorder, fontStyles.pixelBoldFont]}>Levels</Text>
            {levels.map((level, i) => (
                <View style={styles.row} key={i}>
                    {console.log(level.lvlName)}
                    {i % 2 === 0 ? 
                        <View style={styles.row}>
                            <Pressable onPress={level.onPress}>
                                <Image
                                    source={level.img}
                                    style={styles.photo}
                                />

                            </Pressable>
                            <Text style={[styles.lvlName, fontStyles.pixelFont]}>{level.lvlName}</Text>

                        </View>
                    :   <View style={[styles.row, styles.right]}>
                            <Text style={[styles.lvlName, fontStyles.pixelFont]}>{level.lvlName}</Text>

                            <Pressable onPress={level.onPress}> 

                                <Image
                                    source={level.img}
                                    style={styles.photo}
                                />
                            </Pressable>

                        </View>}
                </View>
            ))}
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

export default LevelSelect2;