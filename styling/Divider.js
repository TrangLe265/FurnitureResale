import React, { Children } from 'react'; 
import {View, StyleSheet} from 'react-native'; 
import {colors} from './colors'; 

export const HorizontalSpacing = () => {
    return (
        <View style={styles.spacing}></View>
    )
    
}

export const HorizontalDivider = () => {
    return (
        <View style={styles.hDivider}></View>
    )
    
}

const styles  = StyleSheet.create({
    spacing:{
        height: 10,
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',  
    },
    hDivider: {
        height: 1, 
        backgroundColor: colors.orange, 
        margin: 3, 
        alignItems: 'center'
    },
})