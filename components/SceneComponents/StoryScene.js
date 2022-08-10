import React from 'react';
import { useState } from 'react';
import { ImageBackground, Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import DialogueScene from './DialogueScene';
import NarrationScene from './NarrationScene';
import { StackActions } from '@react-navigation/routers';


function StoryScene({navigation, route}) {
    const popAction = StackActions.pop(2);

    const story = route.params.story;
    const nextLevel = route.params.nextLevel;
    const lvlUnlock = route.params.lvlUnlock;

     // index of the scene information to be displayed.
    const [sceneIndex, setSceneIndex] = useState(0);

    const nextScene = () => {
        if(sceneIndex < story.length - 1) {
            setSceneIndex(sceneIndex + 1);
        } 
         
        else {
            lvlUnlock();
            navigation.dispatch(popAction)
            navigation.navigate(nextLevel)
            
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
        flex:1,
    },
    background: {
        flex: 1,
        justifyContent: "flex-end", 
        
    
    },
})
export default StoryScene;