import React from "react";
import Wordle from "./Wordle";
import { StyleSheet, View, Button, Text} from "react-native";
import { useState, useEffect } from "react";
import { colors } from "./wordleConstants";
import Constants from "../../Constants";
import { StackActions } from "@react-navigation/routers";
import { wordleHelpSlides, wordleInstructions } from "./wordleInstructions";
import Instructions from "../Instructions";
import Popup from "../Popup";


//Game 1(3minutes): Pop up(introducing the game and how to play), gameplay, pop-up if won or lost and trasinition to next game,
//Game 2(2minutes): pop up, gameplay, pop-up if won or lost and transition to last game
//Game 3 (1minute):pop up (last one, the guards are approaching), gameplay, pop up,
//Test comment
function Lockle({ navigation, route }) {
  const lvlUnlock = route.params.lvlUnlock;
  const popAction = StackActions.pop(1);

  const words = [
    "spoon",
    "knife",
    "guard",
    "loser",
    "fight",
    "under",
    "brick",
    "pixel",
    "mouse",
  ];

  const wordleContent = [
    {
      startText: "Level 1",
      word: "spoon",
      endText: "endText 1",
      time: 180,
      winText: "One down! You're starting to get the hang of this."
    },
    {
      startText: "Level 2",
      word: "knife",
      endText: "endText 2",
      time: 120,
      winText: "Nice! So close to getting out of this cell! One last passcode."
    },
    {
      startText: "Level 3",
      word: "forks",
      endText: "endText 3",
      time: 60,
      winText: "Hurray! You cracked all three locks"
    },
  ];

  const [won, setWon] = useState(false);
  const [visible, setVisible] = useState(false);
  const [level, setLevel] = useState(0);

  const checkandUpdateGame = () => {
    if (won) {
      if (level < wordleContent.length - 1) {
        setLevel(level + 1);
      } else {
        lvlUnlock();
        navigation.dispatch(popAction)
        navigation.navigate(Constants.STORY_P2)
      }
    } else {
      navigation.dispatch(popAction)
      navigation.navigate(Constants.STORY_P1)
    }

    setVisible(false);
  };



  return (
    <View style={styles.container}>
      

      <Wordle
        setVisible={setVisible}
        setWon={setWon}
        targetWord={wordleContent[level].word}
      />

      <Instructions
        title="Wordle"
        textInstructions={wordleInstructions}
        helpSlides={wordleHelpSlides}
      />

      <Popup 
        visible={visible}
        text={won ? wordleContent[level].winText : "You lost, guess you aren't breaking out today."}
        button1={{ title: "Next", onPress: () => checkandUpdateGame() }}

        />

      {/* <Provider>
        <Dialog visible={visible}>
          <DialogHeader title={won === true ? "WON" : "LOST"} />
          <DialogContent style={styles.dialogtittle}>
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
      </Provider> */}

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Lockle;
