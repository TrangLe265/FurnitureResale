import { StyleSheet, Text, View } from 'react-native'; 
import * as T from '../styling/fonts'; 

export default function HomeScreen(){
    return (
        <View style={styles.container}> 
            <T.h1>Secondhand Furniture Marketplace</T.h1>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      },
})