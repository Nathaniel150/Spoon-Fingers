import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";


import StartingScreen from "./StartingScreen";
import LevelSelect from "./LevelSelect";
import LevelSelect2 from "./LevelSelect2";
import StoryScene from "./SceneComponents/StoryScene";
import Lockle from "./GameComponents/Wordle/Lockle";
import BattleShip from "./GameComponents/Battleship/Battleship";
import Digdug from "./GameComponents/Digdug/Digdug";
import { storyP1, storyP2, storyP3, storyP4 } from "../assets/StoryData/scenes";
import Constants from "./Constants.js";


const Main2 = () => {
  //use to track what part ofe game we are currently in;


  const [stateTracker, setStateTracker] = useState(Constants.START_SCREEN);

  const updateState = (part) => {setStateTracker(part); };


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


  if(stateTracker == Constants.START_SCREEN) {
    return <StartingScreen updateState={updateState}/>
  } 
  else if (stateTracker == Constants.LEVEL_SELECT)  {
    return <LevelSelect2 updateState={updateState}></LevelSelect2> 
  } 
  else if (stateTracker == Constants.STORY_P1) {
    return <StoryScene updateState={updateState} story={storyP1} nextLevel={Constants.LOCKLE}/>; //prop: the constant of the next component to go to 
  } 
  else if (stateTracker == Constants.LOCKLE) {
    return <Lockle updateState={updateState} />;
  } 
  else if (stateTracker == Constants.STORY_P2) {
    return <StoryScene updateState={updateState} story={storyP2} nextLevel={Constants.BATTLESHIP}/>;
  } 
  else if (stateTracker == Constants.BATTLESHIP) {
    return <BattleShip updateState={updateState} />;
  } 
  else if (stateTracker == Constants.STORY_P3) {
    return <StoryScene updateState={updateState} story={storyP3} nextLevel={Constants.DIG_DUG} />;
  } 
  else if (stateTracker == Constants.DIG_DUG) {
    return <Digdug updateState={updateState} />;
  } 
  else if (stateTracker == Constants.STORY_P4) {
    return <StoryScene updateState={updateState} story={storyP4} nextLevel={Constants.START_SCREEN}/>;
  }

  return <Text>Whoops....</Text>;
};

export default Main2;
