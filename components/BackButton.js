import React from 'react';
import { View, StyleSheet, Text, Platform, StatusBar, SafeAreaView } from 'react-native';
import { Icon } from '@rneui/base';
import Constants from './Constants';
import { useNavigation } from '@react-navigation/core';


function BackButton({back}) {
    const navigation = useNavigation();
    return (
        <View style={styles.bar}>
            <Icon
                name='chevron-left'
                type='font-awesome'
                color='black'
                onPress={() => navigation.navigate(back)} 
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