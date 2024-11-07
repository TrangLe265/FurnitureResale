import { View } from "react-native";
import { colors } from "./colors";

export default function Card({children, style}) {
	//const { width } = Dimensions.get('window'); 

	return (
		<View
			style={[{
				//borderColor: colors.brown,
                //borderWidth: 1,
				borderRadius: 5,
                //backgroundColor: '#FFFEF9', 
                backgroundColor: colors.white,
				width: 350, 
				//maxWidth: '95%',
				padding: 20,
				margin: 10, 
				alignSelf: 'center', 

			}, style]}>
			{children}
		</View>
	)
}; 

