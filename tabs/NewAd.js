import React, { useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, ScrollView, Alert} from 'react-native'; 
import { Pressable } from 'react-native';

import ImagePickerScreen from '../hooks/ImagePicker';
//import icons for nav
import Ionicons from '@expo/vector-icons/Ionicons'; 

import {getAuth} from 'firebase/auth'; 
import {app} from '../firebaseConfig'; 
import { getDatabase, ref, push, set, onValue } from 'firebase/database';

import { Button, SmlButton ,Input, Row } from '../styling/Components';
import Card from '../styling/Card'; 
import * as T from '../styling/fonts'; 
import { colors } from '../styling/colors';
import { HorizontalDivider, HorizontalSpacing } from '../styling/Divider';

export default function NewAdScreen(){
    //initialize realtime db and get a ref to service using getDatabsae method
    const database = getDatabase(app);
    
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        price: '',
        category: '',
        description: '', 
        image: '', 
        dateAdded: '',
        postedBy: '', 
    });
    const [items, setItems] = useState([]); 


    const auth = getAuth(); 
    const currentUser = auth.currentUser; 

    const [erros, setErrors] = useState({}); //to check if required fields are empoty

    useEffect(() => {
        const itemsRef = ref(database, 'items/'); 
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setItems(Object.values(data)); 
            } else {
                setItems([]); 
            
            }
        })
    }
        /*
        setProduct((prevProduct) => (
            {
             ...prevProduct, 
             postedBy: currentUser.email, //get the name from the current login user
             dateAdded: new Date().toISOString(), //automatically added the date posted
            }
        ));
        */, [currentUser]); 
    
    
    const handleInputChange = (field,value) => {
        setProduct((preProduct) => (
            {...preProduct, [field]:value,}
        ));
        setErrors((preErrors) => (
            {...preErrors, [field]: '',}
        ));
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
        if(!product.price) newErrors.price= 'Price field is required'; 
        if(!product.category) newErrors.category ='Category field is required';
        if(!product.image) newErrors.image = 'Image field is required'; 

        if (Object.keys(newErrors).length > 0){
            Alert.alert(
                "Validation error",
                Object.values(newErrors).join('\n'),
            );
        }

        return newErrors;
    }; 

    const handleSubmit = async () => {
        console.log('Attempting to save')
        const errs = validateFields();

        if (Object.keys(errs).length === 0){
            console.log('No error with inputs');

            try {
                await set(ref(database, 'items/'), { test: 'This is a test' });
                console.log('Product successfully added');
            } catch (error) {
                console.log("Error saving product: ", error.message);
            }
        };
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

                    <HorizontalDivider/>
                    <HorizontalSpacing/>
                    <View>
                        <T.bodyText>Product category: </T.bodyText>
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
                            numberOfLines={5}
                            style={{width: '100%', height: 100}}
                            value={product.description}
                            onChangeText= {(text) => handleInputChange('description',text)}

                        />
                    </View>
                    <HorizontalSpacing/>
                    <HorizontalDivider/>
                    
                    <ImagePickerScreen onImageSelect={handleImage} />
                    {erros.image && <T.bodyText>{erros.image}</T.bodyText> }

                    <Button onPress={() =>{
                        console.log('Button pressed');
                        handleSubmit(); 
                    }}>
                        <Text>Add product</Text>   
                    </Button>
                </Card>
          
            </ScrollView>
            
        </KeyboardAvoidingView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white ',
        alignItems: 'center',
        justifyContent: 'center',
      },
      scrollView: {
        flexGrow: 1,
        alignItems: 'center', 
        paddingBottom: 30, 
      }
   
})