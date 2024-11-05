import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'; 

import { fetchData } from '../hooks/FetchData';
import { FlatList, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import {ItemCard} from '../hooks/ItemCard';
import Card from '../styling/Card';
import * as T from '../styling/fonts'; 

export default function YourAdsScreen(){
    
    const [items, setItems] = useState([]); 

    useEffect(() => {fetchData(setItems)}, []); 
    
    return (
        <GestureHandlerRootView>
            <Card>
                <T.h2>Manage your posted ads here</T.h2>
            </Card>
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