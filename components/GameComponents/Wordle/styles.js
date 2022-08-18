import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "white",
      paddingTop: 50,
      paddingBottom:15
  
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
     // borderColor: "grey",
     // borderWidth: 2,
      flex: 1,
      aspectRatio: .8, //makes square
      margin: 4,
      maxWidth:63,
      marginHorizontal: 7,
      justifyContent: "center",
      alignItems: "center"
      
    },
    cellText: {
      fontSize: 30,
      color: "white",
      paddingTop: 20,
      paddingLeft: 5
    }
  });