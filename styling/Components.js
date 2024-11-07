import React, { useState } from 'react';
import {Text, StyleSheet, TouchableOpacity, TextInput, View} from 'react-native'; 
import { colors } from './colors';

export const Button = ({children, onPress, style}) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <TouchableOpacity
            style = {[
                        styles.button,
                        isPressed && styles.pressed,
                        style
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

export const SmlButton = ({children, onPress, style}) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <TouchableOpacity
            style = {[
                    styles.smlButton,
                    isPressed && styles.pressed,
                    style
                    ]} 
            onPressIn= {() => setIsPressed(true)} //button changed colors when Pressed
            onPressOut={() => setIsPressed(false)} //reset back once it is no longer pressed on 
            onPress={onPress}  //handle any other later defined functions
        >
            <Text style={styles.smlBtnText}>
                {children}
            </Text>
            
        </TouchableOpacity>

    ); 
}

export const Input = ({style,...props}) => {
    return (
        <TextInput 
            style= {[styles.input, style]}
            placeholderTextColor={colors.purple}
            textAlign='center'
            {...props} />
    )
}
export const ActionLink = ({children,onPress, style}) => {
    const [isPressed, setIsPressed] = useState(false); 

    return (
        <TouchableOpacity
            style= {[
                    isPressed && styles.pressed,
                    style
            ]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onPress}
        >
            <Text style={styles.actionLink}>{children}</Text>
        </TouchableOpacity>
    )
}
export const Row = ({children,style}) => {
    return (
        <View style={[styles.row,style]}>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderWidth: 0.8,
        borderColor: colors.brown,
        margin: 5, 
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    }, 
    smlButton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: colors.brown,
        //borderRadius: 15,
        //borderWidth: 0.5,
        borderColor: colors.white,
        margin: 5, 
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
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
        //fontStyle: 'italic'
    }, 
    smlBtnText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: 'semibold',
        //fontStyle: 'italic'
    },
    input: {
        minHeight: 40, 
        width: 200, 
        paddingHorizontal: 5, 
        paddingVertical: 10, 
        borderWidth: 0.5,
        borderColor: colors.purple, 
        backgroundColor: colors.white,
        margin: 3, 
    },
    actionLink: {
        fontSize: 13, 
        fontWeight: '600',
        textDecorationLine:'underline',
        textDecorationColor: colors.orange, 
        color: colors.orange,
        marginVertical: 10,
        alignSelf:'center', 
        //fontStyle: 'italic'
    },
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        flexWrap: 'wrap', 
        //alignContent:'center',
        alignItems: 'center', 
        margin: 3
    }

})