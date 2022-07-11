import React from 'react';
import Wordle from './Wordle';
import { StyleSheet, View, Button, Text  } from 'react-native';
import { Dialog, DialogHeader, DialogContent, DialogActions, Provider} from "@react-native-material/core";
import { useState } from 'react';
import { colors } from "./wordleConstants";

//Game 1(3minutes): Pop up(introducing the game and how to play), gameplay, pop-up if won or lost and trasinition to next game,
//Game 2(2minutes): pop up, gameplay, pop-up if won or lost and transition to last game
//Game 3 (1minute):pop up (last one, the guards are approaching), gameplay, pop up,
//Test comment
function Lockle(props) {
    const [visible, setVisible] = useState(true);

    const wordleContent = [
        {
            startText: "How to Play",
            word: "spoon",
            endText: ""
        },

    ]

    return (
        //
        
        <View style={styles.container}>
            <Wordle setVisible={setVisible}/>
            <Provider >
            <Dialog visible={visible} onDismiss={() => setVisible(false)} >
                <DialogHeader title="Dialog Header" />
                <DialogContent style={ styles.dialog}>
                    <Text>Content</Text>                
                </DialogContent>
                <DialogActions>
                <Button
                    title="Ok"
                    compact
                    variant="text"
                    onPress={() => setVisible(false)}
                />
                </DialogActions>
            </Dialog>
            </Provider>
           
        </View>
        
    );
}
 const styles = StyleSheet.create({
     container: {
         flex: 1,

     },
     dialog: {
         backgroundColor: colors.green,
     }
 });
export default Lockle;