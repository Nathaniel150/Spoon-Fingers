import React from 'react';
import { View, StyleSheet, Text, Platform, StatusBar, SafeAreaView } from 'react-native';
import { Icon } from '@rneui/base';
import Constants from './Constants';
import { useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/routers';



function BackButton({back}) {
    const navigation = useNavigation();
    const popAction = StackActions.pop(1);

    return (
        <View style={styles.bar}>
            <Icon
                name='chevron-left'
                type='font-awesome'
                color='black'
                onPress={() => {navigation.dispatch(popAction); navigation.navigate(back)}} 
                style={{paddingRight: 20}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        textAlign: 'left',
        width: '100%',
        alignItems: 'flex-start',        
    }, 

})

export default BackButton;