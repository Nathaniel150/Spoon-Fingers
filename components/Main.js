import { View, Text } from "react-native";
import { useState } from "react";

import DialogueScene from "./SceneComponents/DialogueScene";
import StoryScene from "./SceneComponents/StoryScene";
import Wordle from "./GameComponents/Wordle/Wordle";
import Battleship from "./GameComponents/Battleship/Battleship";
import Digdug from "./GameComponents/Digdug/Digdug";

import { storyP1 } from "../assets/StoryData/scenes";
import Lockle from "./GameComponents/Wordle/Lockle";

const Main = () => {
  //use to track what part ofe game we are currently in;
  const [stateTracker, setStateTracker] = useState(2);

  const updateState = () => {
    setStateTracker(stateTracker + 1);
  };

  if (stateTracker == 1) {
    return <StoryScene updateState={updateState} story={storyP1} />;
  } else if (stateTracker == 2) {
    return <Lockle updateState={updateState} />;
  } else if (stateTracker == 3) {
    return <Battleship updateState={updateState} />;
  } else if (stateTracker == 4) {
    return <Digdug updateState={updateState} />;
  }

  return <Text>Main</Text>;
};

export default Main;
