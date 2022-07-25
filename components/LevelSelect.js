import React from 'react';
import { ScrollView, View, Text, StyleSheet,Image } from 'react-native';

function LevelSelect(props) {
    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.title, styles.titleBottomBorder]}>Levels</Text>
            <View style={styles.row}>
                <Image
                    source={require("../assets/BackgroundImages/prison.png")}
                    style={styles.photo}
                />
                <Text style={styles.lvlName}>1. The Cell</Text>
            </View>
            <View style={[styles.row, styles.right]}>
                <Text style={styles.lvlName}>2. Locked In</Text>
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
                <Text style={styles.lvlName}>3. Cafeteria</Text>

            </View>
            <View style={[styles.row, styles.right]}>
                <Text style={styles.lvlName}>4. Spoon vs Fork</Text>
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
                <Text style={styles.lvlName}>5. Run</Text>

            </View>
            <View style={[styles.row, styles.right]}>
                <Text style={styles.lvlName}>6. Dig</Text>

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
                <Text style={styles.lvlName}>7. Freedom?</Text>

            </View>
            <Text style={styles.title}>Levels</Text>


            
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
        justifyContent: "right"
    },
    photo: {
        height: 125,
        width: 125,
        borderRadius: '50%',
    },
    title: {
        width: "100%",
        fontSize: 65,
        fontFamily: 'PixeloidSans-Bold',
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
        fontFamily: 'PixeloidSans',
        
    }

})

export default LevelSelect;