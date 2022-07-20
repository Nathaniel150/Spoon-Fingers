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
  const blockSize = Constants.MAX_WIDTH / Constants.BATTLESHIP_BOARD_DIMENSIONS;

  const selectShipHelper = () => {
    selectShip(i);
  };

  if (ship.orientation === "horizontal") {
    return (
      <View
        onTouchStart={() => selectShip(i)}
        style={[
          {
            position: "absolute",
            left: x,
            top: y,
            backgroundColor: "grey",
            height: blockSize,
            width: blockSize * battleShipSize,
          },
          ship.selected ? styles.zBorder : null,
        ]}
      >
        <Image
          style={{ height: blockSize, width: blockSize }}
          source={require("../../../assets/star.png")}
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
            backgroundColor: "grey",
            height: blockSize * battleShipSize,
            width: blockSize,
          },
          ship.selected ? styles.zBorder : null,
        ]}
      >
        <Image
          style={{ height: blockSize, width: blockSize }}
          source={require("../../../assets/star.png")}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 200,
  },
  zBorder: {
    zIndex: 100,
    borderColor: "red",
    borderWidth: 3,
  },
});

export default Ship;
