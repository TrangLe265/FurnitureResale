import { useState, useEffect } from 'react';

import { ImageBackground } from 'react-native';
import * as SMS from 'expo-sms';

import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'; 
import * as T from '../styling/fonts'; 
import Card from '../styling/Card';
import { Row, SmlButton, ActionLink, Button, IconButton } from '../styling/Components';

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

    
    const handleContacting = async (phoneNumber) => {
        const isSMSAvailable = await SMS.isAvailableAsync();
        
        if (isSMSAvailable && phoneNumber.length > 0){
            const {result} = await SMS.sendSMSAsync(phoneNumber, 'Hello, I would like to inquire about the product you listed on FurnitureResale!')
        }
         

    }; 

    return (
        <GestureHandlerRootView style={styles.container}>
            {(items.length === 0) ? (
                <Card>
                    <Row style={{flexDirection: 'column', alignContent: 'center' }}>
                        <Ionicons name='sad-outline' size={50} color={colors.brown}/>
                        <HorizontalDivider/>
                        <T.h2>There is currently no items availabe for sale.</T.h2>
                    </Row>
                    
                </Card>
            ) : (
                <View>
                    <Card style={{paddingVertical: 2}}>
                        <Row>
                            <Ionicons name='filter-outline' size={30} color={colors.orange}/>
                            <T.bodyText>TODO Filter (Maybe)</T.bodyText>
                        </Row>

                    </Card>
                <FlatList
                    horizontal = {false}
                    data={items}
                    keyExtractor={(item,index) => index.toString()}
                    renderItem ={ ({item}) => (
                        <ItemCard item={item}>  
                            <IconButton iconName='chatbubbles-outline' onPress={() => handleContacting(item.product.phone)} />

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
        /*alignItems: 'center',
        justifyContent: 'center',*/
      }
    
})