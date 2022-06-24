import { View, Text, StyleSheet, Image } from "react-native";

function DialogueScene ({scene})  {
 
  return (
    <View style={styles.container}>
      <View style={styles.content}>
          <View style={styles.photoContainer}>
              <Image style={ [{backgroundColor:scene.character.backgroundColor}, styles.photo]} source={scene.character.photo} />
          </View>
          <View style={styles.text}> 
            <Text style={{fontSize:18}}>{scene.text}</Text>
          </View>
        <Text style={styles.name}>{scene.character.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",

},
content: {
    backgroundColor: "#fcfdffc7",
    width: '90%',
    height: '22%',
    alignSelf: "center",
    marginBottom: 30,
    flexDirection: "row"
},
text: {
    flex: 2,
    paddingRight: 20,
    paddingTop: 20
    //top: "8%",
  
    
},
photoContainer: {
    flex: 1.1,
    width: "100%",
    top: "10%",
    paddingHorizontal: 10
},

photo: {
    width: "90%",
    height: "55%",

},
name: {
    position: 'absolute',
    top: '-8%',
    left: '-3%',
    backgroundColor: "#ffffff",
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
}
});

export default DialogueScene;
