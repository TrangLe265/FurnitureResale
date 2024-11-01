import {useState} from 'react';
import {View, KeyboardAvoidingView, StyleSheet, Text, ImageBackground, Image} from 'react-native'; 

import {auth} from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from '@react-navigation/native';

import { Button, Input } from '../styling/Components';
import * as T from '../styling/fonts';
import {colors} from '../styling/colors'; 


export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
   
    const [loginType, setLoginType] = useState('login'); 

    const navigation = useNavigation(); 

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password) //create user
        .then(userCredentials => {
            const user = userCredentials.user; 
            console.log(user.email); 
            navigation.replace('Home');
        })
        .catch(error => alert(error.message))
    }

    const handleLogin = () => {
          signInWithEmailAndPassword(auth,email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
            navigation.replace('Home');
          })
          .catch(error => alert(error.message))
      }
    
    return(
        //used KeyboardAvoidingView so that the keyboard does not cover the input field
        
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <ImageBackground 
                source={require('../assets/Flowerpot.jpg')}
                style= {styles.image}
                resizeMode="cover"
            > 

            <View style={styles.mainContent}>
                <View style={{ width:'100%'}}>
                    <T.hero>FurnitureResale</T.hero>
                </View>
                
                <View style ={{flexDirection:'column',width:'90%', alignContent:'center', margin: 10}}>
                    <T.heroSmall>Log in or create an account to continue</T.heroSmall>         
                </View>

            
                <Input
                    placeholder='Enter your email' 
                    value = {email}
                    onChangeText={text => setEmail(text)
                     }
                    
                />
                <Input
                    placeholder='Enter your password' 
                    secureTextEntry //so that password is showned as **** s
                    value = {password}
                    onChangeText={text => setPassword(text)}
                
                />

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Button onPress={() => { handleLogin()}}>
                            <Text>Login</Text>
                        </Button>  
                        <Button onPress={() => {handleSignup()}}>
                            <Text>Signup</Text>
                        </Button>
                </View>
             
            </View>

            </ImageBackground>
        </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        
    }, 
    mainContent: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
})