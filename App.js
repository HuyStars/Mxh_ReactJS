import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Login, Signup, Welcome, TabButton, HomePage, Notification, Profile} from "./screens";
import Quanlybaiviet from './screens/Quanlybaiviet';
import UpdateBV from './screens/UpdateBV';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
      >
        <Stack.Screen
          name="Welcom"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
        
        />
        <Stack.Screen
          name="TabButton"
          component={TabButton}
          options={{
            headerShown: false
          }}
        
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            headerShown: false
          }}
        
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: false
          }}
        
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false
          }}
        
        />
        <Stack.Screen
          name="Quanlybaiviet"
          component={Quanlybaiviet}
          options={{
            headerShown: false
          }}
        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

