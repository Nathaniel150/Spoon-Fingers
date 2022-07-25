import { View, Text, StyleSheet, Image } from "react-native";

import Constants from "../Constants";

function DialogueScene ({scene})  {
  var textBoxWidth = Constants.MAX_WIDTH *.9
  var textBoxHeight = Constants.MAX_HEIGHT *.22
  var photoSqDim= textBoxHeight * .55
  var nameFontSize = 23
  var nameHeightPadding = 5
  var nameContainerHeight = nameHeightPadding * 2 + nameFontSize //the distance the photo is away from top of text box
  

  return (
    <View style={styles.container}>
      <View style={{ //content
        backgroundColor: "#fcfdffc7",
        width: textBoxWidth,
        height: textBoxHeight,
        alignSelf: "center",
        marginBottom: 30,
        flexDirection: "row"
      }}>
          <View style={{ //photo containter
            flex: 1.1,
            width: "100%",
            paddingHorizontal: 10,
            alignItems: "center",
            top: nameContainerHeight
          }}>
              <Image style={{ //photo
                backgroundColor:scene.character.backgroundColor,
                width:photoSqDim,
                height:photoSqDim
              }} 
                source={scene.character.photo} />
          </View>
          <View style={{ //text container
            flex: 2,
            paddingRight: 20,
            paddingTop: nameContainerHeight, 
            

          }}> 
            <Text style={{fontSize:18, fontFamily: 'PixeloidSans',}} >{scene.text}</Text>
          </View>
        <Text style={{ //name tag
          position: 'absolute',
          top: -(nameContainerHeight/2),
          left: -15,
          backgroundColor: "#ffffff",
          fontSize: nameFontSize,
          textAlignVertical: "center",
          paddingHorizontal: 15,
          paddingVertical: nameHeightPadding,
          fontFamily: 'PixeloidSans',


        }}> 
          {scene.character.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },


});

export default DialogueScene;
