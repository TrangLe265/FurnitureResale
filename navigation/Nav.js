import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from '@expo/vector-icons/Ionicons'; 

import {colors} from '../styling/colors'; 
import * as T from '../styling/fonts'; 

import HomeScreen from "../tabs/Home";
import NewAdScreen from "../tabs/NewAd";
import YourAdsScreen from "../tabs/YourAds";
import LoginScreen from '../tabs/Login';

 //calling the function make bottNav
  //function returns an object containing all the components needed in nav
  const Tab = createBottomTabNavigator(); 
  const Stack = createNativeStackNavigator(); 


//Create a tab bar for all main functions of the app
function CreateBottomNav(){
 

  return (
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

          const iconColor = focused ? colors.orange : colors.brown; 
          
          return <Ionicons name={iconName} size= {30} color= {iconColor} />; 
        },
        tabBarStyle: {height: 90, paddingTop: 10, backgroundColor: colors.white},
        tabBarLabel: ({focused}) => (
          <T.smlBodText 
            style={{
              fontSize: 12, 
              color: focused ? colors.orange : colors.brown 
            }}
          >
            {route.name}
          </T.smlBodText >
        ), 
        headerTitle: getHeaderTitle({ route, options: {title : route.name} }),
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.orange,
      
      })}>

      <Tab.Screen name="Marketplace" component={HomeScreen} />
      <Tab.Screen name="New Announcement" component={NewAdScreen} />
      <Tab.Screen name="Own Announcement" component={YourAdsScreen} />
    </Tab.Navigator>
  );
}

export default function NavBar() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name= "Home" component={CreateBottomNav} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
