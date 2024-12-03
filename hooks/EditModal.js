import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { colors } from '../styling/colors';

import * as T from '../styling/fonts'; 
import { Row, SmlButton, Input } from '../styling/Components';

import { getDatabase, ref, update } from 'firebase/database';
import {app} from '../firebaseConfig';

export default EditModal = ({ visible, onCancel, onConfirm, item }) => {
    console.log(item); 

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

    useEffect(() => {
        if (item) { //even if a field is missing, the useEffect will still go through
            setProduct({
                name: item.product.name || '',
                brand: item.product.brand || '',
                price: item.product.price || '',
                category: item.product.category || '',
                description: item.product.description || '',
                image: item.product.image || '',
                dateAdded: item.product.dateAdded || '',
                postedBy: item.product.postedBy || '',
                phone: item.product.phone || '',
            });
        }
    }, [item]);
    

    const handleInputChange = (field,value) => {
        setProduct((prevProduct) => {
            const updatedProduct = { ...prevProduct, [field]: value };
            console.log(updatedProduct);
            console.log(value);
            return updatedProduct;
        });
    };  

    const handleEditConfirmation = () => {
        const database = getDatabase(app);
        const itemRef = ref(database, `/${item.id}/product`); //how the firebase link is configured

        // destrcuting object
        const { name, brand, price, category, description } = product;
        const updatedData = { brand, price, description }; //only change the value updated

        update(itemRef, updatedData)
            .then(() => {
                console.log('Updating new data: ',updatedData); 
                Alert.alert('Changes have been made successfully.');
            })
            .catch((error) => console.error(error));

        onCancel(); // Close modal after confirming 
    }

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {item ? (
            <>
              <T.h1>{item.product.name}</T.h1> 
              <T.h2>Description: </T.h2>
              <Input
                editable
                multiline
                numberOfLines={3}
                style={{width: 300, height: 100}} 
                placeholder={`Description: ${product.description}`} 
                value={product.description} 
                onChangeText={(text) => handleInputChange('description',text)} 
              />
              <T.h2>Price:</T.h2>
              <Input
                editable
                keyboardType={'numeric'}
                maxLength={10} 
                style={{width: 300}}
                placeholder={`Price: ${product.price}`} 
                value={product.price} 
                onChangeText={(number) => handleInputChange('price',number)} 
              />
              <T.h2>Brand:</T.h2>
              <Input
                editable
                maxLength={10} 
                style={{width: 300}}
                placeholder={`Brand: ${product.brand}`} 
                value={product.brand} 
                onChangeText={(text) => handleInputChange('brand',text)} 
              />
            </>
          ) : (
            <Text>No item selected</Text>
          )}
          <Row>
            <SmlButton style={{backgroundColor: colors.orange}} onPress={onCancel}>Cancel</SmlButton>
            <SmlButton onPress={handleEditConfirmation}>Proceed</SmlButton>
          </Row>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

});

