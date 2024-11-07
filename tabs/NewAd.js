import React, { useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, ScrollView, Alert} from 'react-native'; 
import { Pressable } from 'react-native';

import ImagePickerScreen from '../hooks/ImagePicker';
//import icons for nav
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker, PickerIOS } from '@react-native-picker/picker'; 

import {getAuth} from 'firebase/auth'; 
import {app} from '../firebaseConfig'; 
import { getDatabase, ref, push, set, onValue } from 'firebase/database';

import { Button, SmlButton ,Input, Row } from '../styling/Components';
import Card from '../styling/Card'; 
import * as T from '../styling/fonts'; 
import { colors } from '../styling/colors';
import { HorizontalDivider, HorizontalSpacing } from '../styling/Divider';
import ConfirmationModal from '../hooks/ConfirmationModal';

export default function NewAdScreen(){
    //initialize realtime db and get a ref to service using getDatabsae method
    const database = getDatabase(app);
    //console.log("Database is at: ",database)
    const auth = getAuth(); 
    const currentUser = auth.currentUser; 
    
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        price: '',
        category: '',
        description: '', 
        image: '', 
        dateAdded: '',
        postedBy: '', 
        phone: '', 
    });

    const [erros, setErrors] = useState({}); //to check if required fields are empoty

    const [resetImage, setResetImage] = useState(false); 

    const [modalVisible,setModalVisible] = useState(null); 

    
    const handleAdsOwner = () => {
        setProduct((preProduct) => (
            {...preProduct, 
            'postedBy': currentUser.email, 
            'dateAdded': new Date().toISOString().split('T')[0] }
        ) )
    } 
    const handleInputChange = (field,value) => {
        setProduct((preProduct) => (
            {...preProduct, [field]:value,}
        ));
        setErrors((preErrors) => (
            {...preErrors, [field]: '',}
        ));
        handleAdsOwner(); 
    };

    const handleImage = (imageUri) => {
        setProduct((preProduct) => (
            {
            ...preProduct,
            image: imageUri,
            }
        ))
    };

    const validateFields = () => {
        const newErrors = {}
        if(!product.name) newErrors.name = 'Name field is required!'; 
        if(!product.price) newErrors.price= 'Price field is required!'; 
        if (Number(product.price) <= 0) newErrors.price='Price field has to be larger than 0'
        if(!product.category) newErrors.category ='Category field is required!';
        if(!product.image) newErrors.image = 'Image field is required!'; 

        if (Object.keys(newErrors).length > 0){
            Alert.alert(
                "Validation error",
                Object.values(newErrors).join('\n'),
            );
        }

        return newErrors;
    }; 

    const handleConfirmation = () => {
        setModalVisible(true); 
    }

    const handleSubmit = () => {
        
        console.log('Attempting to save')

        const errs = validateFields();

        if (Object.keys(errs).length === 0){
            console.log('No error with inputs');

            try {
                push(ref(database,"/"), { product });
                console.log('Product successfully added');
                Alert.alert('The announcement has been added successfully.');
            } catch (error) {
                console.log("Error saving product: ", error.message); 
            } finally {
                setProduct({
                    name: '',
                    brand: '',
                    price: '',
                    category: '',
                    description: '', 
                    image: '', 
                    dateAdded: '',
                    postedBy: '', 
                    phone: '', 
                });
                setResetImage(true); 
                setModalVisible(false); 
            }
        }
    };
 
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior='padding'
        >
            <ScrollView>
                <Card>
                    <T.h1>Create a new annoucement</T.h1>

                    <HorizontalDivider/>
                    <HorizontalSpacing/>

                    <Row>
                        <T.bodyText>Name:</T.bodyText>
                        <Input  
                            editable
                            maxLength={30}
                            value={product.name}
                            onChangeText= {(text) => handleInputChange('name',text)}
                        />
                    </Row>
                    <Row>
                        <T.bodyText>Brand: </T.bodyText>
                        <Input  
                            editable
                            maxLength={30}
                            value={product.brand}
                            onChangeText= {(text) => handleInputChange('brand',text)}
                        />
                    </Row>
                    <Row>
                        <T.bodyText>Price (€): </T.bodyText>
                        <Input  
                            editable
                            keyboardType={'numeric'}
                            maxLength={10}
                            value={product.price}
                            onChangeText= {(text) => handleInputChange('price',text)}
                        />
                    </Row>
                    <Row>
                        <T.bodyText>Contact:</T.bodyText>
                        <Input  
                            editable
                            keyboardType={'numeric'}
                            maxLength={10}
                            value={product.phone}
                            onChangeText= {(text) => handleInputChange('phone',text)}
                        />
                    </Row>

                    <HorizontalDivider/>
                    <HorizontalSpacing/>

                   <View>
                        <T.bodyText>Product's category:</T.bodyText>
                        <Row>
                            <SmlButton onPress={() => handleInputChange('category', 'sofas')}>
                                <Text>Sofa</Text>   
                            </SmlButton>
                            <SmlButton onPress={() => handleInputChange('category', 'storages')}>
                                <Text>Storage</Text>   
                            </SmlButton>
                            <SmlButton onPress={() => handleInputChange('category', 'tables')}>
                                <Text>Tables</Text>   
                            </SmlButton>
                            <SmlButton onPress={() => handleInputChange('category', 'beds')}>
                                <Text>Beds</Text>   
                            </SmlButton>
                            <SmlButton onPress={() => handleInputChange('category', 'chair & armchairs')}>
                                <Text>Chairs & Armcharis</Text>   
                            </SmlButton>
                            <SmlButton onPress={() => handleInputChange('category', 'others')}>
                                <Text>Others</Text>   
                            </SmlButton>
                        </Row>
                     </View>

                    <HorizontalDivider/>
                    <HorizontalSpacing/>
                    
                    <View>
                        <T.bodyText>Description: </T.bodyText>
                        <Input  
                            editable
                            multiline
                            numberOfLines={3}
                            style={{width: 300, height: 100}}
                            value={product.description}
                            onChangeText= {(text) => handleInputChange('description',text)}

                        />
                    </View>
                    <HorizontalSpacing/>
                    <HorizontalDivider/>
                    
                    <ImagePickerScreen onImageSelect={handleImage} resetImage={resetImage} />
                    {erros.image && <T.bodyText>{erros.image}</T.bodyText> }

                    <Button onPress={() =>{handleConfirmation()}}>
                        Add product  
                    </Button>

                    <HorizontalSpacing/>
                </Card>
                <ConfirmationModal 
                    visible={modalVisible}
                    onConfirm= {() => handleSubmit()}
                    onCancel={() => setModalVisible(false)}
                    message='The announcement will be added to out MarketPlace. Would you like to proceed?'
                />
          
            </ScrollView>
            
        </KeyboardAvoidingView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#F5F5FC',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,      
      },
   
})