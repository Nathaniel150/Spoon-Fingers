import { StyleSheet, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { Icon } from "@rneui/base";
//handleThrowSpoon, handleBreakRock are optional;
export default function Controller({ engine }) {
  const handlePress = (direction) => {
    engine.current.dispatch(`move-${direction}`);
  };

  const [swipeStart, setSwipeStart] = useState([0, 0]);

  //records the starting coordinate of a swipe (the onTouchStart for the View containing the controller.)
  const setSwipePosition = (e) => {
    let startPos = [...swipeStart];
    startPos[0] = e.nativeEvent.pageX;
    startPos[1] = e.nativeEvent.pageY;

    setSwipeStart(startPos);
  };

  //this calculate which direction the player swiped, and will throw a spoon in that direction.
  const calculateSwipe = (e) => {
    let endX = e.nativeEvent.pageX;
    let endY = e.nativeEvent.pageY;

    let changeX = endX - swipeStart[0];
    let changeY = endY - swipeStart[1];

    //if the x coordinate changed more than the y coordinate, register only a left or right swipe.
    if (Math.abs(changeX) > Math.abs(changeY)) {
      if (changeX < 0) {
        engine.current.dispatch("throw-spoon-left");
      } else {
        engine.current.dispatch("throw-spoon-right");
      }
    }
    //if the y coordinate changed more than the x coordinate, register only an up or down swipe.
    else {
      if (changeY < 0) {
        engine.current.dispatch("throw-spoon-up");
      } else {
        engine.current.dispatch("throw-spoon-down");
      }
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <View
        onTouchStart={(e) => setSwipePosition(e)}
        onTouchEnd={(e) => calculateSwipe(e)}
        style={styles.throwArea}
      ></View>
      <View style={styles.controlContainer}>
        <View style={styles.row}>
          <Pressable
            onPressIn={() => handlePress("up")}
            style={[styles.button, styles.upArrow]}
          >
            <Icon
              name="chevron-up"
              type="font-awesome"
              color="black"
              style={styles.text}
            />
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable
            onPressIn={() => handlePress("left")}
            style={[styles.button, styles.leftArrow]}
          >
            <Icon
              name="chevron-left"
              type="font-awesome"
              color="black"
              style={styles.text}
            />
          </Pressable>
          <Pressable
            onPressIn={() => handlePress("right")}
            style={[styles.button, styles.rightArrow]}
          >
            <Icon
              name="chevron-right"
              type="font-awesome"
              color="black"
              style={styles.text}
            />
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable
            onPressIn={() => handlePress("down")}
            style={[styles.button, styles.downArrow]}
          >
            <Icon
              name="chevron-down"
              type="font-awesome"
              color="black"
              style={styles.text}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: "#ffc534",
    // borderRadius: 15,
    width: "40%",
  },
  controlContainer: {
    alignSelf: "center",
    width: "50%",
    marginRight: 20,
    marginBottom: 40,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    padding: 10,
  },
  controllerText: {
    fontSize: 30,
  },
  throwArea: {
    alignSelf: "center",
    backgroundColor: "#ffc534",
    width: "30%",
    aspectRatio: 1,
    borderRadius: 500, // just a lot to make sure it is a circle;
  },
  leftArrow: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  rightArrow: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  upArrow: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  downArrow: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
});
