import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInWithOAuth from './../../components/SignInWithOAuth' // Assurez-vous que le chemin est correct
import SignUp from './../../components/SignUp';
import { st } from "expo-router";
import ProjectList from '../../components/Home/ProjectList';
import TaskList from '../../components/Home/TaskList';
import TaskDetail from '../../components/Home/TaskDetail';
const Stack = createStackNavigator();

export default function SignInLayout() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen 
        name="SignIn" 
        component={SignInWithOAuth} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp}  
      />
      <Stack.Screen 
        name="Project" 
        component={ProjectList}  
      />
      <Stack.Screen 
        name="Tasks" 
        component={TaskList}  
      />
      <Stack.Screen 
        name="TaskDetails" 
        component={TaskDetail}  
      />
    </Stack.Navigator>
  );
}
