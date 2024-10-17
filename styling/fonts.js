import React from 'react';
import {Text, StyleSheet} from 'react-native'; 

//each font except 2 parameters, style and children
//style: so that style can be overriden if needed
//children: so that all text lies inside the <> can have the same styling
export const bodyText = ({style, children}) => {
    return <Text style={[styles.reg,style]}>{children}</Text>
}

export const smlBodText = ({style, children}) => {
    return <Text style={[styles.small, style]}>{children}</Text>
}

export const h1 = ({style, children}) => {
    return <Text style={[styles.h1, style]}>{children}</Text>
}

export const h2 = ({style, children}) => {
    return <Text style={[styles.h2, style]}>{children}</Text>
}


const styles = StyleSheet.create({
    reg: {
        fontFamily:'System', 
        fontSize: 15, 
        fontWeight: '400', 
        lineHeight: 20,
    },
    small: {
        fontFamily:'System', 
        fontSize: 13, 
        fontWeight: '300', 
        lineHeight: 16,
    }, 
    h1: {
        fontFamily:'System', 
        fontSize: 18, 
        fontWeight: '500', 
        lineHeight: 25, 
    },
    h2: {
        fontFamily:'System', 
        fontSize: 16, 
        fontWeight: '500', 
        lineHeight: 20, 
    }
})


