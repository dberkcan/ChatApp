import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, FlatList, TextInput } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import database from '@react-native-firebase/database';
import RoomItem from '../../Components/Rooms/RoomItem';


export default class Index extends Component {

    constructor(){
        super();
        this.state = {
            rooms: []
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title:'Rooms',
            headerTitleStyle:{
                flex: 1,
                textAlign:'center',
                fontWeight: 'bold',
            },
            headerLeft:<TouchableOpacity onPress={() => navigation.navigate('ChatRoomCreate')} style={{marginLeft:15, padding: 5,}}><Icon name={"plus"} size={25}></Icon></TouchableOpacity>,
            headerRight:<TouchableOpacity onPress={() => {
                auth()
                    .signOut()
                    .then(() => {
                        navigation.navigate('Auth');
            });
            }} style={{marginRight:15,padding:5,}}><Icon name={"sign-out-alt"} size={30} /></TouchableOpacity>
        }
    }


    getData = () => {
        database()
            .ref('/rooms')
            .orderByChild('name')
            .on('value', snapshot => {
                var rooms= [];
                snapshot.forEach((item) => {
                    console.log(item)
                    rooms.push({
                        name:item.val().name,
                        userName:item.val().username,
                        userId:item.val().userId,
                        id:item.key
                    })
                })
                this.setState({rooms})
            });
    }


    componentDidMount(){
        const user = firebase.auth().currentUser;
        this.getData();
    }


    renderItem = ({ item }) => {
        return(
            <RoomItem item={item} />
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <FlatList
                    style={{flex:1, padding: 5,}}
                    data={this.state.rooms}
                    renderItem={this.renderItem}
                />
            </SafeAreaView>
        )
    }
}