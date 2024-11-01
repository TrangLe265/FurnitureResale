import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'; 

import { fetchData } from '../hooks/FetchData';
import { FlatList, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import {ItemCard} from '../hooks/ItemCard';

export default function YourAdsScreen(){
    
    const [items, setItems] = useState([]); 

    useEffect(() => {fetchData(setItems)}, []); 
    
    return (
        <GestureHandlerRootView>
            <FlatList 
                horizontal= {false}
                data={items}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item}) => (
                    <ItemCard  item={item}/>
                )

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
      },
})