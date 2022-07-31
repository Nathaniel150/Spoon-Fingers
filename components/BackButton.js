import React from 'react';
import { View, StyleSheet, Text, Platform, StatusBar, SafeAreaView } from 'react-native';
import { Icon } from '@rneui/base';
import Constants from './Constants';


function BackButton(props) {
    return (
        <View style={styles.bar}>
            <Icon
                name='chevron-left'
                type='font-awesome'
                color='black'
                onPress={() => console.log('hello')} 
            />
        </View>
        
 
    );
}

const styles = StyleSheet.create({
    bar: {
        textAlign: 'left',
        fontSize: 30,
        width: '100%',
        alignItems: 'flex-start'
        
    }, 

})

export default BackButton;