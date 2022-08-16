import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from "@react-native-material/core";
import { StackActions } from '@react-navigation/routers';

import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet,Image, Pressable } from 'react-native';
import { fontStyles } from '../App';
import Constants from './Constants';


function LevelSelect2({navigation}) {
    const [loaded, setLoaded] = useState(false)
    const [lvlsUnlocked, setLvlsUnlocked] = useState(null)


    useEffect(() => {readState()}, [lvlsUnlocked])

    const readState = async () => {
        const dataString = await AsyncStorage.getItem("@lvlsUnlocked");

        try {
            const data = JSON.parse(dataString);
           // console.log("data", data)
            setLvlsUnlocked(data) ;
        } catch {
            console.log("can't parse string")
        }
        setLoaded(true)
    }
    


    const levels = [
        {
            lvlName: "1. The Cell",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {navigation.navigate(Constants.STORY_P1)},
        },
        {
            lvlName: "2. Locked In",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {navigation.navigate(Constants.LOCKLE)},
        },
        {
            lvlName: "3. Cafeteria",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {navigation.navigate(Constants.STORY_P2)},
        },
        {
            lvlName: "4. Spoon vs Fork",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {navigation.navigate(Constants.BATTLESHIP)},
        },
        {
            lvlName: "5. Run",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {navigation.navigate(Constants.STORY_P3)},
        },
        {
            lvlName: "6. Dig",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {navigation.navigate(Constants.DIG_DUG)},
        },
        {
            lvlName: "7. Freedom",
            img: require("../assets/BackgroundImages/prison.png"),
            onPress: () => {navigation.navigate(Constants.STORY_P4)},
        },
    
    ]

    if(!loaded){
        return (<ActivityIndicator/>);
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.title, styles.titleBottomBorder, fontStyles.pixelBoldFont]}>Levels</Text>
            {levels.map((level, i) => (
                <View style={styles.row} key={i}>
                    {i % 2 === 0 ? 
                        <View style={styles.row}>
                            <Pressable onPress={level.onPress} disabled={!lvlsUnlocked[i]}>
                                <Image
                                    source={level.img}
                                    style={lvlsUnlocked[i] ? styles.photo: [styles.photo, styles.blackTint ]}
                                />
                            </Pressable>
                            <Text style={[styles.lvlName, fontStyles.pixelFont]}>{lvlsUnlocked[i]? level.lvlName:"?"}</Text>

                        </View>
                    :   <View style={[styles.row, styles.right]}>
                            <Text style={[styles.lvlName, fontStyles.pixelFont]}>{lvlsUnlocked[i] ? level.lvlName:"?"}</Text>

                            <Pressable onPress={level.onPress} disabled={!lvlsUnlocked[i]}> 

                                <Image
                                    source={level.img}
                                    style={lvlsUnlocked[i] ? styles.photo: [styles.photo, styles.blackTint ]}

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
        borderStyle: 'dashed',
    },
    lvlName: {
        marginHorizontal: 10,
        fontSize: 18,
        textAlign: 'center', 
        color: "white",
        justifyContent: "flex-start",
        
        
    },
    blackTint: {
        opacity: 0.3
    }

})

export default LevelSelect2;