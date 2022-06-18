import { View, Text } from "react-native";
import { useState } from "react";
import DialogueScene from "./SceneComponents/DialogScene";
import Wordle from "./GameComponents/Wordle/Wordle";
import BattleShip from "./GameComponents/Battleship/Battleship";
import Digdug from "./GameComponents/Digdug/Digdug";

const Main = () => {
  //use to track what part of the game we are currently in;
  const [stateTracker, setStateTracker] = useState(1);

  const updateState = () => {
    setStateTracker(stateTracker + 1);
  };

  if (stateTracker == 1) {
    return <DialogueScene updateState={updateState} />;
  } else if (stateTracker == 2) {
    return <Wordle updateState={updateState} />;
  } else if (stateTracker == 3) {
    return <BattleShip updateState={updateState} />;
  } else if (stateTracker == 4) {
    return <Digdug updateState={updateState} />;
  }

  return <Text>Main</Text>;
};

export default Main;


//this is a test
