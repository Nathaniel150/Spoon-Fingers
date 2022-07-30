import React from 'react';
import Wordle from './Wordle';
import { StyleSheet, View, Button, Text  } from 'react-native';
import { Dialog, DialogHeader, DialogContent, DialogActions, Provider} from "@react-native-material/core";
import { useState, useEffect } from 'react';

import { colors } from "./wordleConstants";
import Constants from '../../Constants';

import { set } from 'react-native-reanimated';
import uuid from "react-native-uuid"

//Game 1(3minutes): Pop up(introducing the game and how to play), gameplay, pop-up if won or lost and trasinition to next game,
//Game 2(2minutes): pop up, gameplay, pop-up if won or lost and transition to last game
//Game 3 (1minute):pop up (last one, the guards are approaching), gameplay, pop up,
//Test comment
function Lockle({updateState}) {

    const words = ["spoon", "knife", "guard", "loser", "fight", "under", "brick", "pixel", "mouse"]

    const wordleContent = [
        {
            startText: "Level 1",
            word: "spoon",
            endText: "endText 1",
            time: 180,
            key: uuid.v4()
        },
        {
            startText: "Level 2",
            word: "knife",
            endText: "endText 2",
            time: 120,
            key: uuid.v4()
        },
        {
            startText: "Level 3",
            word: "forks",
            endText: "endText 3",
            time: 60,
            key: uuid.v4()
        }

    ]

    const [won, setWon] = useState(false);
    const [visible, setVisible] = useState(false);
    const [startScreenVisible, setStartScreenVisible] = useState(true);
    const [level, setLevel] = useState(0)
    const [timerOn, setTimerOn] = useState(false)

    const checkandUpdateGame = () => {
        if(won) {
            if(level < wordleContent.length - 1) {
                setLevel(level + 1)
            } else {
                updateState(Constants.STORY_P2)
            }

        } else {
            setLevel(0)
        }

       setVisible(false);
       setStartScreenVisible(true);
    
    }

    const startGame = () => {
        setStartScreenVisible(false)
        setTimerOn(true)
    }

    

    return (
        
        
        <View style={styles.container}>
           
            <Wordle 
                setVisible={setVisible} 
                setWon={setWon} 
                targetWord={wordleContent[level].word} 
                timerOn={timerOn} 
                setTimerOn={setTimerOn}
                timeLimit={wordleContent[level].time}
                id={wordleContent[level].key}/>

            <Provider >

            <Dialog visible={visible}  >
                <DialogHeader title={won === true ? "WON" : "LOST"} />
                <DialogContent style={ styles.dialog}>
                    <Text>Content</Text>                
                </DialogContent>
                <DialogActions>
                <Button
                    title="Ok"
                    compact
                    variant="text"
                    onPress={() => checkandUpdateGame()}
                />
                </DialogActions>
            </Dialog>
            </Provider>

            <Provider >
            <Dialog visible={startScreenVisible} onDismiss={() => setVisible(false)} >
                <DialogHeader title={wordleContent[level].startText} />
                <DialogContent style={ styles.dialog}>
                    <Text></Text>                
                </DialogContent>
                <DialogActions>
                <Button
                    title="Ok"
                    compact
                    variant="text"
                    onPress={() => startGame()}
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
     },
     button: {

     }
 });
export default Lockle;