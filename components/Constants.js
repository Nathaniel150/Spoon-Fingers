// Constants.js
import { Dimensions } from "react-native";
export default {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  AVATAR_RADIUS: 50,
  BLOCK_RADIUS: 50,
  BATTLESHIP_BOARD_WIDTH: 8,
  BATTLESHIP_BOARD_HEIGHT: 6,
  NUM_BATTLESHIPS: 3,

  BATTLESHIP_SIZES: [4, 3, 2],

  START_SCREEN: "StartingScreen",
  LEVEL_SELECT: "LevelSelect",
  STORY_P1: "StoryP1",
  LOCKLE: "Lockle",
  STORY_P2: "StoryP2",
  BATTLESHIP: "Battleship",
  STORY_P3: "StoryP3",
  DIG_DUG: "DigDug",
  STORY_P4: "StoryP4",
};
