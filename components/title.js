import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Quizzler</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  Title:{
    fontSize:50,
    fontWeight:'600',
    color:'black'
  },
  container:{
    justifyContent:'center',
    alignItems:'center'
  }
})