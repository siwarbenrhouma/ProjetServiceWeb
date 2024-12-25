import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProjectList from '../../components/Home/ProjectList'
import TaskList from '../../components/Home/TaskList'
import TaskDetail from '../../components/Home/TaskDetail'

const Stack = createStackNavigator();
export default function home() {
  return (
      <Stack.Navigator initialRouteName="Projects">
        <Stack.Screen name="Projects" component={ProjectList} options={{ title: 'Projets' }} />
        <Stack.Screen name="Tasks" component={TaskList} options={{ title: 'Tâches' }} />
        <Stack.Screen name="TaskDetails" component={TaskDetail} options={{ title: 'Détails de la Tâche' }} />
      </Stack.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex : 1,
    padding : 10,
    paddingTop : 20
  }
})