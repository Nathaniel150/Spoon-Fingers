import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



import StartingScreen from "./StartingScreen";
import LevelSelect2 from "./LevelSelect2";
import StoryScene from "./SceneComponents/StoryScene";
import Lockle from "./GameComponents/Wordle/Lockle";
import BattleShip from "./GameComponents/Battleship/Battleship";
import Digdug from "./GameComponents/Digdug/Digdug";
import { storyP1, storyP2, storyP3, storyP4 } from "../assets/StoryData/scenes";
import Constants from "./Constants.js";
import BackButton from "./BackButton";
import Wordle from "./GameComponents/Wordle/Wordle";


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


  const getComponent = (part) => {
    switch(part) {
      case Constants.START_SCREEN: return <StartingScreen updateState={updateState} styles={{top: 0,
        left: 0}}/> 
      case Constants.LEVEL_SELECT: return <LevelSelect2 updateState={updateState}></LevelSelect2>
      case Constants.STORY_P1: return <StoryScene updateState={updateState} story={storyP1} nextLevel={Constants.LOCKLE}/>
      case Constants.LOCKLE: return <Lockle updateState={updateState}/> 
      case Constants.STORY_P2: return <StoryScene updateState={updateState} story={storyP2} nextLevel={Constants.BATTLESHIP}/>
      case Constants.BATTLESHIP: return <BattleShip updateState={updateState}/>
      case Constants.STORY_P3: return <StoryScene updateState={updateState} story={storyP3} nextLevel={Constants.DIG_DUG} />
      case Constants.DIG_DUG: return <Digdug updateState={updateState} />
      case Constants.STORY_P4: return <StoryScene updateState={updateState} story={storyP4} nextLevel={Constants.START_SCREEN}/>
      default: return <Text>Whoops....</Text>
    }
  }
  
  const levels= [
    {
      name: Constants.START_SCREEN,
      component: StartingScreen
    },
    {
      name: Constants.LEVEL_SELECT,
      component: LevelSelect2
    },
    { 
      name: Constants.STORY_P1,
      component: StoryScene,
      params: {story:storyP1, nextLevel:Constants.LOCKLE}
     
    },
    {
      name: Constants.LOCKLE,
      component: Lockle
    },
    {
      name: Constants.STORY_P2,
      component: StoryScene,
      params: {story:storyP2, nextLevel:Constants.BATTLESHIP}
    },
    {
      name: Constants.BATTLESHIP,
      component: BattleShip
    },
    {
      name: Constants.STORY_P3,
      component: StoryScene,
      params: {story:storyP3, nextLevel:Constants.DIG_DUG}
    },
    {
      name: Constants.DIG_DUG,
      component: Digdug
    },
    {
      name: Constants.STORY_P4,
      component: StoryScene,
      params: {story:storyP4, nextLevel:Constants.START_SCREEN}
    }

  ]

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {levels.map((level, i) => {
          console.log("Mao", level.params)
          return (
          <Stack.Screen 
            key={i}
            name={level.name} 
            component={level.component} 
            options={{  headerTransparent: true,
            headerTitleAlign:'left', headerTitle: (props) => <BackButton {...props} /> } }
            initialParams={level.params}
            />);
       
        })}
        
        </Stack.Navigator>
    </NavigationContainer>
  );



};

const styles = StyleSheet.create({
  container: {
   //paddingTop: Platform.OS === 'android' ?  StatusBar.currentHeight: 0,
    flex: 1,
    backgroundColor: "green",
    
  }, 
  container2: {
    flex:1
  },
  bar: {
    
  }

})

export default Main2;
