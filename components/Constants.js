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

  START_SCREEN: 1,
  LEVEL_SELECT: 2,
  STORY_P1: 3,
  WORDLE: 4,
  STORY_P2: 5,
  BATTLESHIP: 6,
  STORY_P3: 7,
  DIG_DUG: 8,
  STORY_P4: 9,
};
