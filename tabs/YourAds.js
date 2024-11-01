import { getDatabase } from 'firebase/database';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'; 

export default function YourAdsScreen(){
    const database = getDatabase(app);
    const [items, setItems] = useState([]); 
    
    return (
        <View> 
            <Text>Your posted ads</Text>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})