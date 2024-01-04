import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomePage from './HomePage';
import Profile from './Profile';
import Notification from "./Notification";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';

const TabButton = () => {
  const [currentTab, setCurrentTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setCurrentTab(tabNumber);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TabNavigator >
        <Button onPress={() => handleTabClick(1)}>Tab 1</Button>
        <Button onPress={() => handleTabClick(2)}>Tab 2</Button>
        <Button onPress={() => handleTabClick(3)}>Tab 3</Button>

        {currentTab === 1 && <HomePage />}
        {currentTab === 2 && <Notification />}
        {currentTab === 3 && <Profile />}
      </TabNavigator>
    </GestureHandlerRootView>
  );
};

export default TabButton;
