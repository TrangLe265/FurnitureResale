import {View, Text} from 'react-native'; 
//import nav
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import icons for nav
import Ionicons from '@expo/vector-icons/Ionicons'; 

//imprort constans
import {colors} from '../styling/colors'; 
import * as T from '../styling/fonts'; 

//import all tabs
import HomeScreen from "../tabs/Home";
import NewAdScreen from "../tabs/NewAd";
import YourAdsScreen from "../tabs/YourAds";
import LoginScreen from '../tabs/Login';

 //calling the function make bottNav
  //function returns an object containing all the components needed in nav
  const Tab = createBottomTabNavigator(); 
  const Stack = createNativeStackNavigator(); 

//Create a stack nav for users to login/out
{/*function createAuthNav(){
  
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
      <Stack.Screen name= "Home" component={HomeScreen} />
    </Stack.Navigator>
  ); 
}*/}

//Create a tab bar for all main functions of the app
function createBottomNav(){
 

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

          const iconColor = focused ? colors.activeBlue : colors.nonActiveBlue; 

          return <Ionicons name={iconName} size= {30} color= {iconColor} />; 
        },
        tabBarStyle: {height: 90, paddingTop: 10},
        tabBarLabel: ({focused}) => (
          <T.smlBodText 
            style={{
              fontSize: 12, 
              color: focused ? colors.activeBlue : colors.nonActiveBlue 
          }}>
            {route.name}
          </T.smlBodText >
        ), 
        headerTitle: getHeaderTitle({route, options: {title : route.name}}),
        headerStyle: {
          backgroundColor: colors.nonActiveBlue,

        },
        headerTintColor: colors.white,
      
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
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name= "Home" component={createBottomNav} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
