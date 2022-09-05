import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from "react-native";
import Constants from "../../Constants";

const Ship = ({ selectShip, battleShipSize, ship, x, y, i }) => {
  const blockSize = Platform.isPad
    ? Constants.MAX_WIDTH / Constants.BATTLESHIP_BOARD_WIDTH - 20
    : Constants.MAX_WIDTH / Constants.BATTLESHIP_BOARD_WIDTH - 5;

  if (ship.orientation === "horizontal") {
    return (
      <View
        onTouchStart={() => selectShip(i)}
        style={[
          {
            position: "absolute",
            left: x,
            top: y,
            backgroundColor: "white",
            height: blockSize,
            width: blockSize * battleShipSize,
          },
          ship.selected ? styles.zBorder : null,
        ]}
      >
        <Image
          style={{ height: blockSize, width: blockSize, resizeMode: "contain" }}
          source={require("../../../assets/Battleship/prisoner1.png")}
        />
      </View>
    );
  } else {
    return (
      <View
        onTouchStart={() => selectShip(i)}
        style={[
          {
            position: "absolute",
            left: x,
            top: y,
            backgroundColor: "white",
            height: blockSize * battleShipSize,
            width: blockSize,
          },
          ship.selected ? styles.zBorder : null,
        ]}
      >
        <Image
          style={{ height: blockSize, width: blockSize, resizeMode: "contain" }}
          source={require("../../../assets/Battleship/prisoner1.png")}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  shipHorizontal: {},
  shipVertical: {},
  zBorder: {
    zIndex: 100,
    borderColor: "red",
    borderWidth: 2,
  },
});

export default Ship;
