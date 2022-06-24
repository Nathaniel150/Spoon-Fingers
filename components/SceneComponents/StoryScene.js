import React from 'react';
import { useState } from 'react';
import { ImageBackground, Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import DialogueScene from './DialogueScene';
import NarrationScene from './NarrationScene';

function StoryScene({updateState, story}) {
     // index of the scene information to be displayed.
    const [sceneIndex, setSceneIndex] = useState(0);

    const nextScene = () => {
        console.log(sceneIndex)
        if(sceneIndex < story.length - 1) {
            setSceneIndex(sceneIndex + 1);
            
        } 
         
        else {
             //finish him
        }
    }

    return (
       
        <View
            onTouchStart={nextScene}
            style={styles.container}
        >
            {/* This is a little sketchy, but it works. IDK what touchableHighlight is */}
             <TouchableHighlight
             style={styles.container}>
                <ImageBackground source={story[sceneIndex].bkgdImage} resizeMode="cover" style={styles.background}>
                
                    {story[sceneIndex].type === "dialogue" ? 
                    <DialogueScene scene={story[sceneIndex]} />
                    : <NarrationScene scene={story[sceneIndex]} /> }
                    
                </ImageBackground>
            </TouchableHighlight>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    background: {
        flex: 1,
        justifyContent: "flex-end", 
    },
})
export default StoryScene;