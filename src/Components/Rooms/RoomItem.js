import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationService from '../NavigationService';

const RoomItem = ({ item }) => {
    return (
        <TouchableOpacity onPress={
            () => NavigationService.navigate('ChatRoomDetail', {
                id:item.id,
                name:item.name,
                roomUserId:item.userId
            })
        } style={styles.item}>
            <Icon name={'comments'} size={30} />
            <View style={{marginLeft:20}}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.createdUser}>{item.userName}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding:20,
        marginBottom:5,
        borderRadius:8,
        flexDirection:'row',
        alignItems:'center'
    },
    title:{
        fontSize:20,
        color:'black',
        fontWeight:'700'
    },
    createdUser:{
        fontSize:13,
        color:'#800000',
        marginTop:5,
        fontWeight:'700'
    }
})

export default RoomItem;
