import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Home from './screens/Home'
import Quiz from './screens/quiz'
import Result from './screens/result'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from './navigation/index'

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    // <Quiz />
  )
}

export default App;
