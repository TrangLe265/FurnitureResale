import {useState} from 'react';
import {View,TextInput, KeyboardAvoidingView, StyleSheet, Text} from 'react-native'; 

import {auth} from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from '@react-navigation/native';

import { Button } from '../styling/Button';
import * as T from '../styling/fonts';
import colors from '../styling/colors'; 

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
            <T.h2>Log in or create an account to continue</T.h2>

            <View>
                <TextInput
                    placeholder='Enter your email' 
                    value = {email}
                    onChangeText={text => setEmail(text) }
                    
                />
                <TextInput
                    placeholder='Enter your password' 
                    secureTextEntry //so that password is showned as **** s
                    value = {password}
                    onChangeText={text => setPassword(text)}
                
                />
                <Button
                    onPress={() => {
                        setLoginType('login')
                        handleLogin(); 

                    }} 
                
                >
                    <Text>Login</Text>
                </Button>

                <Button
                    onPress={() => {
                        setLoginType('signup');
                        handleSignup(); 
                    }}
                >
                    <Text>Signup</Text>
                </Button>
            </View>
            
           
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})