import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Constants from "../../Constants";

const Ship = ({
  selectShip,
  changeOrientation,
  battleShipSize,
  ship,
  orientation,
  x,
  y,
  i,
}) => {
  const blockSize = Constants.MAX_WIDTH / Constants.BATTLESHIP_BOARD_WIDTH - 5;

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
          source={require("../../../assets/prisonerEyepatch.png")}
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
          source={require("../../../assets/prisonerEyepatch.png")}
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
