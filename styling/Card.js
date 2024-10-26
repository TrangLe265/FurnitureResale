import { View } from "react-native";
import { colors } from "./colors";

export default function Card({children}) {
	//const { width } = Dimensions.get('window'); 

	return (
		<View
			style={{
				borderColor: colors.brown,
                borderWidth: 0.5,
                //backgroundColor: 'white', 
                //backgroundColor: colors.white,
				width: '90%',
				padding: 20,
				margin: 10, 
				alignSelf: 'center',
			}}>
			{children}
		</View>
	)
}; 

