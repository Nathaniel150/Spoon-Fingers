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

const Stack = createNativeStackNavigator();

const Main2 = () => {

  //AsyncStorage.removeItem("@lvlsUnlocked")

  //if lvls unlocked is null, set it to inital state (just the first unlocked)
  const initalState = async () => {
    if(await AsyncStorage.getItem("@lvlsUnlocked") == null) {
      const lvlsUnlocked = [true, false, false, false, false, false, false]
      const lvlsUnlockedString = JSON.stringify(lvlsUnlocked);
      await AsyncStorage.setItem("@lvlsUnlocked", lvlsUnlockedString)
    }
  }

  initalState();

  const unlockLevel = async (lvl) => {
    let dataString = await AsyncStorage.getItem("@lvlsUnlocked");
    try {
      let data = JSON.parse(dataString);
      data[lvl] = true;

      let dataString2 = JSON.stringify(data);
      await AsyncStorage.setItem("@lvlsUnlocked", dataString2)
    } catch {
        console.log("can't parse string")
    }

  }
  
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
      params: {story:storyP1, nextLevel:Constants.LOCKLE, lvlUnlock: () => unlockLevel(1)},
      back: Constants.LEVEL_SELECT,
    },
    {
      name: Constants.LOCKLE,
      component: Lockle,
      params: {lvlUnlock: () => unlockLevel(2)},
      back: Constants.LEVEL_SELECT,
    },
    {
      name: Constants.STORY_P2,
      component: StoryScene,
      params: {story:storyP2, nextLevel:Constants.BATTLESHIP, lvlUnlock: () => unlockLevel(3)},
      back: Constants.LEVEL_SELECT,
    },
    {
      name: Constants.BATTLESHIP,
      component: BattleShip,
      params: {lvlUnlock: () => unlockLevel(4)},
      back: Constants.LEVEL_SELECT,
    },
    {
      name: Constants.STORY_P3,
      component: StoryScene,
      params: {story:storyP3, nextLevel:Constants.DIG_DUG, lvlUnlock: () => unlockLevel(5)},
      back: Constants.LEVEL_SELECT,
    },
    {
      name: Constants.DIG_DUG,
      component: Digdug,
      params: {lvlUnlock: () => unlockLevel(6)},
      back: Constants.LEVEL_SELECT,
    },
    {
      name: Constants.STORY_P4,
      component: StoryScene,
      params: {story:storyP4, nextLevel:Constants.START_SCREEN, lvlUnlock: () => unlockLevel(6)},
      back: Constants.LEVEL_SELECT,
    },
  ];

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
                headerTitle: level.back
                  ? (props) => <BackButton {...props} back={level.back} />
                 
                  : "",
                
                headerBackVisible: false,
              }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main2;
