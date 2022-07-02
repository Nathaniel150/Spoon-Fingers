import { StyleSheet, Pressable, Text, View } from "react-native";

//handleThrowSpoon, handleBreakRock are optional;
export default function Controller({
  engine,
  type,
  handleThrowSpoon,
  handleBreakRock,
}) {
  const handlePress = (direction) => {
    //if this controller is for spoon throwing;
    if (handleThrowSpoon) {
      handleThrowSpoon();
    }
    //if this controller is for breaking rocks;
    if (handleBreakRock) {
      handleBreakRock();
    }
    //if the action does not use spoons or there are still spoons left.

    //dispatch the type of event in the correct direction
    engine.current.dispatch(`${type}-${direction}`);
  };
  return (
    <>
      <View style={styles.controlContainer}>
        {/* First row (just text) */}
        <View style={styles.row}>
          <Text>{type} controller</Text>
        </View>
        {/* First row */}
        <View style={styles.row}>
          <Pressable onPressIn={() => handlePress("up")} style={styles.button}>
            <Text style={styles.text}>up</Text>
          </Pressable>
        </View>
        {/* second row */}
        <View style={styles.row}>
          <Pressable
            onPressIn={() => handlePress("left")}
            style={styles.button}
          >
            <Text style={styles.text}>left</Text>
          </Pressable>
          <Pressable
            onPressIn={() => handlePress("right")}
            style={styles.button}
          >
            <Text style={styles.text}>right</Text>
          </Pressable>
        </View>
        {/* Third Row */}
        <View style={styles.row}>
          <Pressable
            onPressIn={() => handlePress("down")}
            style={styles.button}
          >
            <Text style={styles.text}>down</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: "lightblue",
    borderRadius: 15,
    width: "40%",
  },
  controlContainer: {
    display: "flex",
    justifyContent: "center",
    width: "50%",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
  },
});
