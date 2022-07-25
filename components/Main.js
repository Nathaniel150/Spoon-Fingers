import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "@react-native-material/core";


import DialogueScene from "./SceneComponents/DialogueScene";
import StoryScene from "./SceneComponents/StoryScene";
import Wordle from "./GameComponents/Wordle/Wordle";
import BattleShip from "./GameComponents/Battleship/Battleship";
import Digdug from "./GameComponents/Digdug/Digdug";
import StartingScreen from "./StartingScreen";

import { storyP1, storyP2, storyP3, storyP4 } from "../assets/StoryData/scenes";
import Lockle from "./GameComponents/Wordle/Lockle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Main = () => {
  //use to track what part ofe game we are currently in;

  const [stateTracker, setStateTracker] = useState(0);

  const updateState = () => {setStateTracker(stateTracker + 1); };


  //SAVE GAME PROGRESS START

  // AsyncStorage.removeItem("@state")
  // const [loaded, setLoaded] = useState(false)


  // useEffect(() => {
  //   if(loaded) {
  //     persistState()
  //   }
  // }, [stateTracker])

  // useEffect(() => {readState()}, [])

  // const persistState = async () => {
  //   const data = {stateTracker
  //   }
  //   const dataString = JSON.stringify(data);
  //   await AsyncStorage.setItem("@state", dataString);
  // }

  // const readState = async () => {
  //   const dataString = await AsyncStorage.getItem("@state");

  //   try {
  //     const data = JSON.parse(dataString);
  //     setStateTracker(data.stateTracker);
  //   } catch {
  //     console.log("Can't parse string")
  //   }
  //   setLoaded(true);
  // }

  // if(!loaded) {
  //   return (<ActivityIndicator/>)
  // }
  
  //SAVE GAME PROGRESS END


  if(stateTracker == 0) {
    return <StartingScreen updateState={updateState} setStateTracker={setStateTracker} />
  } else if (stateTracker == 1) {
    return <StoryScene updateState={updateState} story={storyP1}/>;
  } else if (stateTracker == 2) {
    return <Lockle updateState={updateState} />;
  } else if (stateTracker == 3) {
    return <StoryScene updateState={updateState} story={storyP2} />;
  } else if (stateTracker == 4) {
    return <BattleShip updateState={updateState} />;
  } else if (stateTracker == 5) {
    return <StoryScene updateState={updateState} story={storyP3} />;
  } else if (stateTracker == 6) {
    return <Digdug updateState={updateState} />;
  } else if (stateTracker == 7) {
    return <StoryScene updateState={updateState} story={storyP4} />;
  }

  return <Text>Whoops</Text>;
};

export default Main;
