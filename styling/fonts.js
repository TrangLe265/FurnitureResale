import React from 'react';
import {Text, StyleSheet} from 'react-native'; 
import { colors } from './colors';

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

export const hero = ({style, children}) => {
    return <Text style={[styles.hero, style]}>{children}</Text>
}
export const heroSmall = ({style, children}) => {
    return <Text style={[styles.heroSmall, style]}>{children}</Text>
}


const styles = StyleSheet.create({
    reg: {
        color: colors.brown,
        fontFamily:'Inter',
        fontSize: 15, 
        fontWeight: '400', 
        lineHeight: 20,
    },
    small: {
        fontFamily:'Inter', 
        fontSize: 13, 
        fontWeight: '400', 
        lineHeight: 18,

    }, 
    h1: {
        fontFamily:'Inter', 
        fontSize: 18, 
        fontWeight: '500', 
        lineHeight: 24, 
        color: colors.brown,
        marginTop: 2,
        //textAlign:'center', 
    },
    h2: {
        fontFamily:'Inter', 
        fontSize: 13, 
        fontWeight: '600', 
        lineHeight: 20, 
        color: colors.brown,
        textAlign:'left', 
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    }, 
    hero: {
        fontSize: 40,
        fontWeight:'200',
        color: colors.white, 
        textAlign: 'center', 
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 4,
        shadowRadius: 6
    }, 
    heroSmall: {
        fontFamily:'Inter', 
        fontSize: 16, 
        fontWeight: '400', 
        lineHeight: 20, 
        color: colors.purple,
        textAlign:'center', 
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    }
})


