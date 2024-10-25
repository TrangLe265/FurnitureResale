import React, { useState } from 'react';
import {Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'; 
import { colors } from './colors';




export const Button = ({children, onPress}) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <TouchableOpacity
            style = {[
                        styles.button,
                        isPressed && styles.pressed
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

export const Input = (props) => {
    return (
        <TextInput 
            style= {styles.input}
            placeholderTextColor={colors.brown}
            textAlign='center'
            {...props} />
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderWidth: 0.5,
        borderColor: colors.brown,
        margin: 5, 
    }, 
    pressed: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    }, 
    text: {
        color: colors.brown,
        fontSize: 15,
        fontWeight: 'semibold',
        fontStyle: 'italic'
    }, 
    input: {
        height: 50, 
        width: 250, 
        paddingHorizontal: 5, 
        paddingVertical: 10, 
        //borderWidth: 0.5,
        //borderColor: colors.purple, 
        backgroundColor: colors.white,
        margin: 3, 
    }

})