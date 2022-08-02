import { View, Text,} from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import { Icon } from '@rneui/base';
import { useNavigation } from "@react-navigation/core";


import StartingScreen from "./StartingScreen";
import LevelSelect2 from "./LevelSelect2";
import StoryScene from "./SceneComponents/StoryScene";
import Lockle from "./GameComponents/Wordle/Lockle";
import BattleShip from "./GameComponents/Battleship/Battleship";
import Digdug from "./GameComponents/Digdug/Digdug";
import { storyP1, storyP2, storyP3, storyP4 } from "../assets/StoryData/scenes";
import Constants from "./Constants.js";
import BackButton from "./BackButton";
import { unmountComponentAtNode } from "react-dom";




const Stack = createNativeStackNavigator();


const Main2 = () => {
  //use to track what part ofe game we are currently in

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

  
  const levels= [
    {
      name: Constants.START_SCREEN,
      component: StartingScreen,
    },
    {
      name: Constants.LEVEL_SELECT,
      component: LevelSelect2,
      back: Constants.START_SCREEN,
    },
    { 
      name: Constants.STORY_P1,
      component: StoryScene,
      params: {story:storyP1, nextLevel:Constants.LOCKLE},
      back: Constants.LEVEL_SELECT,

    },
    {
      name: Constants.LOCKLE,
      component: Lockle,
      back: Constants.LEVEL_SELECT,
    },
    {
      name: Constants.STORY_P2,
      component: StoryScene,
      params: {story:storyP2, nextLevel:Constants.BATTLESHIP},
      back: Constants.LEVEL_SELECT,
    },
    {
      name: Constants.BATTLESHIP,
      component: BattleShip,
      back: Constants.LEVEL_SELECT,
    },
    {
      name: Constants.STORY_P3,
      component: StoryScene,
      params: {story:storyP3, nextLevel:Constants.DIG_DUG},
      back: Constants.LEVEL_SELECT,
    },
    {
      name: Constants.DIG_DUG,
      component: Digdug,
      back: Constants.LEVEL_SELECT,
    },
    {
      name: Constants.STORY_P4,
      component: StoryScene,
      params: {story:storyP4, nextLevel:Constants.START_SCREEN},
      back: Constants.LEVEL_SELECT,
    }

  ]

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {levels.map((level, i) => {
          return (
          <Stack.Screen 
            key={i}
            name={level.name} 
            component={level.component} 
            initialParams={level.params}
            options={{  
              headerTransparent: true, 
              headerTitle: level.back ? (props) => <BackButton {...props} back={level.back}/>  : "",
              headerBackVisible: false, 
            }}
            />);
        })}
        
        </Stack.Navigator>
    </NavigationContainer>
  );



};


export default Main2;
