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
};
