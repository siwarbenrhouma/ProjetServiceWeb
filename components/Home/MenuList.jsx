import { View, Text, FlatList, Image, Share, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { router, useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function MenuList() {
    const {signOut} = useAuth();
    const menuList = [
        {
        id : 1,
        name : 'Edit Profile',
        icon : <AntDesign name="edit" size={24} color="black" />,
        path : '/(tabs)/home'
    },{
        id : 2,
        name : 'Share App',
        icon : <Entypo name="share" size={24} color="black" />,
        path : 'share'
    },{
        id : 3,
        name : 'logout',
        icon : <MaterialIcons name="logout" size={24} color="black" />,
        path : 'logout'
    }
]
const router=useRouter();
const onMenuClick = (item) => {
    if (item.path == 'logout') {
        signOut();
        return;
    }
    if(item.path == 'share'){
        Share.share({message :'Download app'});
        return;
    }
    router.push(item.path)
}
  return (
    <View>
        <View style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop : 30,
            borderRadius: 20,
            backgroundColor: '#f0f0f0', 
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            padding: 10,
            marginHorizontal : 20,}}>
        <FlatList  
        data={menuList}
        numColumns={1}
        renderItem={({item,index})=>(
            <TouchableOpacity style={{
                display: 'flex',
                flexDirection: 'row',
                flex : 1,
                alignItems: 'center',
                gap: 4,
                padding : 8,
                borderRadius : 10,
                borderWidth : 2,
                borderColor: '#40B7B4',
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                elevation: 3,
                margin : 15,
            }} onPress={()=>onMenuClick(item)}>
                {item.icon}
                
                <Text style={{fontSize:10,
                    flex: 1,
                }} >{item.name}</Text>
                <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
        ) }
        />
        </View>
        <View style={{justifyContent: 'center', alignContent: 'center',
            alignItems: 'center',
        }}>
        </View>
    </View>
  )
}