import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View,  TouchableOpacity } from 'react-native'; 
//import icons for nav
import Ionicons from '@expo/vector-icons/Ionicons'; 

import { Button, SmlButton ,Input, Row } from '../styling/Components';
import Card from '../styling/Card'; 
import * as T from '../styling/fonts'; 
import { colors } from '../styling/colors';
import { HorizontalDivider, HorizontalSpacing } from '../styling/Divider';

export default function NewAdScreen(){
    
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior='padding'
        > 
            <Card>
                <T.h1>Create a new annoucement</T.h1>
                <HorizontalDivider/>
                <HorizontalSpacing/>
                <Row>
                    <T.bodyText>Name:</T.bodyText>
                    <Input  
                        editable
                        numberOfLines={2}
                        //placeholder = 'What are you selling'
                        //value={title}
                    />
                </Row>
                <Row>
                    <T.bodyText>Brand: </T.bodyText>
                    <Input  
                        editable
                        numberOfLines={2}
                        //placeholder='Do you know the manufacturer?'
                        //value={title}
                    />
                </Row>
                <Row>
                    <T.bodyText>Price (€): </T.bodyText>
                    <Input  
                        editable
                        
                            //placeholder='Do you know the manufacturer?'
                            //value={title}
                    />
                </Row>

                <HorizontalDivider/>
                <HorizontalSpacing/>
                <View>
                    <T.bodyText>Product category: </T.bodyText>
                    <Row>
                        <SmlButton>
                            <Text>Sofa</Text>   
                        </SmlButton>
                        <SmlButton>
                            <Text>Storage</Text>   
                        </SmlButton>
                        <SmlButton>
                            <Text>Tables</Text>   
                        </SmlButton>
                        <SmlButton>
                            <Text>Beds</Text>   
                        </SmlButton>
                        <SmlButton>
                            <Text>Chairs & Armcharis</Text>   
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
                        //value={title}
                    />
                </View>

                <HorizontalDivider/>
                <HorizontalSpacing/>
                <Row>
                    <T.bodyText>Pictures of the product:</T.bodyText>
                    <TouchableOpacity>
                        <Ionicons name={'camera'} color={colors.purple} size={35}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name={'image'} color={colors.purple} size={35}/>
                    </TouchableOpacity>
                
                </Row>
                
        

            </Card>
            <Button>
                <Text>Add product</Text>   
            </Button>
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
   
})