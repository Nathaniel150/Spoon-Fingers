import { StyleSheet, Pressable, Text, View } from "react-native";
import { useState } from "react";
//handleThrowSpoon, handleBreakRock are optional;
export default function Controller({ engine }) {
  const handlePress = (direction) => {
    //if this controller is for spoon throwing;
    // if (handleThrowSpoon) {
    //   handleThrowSpoon();
    // }
    //if this controller is for breaking rocks;
    // if (handleBreakRock) {
    //   handleBreakRock();
    // }
    //if the action does not use spoons or there are still spoons left.

    //dispatch the type of event in the correct direction

    engine.current.dispatch(`move-${direction}`);
    // if (throwSpoon) {
    //   engine.current.dispatch(`throw-spoon-${direction}`);
    // } else {
    // }
  };

  const [swipeStart, setSwipeStart] = useState([0, 0]);

  //records the starting coordinate of a swipe (the onTouchStart for the View containing the controller.)
  const setSwipePosition = (e) => {
    console.log("onTouchStart");
    let startPos = [...swipeStart];
    startPos[0] = e.nativeEvent.pageX;
    startPos[1] = e.nativeEvent.pageY;

    setSwipeStart(startPos);
  };

  //this calculate which direction the player swiped, and will throw a spoon in that direction.
  const calculateSwipe = (e) => {
    console.log("Calc Swipe");
    let endX = e.nativeEvent.pageX;
    let endY = e.nativeEvent.pageY;

    let changeX = endX - swipeStart[0];
    let changeY = endY - swipeStart[1];

    // //if the swipe was not long enough(most likely the player pressed one of the buttons),
    // // return without throwing a spoon.
    // if (Math.abs(changeX) < 100 && Math.abs(changeY) < 100) {
    //   return;
    // }

    //if the x coordinate changed more than the y coordinate, register only a left or right swipe.
    if (Math.abs(changeX) > Math.abs(changeY)) {
      if (changeX < 0) {
        engine.current.dispatch("throw-spoon-left");
      } else {
        engine.current.dispatch("throw-spoon-right");
        console.log("Swipe right");
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
            <Text style={styles.text}>up</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable
            onPressIn={() => handlePress("left")}
            style={[styles.button, styles.leftArrow]}
          >
            <Text style={styles.text}>left</Text>
          </Pressable>
          <Pressable
            onPressIn={() => handlePress("right")}
            style={[styles.button, styles.rightArrow]}
          >
            <Text style={styles.text}>right</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable
            onPressIn={() => handlePress("down")}
            style={[styles.button, styles.downArrow]}
          >
            <Text style={styles.text}>down</Text>
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
    backgroundColor: "lightblue",
    // borderRadius: 15,
    width: "40%",
  },
  controlContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
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
    backgroundColor: "red",
    height: "65%",
    width: "40%",
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
