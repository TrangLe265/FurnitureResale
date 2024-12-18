import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'; 
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import * as SMS from 'expo-sms';
import Ionicons from '@expo/vector-icons/Ionicons'; 

import * as T from '../styling/fonts'; 
import Card from '../styling/Card';
import { Row, IconButton } from '../styling/Components';
import { HorizontalDivider } from '../styling/Divider';
import { colors } from '../styling/colors';
import { fetchData } from '../hooks/FetchData';
import {ItemCard} from '../hooks/ItemCard';

export default function HomeScreen(){
   
    const [items, setItems] = useState([]); 
    const [sortOrder,setSortOrder] = useState('ascending') //Price sorted ascending by default

    const getSortedItems = () => {
        //create a shallow copy of items list for sorting 
        //array.sort(compareFunction)
        return [...items].sort((a,b) => {
            const priceA = parseFloat(a.product.price);
            const priceB = parseFloat(b.product.price); 
            return sortOrder === 'ascending' ? priceA - priceB : priceB - priceA
        })
    }

    const toggleSort = () => {
        //prev = the previous state of sortOrder 
        setSortOrder((prev) => (
            (prev === 'ascending') ? 'descending' : 'ascending'
        )); 
    }

    useEffect(() => {
        fetchData(setItems);
    }, []); 

    
    const handleContacting = async (phoneNumber) => {
        const isSMSAvailable = await SMS.isAvailableAsync();
        
        if (isSMSAvailable && phoneNumber.length > 0){
            const {result} = await SMS.sendSMSAsync(phoneNumber, 'Hello, I would like to inquire about the product you listed on FurnitureResale!')
        }
         

    }; 

    return (
        <GestureHandlerRootView style={styles.container}>
            {(items.length === 0) ? (
                //if there is no item for sales
                <Card>
                    <Row style={{flexDirection: 'column', alignContent: 'center' }}>
                        <Ionicons name='sad-outline' size={50} color={colors.brown}/>
                        <HorizontalDivider/>
                        <T.h2>There is currently no items availabe for sale.</T.h2>
                    </Row>
                </Card>
            ) : (
                //if there are items for sales
                <View>
                    <Card style={{paddingVertical: 2}}>
                        <Row>
                            <Ionicons name='filter-outline' size={30} color={colors.orange}/>
                            <T.h2>
                                Sort by price: {sortOrder === 'ascending' ? 'Ascending' : 'Descending'}
                            </T.h2> 
                            <Pressable onPress={toggleSort}>
                                <Ionicons name={sortOrder === 'ascending' ? 'arrow-up-circle' : 'arrow-down-circle'} size={30} color={colors.orange} />
                            </Pressable>

                        </Row>
                    </Card>
                    <FlatList
                        horizontal = {false}
                        data={getSortedItems()}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem ={ ({item}) => (
                            <ItemCard item={item}>  
                                <IconButton 
                                    iconName='chatbubbles-outline' 
                                    onPress={() => handleContacting(item.product.phone)}
                                />
                            </ItemCard>
                            )
                        }
                    />
                </View>
            )}
        </GestureHandlerRootView>
   
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#F5F5FC',
        paddingBottom: 20, 
        /*alignItems: 'center',
        justifyContent: 'center',*/
      }
    
})