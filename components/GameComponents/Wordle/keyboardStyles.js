import { StyleSheet, Dimensions } from "react-native";
import { keys, colors } from "./wordleConstants";

const screenWidth = Dimensions.get("window").width;
export const keyWidth = (screenWidth - 10) / keys[0].length;
const keyHeight = keyWidth * 1.3;

export default StyleSheet.create({
  keyboard: {
    alignSelf: "stretch",
    marginTop: "auto",
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  key: {
    width: keyWidth - 4,
    height: keyHeight - 4,
    margin: 2,
    borderRadius: 1,
    backgroundColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  enter:{
    width: "80%",
    backgroundColor: colors.darkgrey,
    alignSelf: "center"
  },
  keyText: {
    color: "white",
    fontSize: 18
    
  },
});
