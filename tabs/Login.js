import {useState} from 'react';
import {View,TextInput, KeyboardAvoidingView, StyleSheet} from 'react-native'; 
import {auth} from '../firebaseConfig';

import { Button } from '../styling/Button';
import * as T from '../styling/fonts';
import colors from '../styling/colors'; 

export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState('false');
    const [loginType, setLoginType] = useState('login'); 

    console.log(auth); 
    
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
                    onChangeText={text => setEmail(email) }
                    
                />
                <TextInput
                    placeholder='Enter your password' 
                    secureTextEntry //so that password is showned as **** s
                    value = {password}
                    onChangeText={text => setPassword()}
                
                />
                {/*<Button
                    onPress={() => setLoginType('login')} 
                >
                    <Text>Login</Text>
                </Button>
                <Button
                    onPress={() => setLoginType('signup')}
                >
                    <Text>Signup</Text>
    </Button>*/}
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