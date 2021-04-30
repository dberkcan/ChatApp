import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from '@react-native-firebase/app';
const Message = ({item, index}) => {
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    return (
        <View style={(userId != item.userId) ? styles.other : styles.me}>
            <View style={[styles.bubble, {backgroundColor:(userId != item.userId) ? '#EAEAEA' : '#30B485'}]}>
                <Text style={{ fontSize:11, color:(userId != item.userId) ? '#575757' : 'black'}}>{item.userName}</Text>
                <Text style={{ fontSize:17, color:(userId != item.userId) ? '#575757' : 'white'}}>{item.text}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    other:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-start'

    },
    me:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-end',
    },
    bubble:{
        padding: 20,
        width:150,
        marginBottom:10,
        borderRadius:30
    }
})


export default Message;
