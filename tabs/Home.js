import { useState, useEffect } from 'react';

import { ImageBackground } from 'react-native';

import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'; 
import * as T from '../styling/fonts'; 
import Card from '../styling/Card';
import { Row, SmlButton, ActionLink } from '../styling/Components';

import Ionicons from '@expo/vector-icons/Ionicons'; 
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { HorizontalDivider, HorizontalSpacing } from '../styling/Divider';
import { colors } from '../styling/colors';
import { fetchData } from '../hooks/FetchData';
import {ItemCard} from '../hooks/ItemCard';

export default function HomeScreen(){
   
    const [items, setItems] = useState([]); 

    useEffect(() => {
        fetchData(setItems);
    }, []); 

    console.log("Items length: ",items.length);

    /*  TODO change from email to phone number
    const handleContacting = async () => {
        const isSMSAvailable = await SMS.isAvailableAsync();
        
        if (isSMSAvailable && )
         'Hello, I would like to inquire about the product you listed on FurnitureResale!'
        

    }; */

    return (
        <GestureHandlerRootView style={styles.container}>
            {/*<ImageBackground 
                source={require('../assets/AppScreemBg.jpg')}
                style= {styles.image}
                resizeMode="cover"
    > */}
                
                <FlatList
                    horizontal = {false}
                    data={items}
                    keyExtractor={(item,index) => index.toString()}
                    renderItem ={ ({item}) => (
                         <ItemCard item={item} />)
                    }
                />

        </GestureHandlerRootView>
        
        
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#F5F5FC',
        /*alignItems: 'center',
        justifyContent: 'center',*/
      },
      image: {
        flex: 1,
        justifyContent: 'center',
        
    }, 
    
})