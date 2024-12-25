import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function UserIntro() {
    const {user}= useUser();
  return (
    <View >
      <View style={styles.header}>
        <Image source={{ uri: user?.imageUrl }} style={styles.image} />
      </View>
        <View style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 50,
                paddingTop: 10,
                borderRadius : 10,
                borderWidth : 2,
                paddingLeft:20,
                borderColor: '#40B7B4',
                backgroundColor: '#D3D3D3',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                elevation: 3,
                margin : 30,
    }}>
          <Text style= {{
            fontSize: 20
          }}>{user?.fullName}</Text>
          <View  style={{flexDirection: 'row',
                        alignItems: 'center'}} >
          <MaterialIcons name="email" size={24} color="black" />
          <Text style= {{
            fontSize: 16,
            marginBottom: 7,
            paddingTop: 5,
          }} >{user?.primaryEmailAddress?.emailAddress}</Text>
          </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    borderBottomLeftRadius: 99,
    borderBottomRightRadius: 99,
    backgroundColor: '#D3D3D3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#40B7B4',
    position: 'relative',
    height: 160,
    marginBottom: 15
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 99,
    borderColor: '#40B7B4',
    borderWidth: 2,
    position: 'absolute',
    bottom: -50, 
  },
});