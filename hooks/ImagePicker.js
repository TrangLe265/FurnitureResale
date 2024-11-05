import React, { useEffect, useState } from 'react';
import { View, Image, Platform, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { Pressable } from 'react-native';


import { Button, SmlButton } from '../styling/Components';
import { colors } from '../styling/colors';

const ImagePickerScreen = ({onImageSelect, resetImage}) => {
    const [image, setImage] = useState(null); 


    useEffect(() => {
        (async () => {
            //so that the code only executed on phone platform
            if (Platform.OS !== 'web'){
                //geting permission to access media lib
                const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
                if (libraryStatus.status !== 'granted'){
                    alert('We need library permission to make this function work!')
                }

                //getting permission to access camera
                const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraStatus.status !== 'granted') {
                    alert('We need camera permission to make this function work!')
                }
            }
        }) (); 
    },[]); 

    useEffect(() => {
        if (resetImage) {
            setImage(null);  // Clear the image state
        }
    }, [resetImage]);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality:   1,
        }); 

        if (!result.canceled){
            const selectedImage = result.assets[0].uri;
            setImage(selectedImage); 
            onImageSelect(selectedImage); 
        }
    }; 

    return (
        <View style={styles.container}>
            <Button
                onPress={pickImage}
            >
                <Text>Choose image</Text>
            </Button>
            {/*If photo is successfully retrieved then display it*/}
            {image ? (
                <Image 
                source = {{uri:image}}
                style={styles.image} 
            />

            ) : (
                <Ionicons 
                    name="image"
                    size= {200}
                    color = {colors.green}
                />
            )}
         
        </View>

    );
}

export default ImagePickerScreen; 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10, 
      height: 300,
    },
    image: {
      width: 200,
      height: 200,
      marginTop: 20,
    },
  });

