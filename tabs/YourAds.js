import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native'; 

import { fetchData } from '../hooks/FetchData';
import { FlatList, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import {ItemCard} from '../hooks/ItemCard';
import Card from '../styling/Card';
import {ActionLink, Button, Row, SmlButton} from '../styling/Components';
import * as T from '../styling/fonts'; 
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, child, push, update, remove } from "firebase/database";
import {app} from '../firebaseConfig'; 
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { colors } from '../styling/colors';
import { HorizontalDivider, HorizontalSpacing } from '../styling/Divider';
import ConfirmationModal from '../hooks/ConfirmationModal';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import EditModal from '../hooks/EditModal';


export default function YourAdsScreen(){
    
    const [items, setItems] = useState([]); 
     
    const auth = getAuth(); 
    const currentUser = auth.currentUser; 
    const database = getDatabase(app);

    const navigation = useNavigation(); 
    
    const [selectedId, setSelectedId] = useState(null); 
    const [modalVisible,setModalVisible] = useState(false); 
    const [editModalVisible, setEditModalVisible] = useState(false); 
    const [currentItem, setCurrentItem] = useState(null); 

    useEffect(() => {fetchData(setItems)}, []); 

    const handleDeleteConfirmation = (itemId) => {
        setSelectedId(itemId); 
        setModalVisible(true); 
    }

    const handleDelete = (selectedId) => {
        if (selectedId) {
            const itemRef = ref(database,`/${selectedId}`);
            console.log("Item Reference:", itemRef); 
            remove(itemRef)
            .then(() => {
                console.log('Item removed');
                Alert.alert('The announcement has been deleted successfully.')
            })
            .catch((error) => {console.error(error)})    
        }
        setModalVisible(false);
        }

    const handleEdit = (item) => {
        setCurrentItem(item); 
        console.log('current item is: ',item); 
        setEditModalVisible(true); 
    }


    const currentUserItems = items.filter(item => item.product.postedBy === currentUser.email); 
  
    return (
        <GestureHandlerRootView>
            {(currentUserItems.length > 0) ? (
                <View>
               <FlatList 
                    horizontal= {false}
                    data={currentUserItems}
                    keyExtractor={(item) => item.id}
                    renderItem={ ({item}) => 
                            (<ItemCard  item={item}>
                                    <Row>
                                        <ActionLink onPress={() => handleDeleteConfirmation(item.id)}>
                                            Delete
                                        </ActionLink>
                                        <ActionLink onPress={() => handleEdit(item)}>
                                            Edit
                                        </ActionLink>
                                    </Row>                                    
                            </ItemCard>)}
                />
                <ConfirmationModal 
                    visible={modalVisible}
                    onConfirm= {() => handleDelete(selectedId)}
                    onCancel={() => setModalVisible(false)}
                    message='The announcement will be removed from our MarketPlace. Would you like to proceed?'
                />
                 <EditModal 
                    visible={editModalVisible}
                    item = {currentItem}
                    onCancel={() => setEditModalVisible(false)}
                />

                </View>
                
                    ) : (
                        <Card>
                            <Row style={{flexDirection: 'column', alignContent: 'center' }}>
                                <Ionicons name='bag-outline' size={50} color={colors.brown}/>
                                <HorizontalSpacing/>
                                <T.h2>
                                    You currently have no active annoucement.
                                    Following this link to create your first ad!
                                </T.h2>
                               <ActionLink onPress={() => navigation.navigate('New Announcement')}>New Annoucement</ActionLink>
                            </Row>
                        </Card>
                    )
                }
                
            
        </GestureHandlerRootView> 
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20, 
        backgroundColor: '#F5F5FC',
      },
})