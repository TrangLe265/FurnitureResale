import { StyleSheet, Text, View } from 'react-native'; 

export default function NewAdScreen(){
    return (
        <View> 
            <Text>Create a sale announcement</Text>
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