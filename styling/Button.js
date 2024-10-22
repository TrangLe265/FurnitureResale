import React, { useState } from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native'; 
import { colors } from './colors';



export const Button = ({children, onPress}) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <TouchableOpacity
            style = {[
                        styles.button,
                        {
                            backgroundColor: isPressed ? colors.activeBlue : colors.nonActiveBlue
                        }
                    ]} 
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
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: colors.nonActiveBlue, 
        margin: 5, 
    }, 
    text: {
        color: colors.white,
        fontSize: 15,
        fontWeight: 'semibold',
    }, 

})