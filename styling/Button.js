import React, { useState } from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native'; 
import { colors } from './colors';



export const Button = ({styles,children, onPress}) => {
    const [isPressed, setIsPressed] = useState('false');

    return (
        <TouchableOpacity
            style = {[styles.Button,
                    {backgroundColor: isPressed ? colors.activeBlue : colors.ctaBlue }]} 
            onPressIn= {() => setIsPressed(true)} //button changed colors when Pressed
            onPressOut={() => setIsPressed(false)} //reset back once it is no longer pressed on 
            onPress={onPress}  //handle any other later defined functions
        >
            <Text style={styles.text}>
                {children}
            </Text>
            
        </TouchableOpacity>

    ); 
}

const styles = StyleSheet.create({
    Button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: colors.ctaBlue, 
    }, 
    text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }, 

})