import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "pink",
  
    },
    title: {
      paddingTop: 6,
      fontSize: 32,
      letterSpacing: 7,
  
    },
    text: {
      textAlign: "center",
      marginTop: 200,
    },
    map: {
      alignSelf: "stretch",
      marginVertical: 10,
    },
    row: {
      alignSelf: "stretch",
      flexDirection: "row",
      justifyContent: "center",
    },
    cell: {
      borderColor: "white",
      borderWidth: 2,
      flex: 1,
      aspectRatio: 1, //makes square
      margin: 4,
      maxWidth:70,
      justifyContent: "center",
      alignItems: "center"
      
    },
    cellText: {
      fontSize: 30,
    }
  });