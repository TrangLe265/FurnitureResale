import { useState, useEffect } from 'react';
import { getDatabase, push, ref, onValue, Database } from 'firebase/database';
import {getAuth} from 'firebase/auth'; 
import {app} from '../firebaseConfig'; 

import { ImageBackground } from 'react-native';

import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'; 
import * as T from '../styling/fonts'; 
import Card from '../styling/Card';
import { Row, SmlButton, ActionLink } from '../styling/Components';

import Ionicons from '@expo/vector-icons/Ionicons'; 
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { HorizontalDivider, HorizontalSpacing } from '../styling/Divider';
import { colors } from '../styling/colors';

export default function HomeScreen(){
    const database = getDatabase(app);
    const [items, setItems] = useState([]); 

    //console.log("Database is at:", database); 

    useEffect(() => {
        const itemsRef = ref(database); 
    
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            console.log("check if there is data?: ",data); 
            if (data) {
                const itemsArray = Object.values(data); 
                setItems(itemsArray); 
                console.log(itemsArray); 
            }else {
                setItems([]); 
            }
        }); 
        
    }, [database]); 

    console.log("Items length: ",items.length);


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
                    renderItem ={ ({item}) => 
                        (<Card>
                            <ImageBackground
                                source= {{uri : item.product.image}}
                                style= {{height:200,width:'100%'}}
                                 resizeMode="cover"
                            />
                            <HorizontalSpacing/>
                                <T.h1>{item.product.name}</T.h1>
                                <HorizontalDivider />

                                <Row>
                                    <Row style={{flexDirection: 'column'}}>
                                        <Ionicons name='pricetag-outline' size= {20} color= {colors.orange}/>
                                        <T.smlBodText>{item.product.category}</T.smlBodText>
                                    </Row>
                                    <Row style={{flexDirection: 'column'}}>
                                        <Ionicons name='cash-outline' size= {20} color= {colors.orange}/>
                                        <T.smlBodText>{item.product.price} €</T.smlBodText>
                                    </Row>
                                    <Row style={{flexDirection: 'column'}}>
                                        <Ionicons name='time-outline' size= {20} color= {colors.orange}/>
                                        <T.smlBodText>{item.product.dateAdded}</T.smlBodText>
                                    </Row>  
                                </Row>
                                <HorizontalDivider />
                                <HorizontalSpacing/>
                            
                                <T.h2>About the item:</T.h2>
                                <T.smlBodText>{item.product.description}</T.smlBodText>
                        
                                <Row>
                                    <T.h2>Brand:</T.h2>
                                    <T.smlBodText>{item.product.brand}</T.smlBodText>
                                </Row>
                                <Row>
                                    <T.h2>Posted by: </T.h2>
                                    <T.smlBodText>{item.product.postedBy}</T.smlBodText>

                                </Row>
                                <HorizontalSpacing/>
                                <HorizontalDivider />
                                
                                <ActionLink>Contact seller</ActionLink>
                                
                                
                        </Card>)}
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