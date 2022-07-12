import React from 'react';
import Wordle from './Wordle';
import { StyleSheet, View, Button, Text  } from 'react-native';
import { Dialog, DialogHeader, DialogContent, DialogActions, Provider} from "@react-native-material/core";
import { useState } from 'react';
import { colors } from "./wordleConstants";
import { set } from 'react-native-reanimated';

//Game 1(3minutes): Pop up(introducing the game and how to play), gameplay, pop-up if won or lost and trasinition to next game,
//Game 2(2minutes): pop up, gameplay, pop-up if won or lost and transition to last game
//Game 3 (1minute):pop up (last one, the guards are approaching), gameplay, pop up,
//Test comment
function Lockle(props) {
    const [won, setWon] = useState(false);
    const [visible, setVisible] = useState(false);
    const [startScreenVisible, setStartScreenVisible] = useState(true);
    const [level, setLevel] = useState(0)

    const words = ["spoon", "knife", "guard", "loser", "fight", "under", "brick", "pixel", "mouse"]

    const wordleContent = [
        {
            startText: "Level 1",
            word: "spoon",
            endText: "endText 1",
            time: 60
        },
        {
            startText: "Level 2",
            word: "knife",
            endText: "endText 2",
            time: 120
        },
        {
            startText: "Level 3",
            word: "forks",
            endText: "endText 3",
            time: 180
        }

    ]

    const checkandUpdateGame = () => {
        if(won) {
            setLevel(level+1)
        } else {
            setLevel(0)
        }
        setVisible(false);
        setStartScreenVisible(true);
    
    }

    return (
        
        
        <View style={styles.container}>
            <Wordle setVisible={setVisible} setWon={setWon} targetWord={wordleContent[level].word}/>
            <Provider >

            {/* end popup */}
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
                    onPress={() => setStartScreenVisible(false)}
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