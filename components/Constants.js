// Constants.js
import { Dimensions } from "react-native";
export default {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  AVATAR_RADIUS: 50,
  BLOCK_RADIUS: 50,
  BATTLESHIP_BOARD_DIMENSIONS: 8,
  NUM_BATTLESHIPS: 3,

  BATTLESHIP_SIZES: [4, 3, 2],


  START_SCREEN: 0,
  LEVEL_SELECT: 1,
  STORY_P1: 2,
  LOCKLE: 3,
  STORY_P2: 4,
  BATTLESHIP: 5,
  STORY_P3: 6,
  DIG_DUG: 7,
  STORY_P4: 8,


};
