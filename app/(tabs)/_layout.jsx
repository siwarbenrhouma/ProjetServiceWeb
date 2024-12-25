import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown : false, tabBarActiveTintColor: '#40B7B4'}}>
        <Tabs.Screen name="home" 
        options={{
            tabBarLabel : 'Home',
            tabBarIcon : ({color}) => <Ionicons name="home" size={24} color={color} />
            
        }}
        />
    </Tabs>
  )
}