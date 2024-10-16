import {View, Text} from 'react-native'; 
//import nav
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import icons for nav
import Ionicons from '@expo/vector-icons/Ionicons'; 

//import all nav tabs
import HomeScreen from "./tabs/Home";
import NewAdScreen from "./tabs/NewAd";
import YourAdsScreen from "./tabs/YourAds";

//calling the function make bottNav
//function returns an object containing all the components needed in nav
const Tab = createBottomTabNavigator(); 

export default function App() {
  return (
    //Rendering the nav
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={
          ({route}) => ({
          tabBarIcon: ({focused, color, size}) =>
          {
            let iconName;

            if (route.name == 'Marketplace'){
              iconName='storefront'; 
            } else if (route.name === "New Announcement"){
              iconName = 'add-circle'; 
            } else if (route.name === "Own Announcement"){
              iconName = 'person-circle-sharp'; 
            }

            return <Ionicons name={iconName} size= {30} color='blue'/>;
          },
          tabBarStyle: {height: 100, paddingTop: 10},
          tabBarLabel: ({focused}) => (
            <Text style={{fontSize: 12, color: focused ? 'blue' : 'gray'}}>{route.name}</Text>
          )
        
        })}>

        <Tab.Screen name="Marketplace" component={HomeScreen} />
        <Tab.Screen name="New Announcement" component={NewAdScreen} />
        <Tab.Screen name="Own Announcement" component={YourAdsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
