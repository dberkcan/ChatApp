import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, TextInput, StyleSheet } from 'react-native';
import Message from '../../../Components/Rooms/Message';
import io from 'socket.io-client';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import { measure } from 'react-native-reanimated';

const connectionConfig = {
    jsonp:false,
    reconnection:true,
    reconnectionDelay:100,
    reconnectionAttempts:1000,
    transports:['websocket']
}

var socket = io("http://192.168.1.105:3000", connectionConfig);

export default class Index extends Component {


    constructor(props) {
        super(props);
        this.state = {
            messages:[],
            text:'',
            connectedUserCount:0
        }
    }


    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name"),
            headerTitleStyle:{
                textAlign:'center',
                fontWeight: 'bold',
            },
            headerRight:(navigation.getParam("userId") == navigation.getParam("roomUserId")) ? <TouchableOpacity onPress={navigation.getParam("_handleDelete")} style={{marginRight:15, padding:5,}}><Icon name={"trash"} size={17} color={"red"}></Icon></TouchableOpacity> : null
        }
    }

    _handleDelete = async () => {
        const roomId = this.props.navigation.getParam("id")
        await database()
            .ref('/rooms/' + roomId)
            .remove();
        await database()
            .ref('/messages/' + roomId)
            .remove();
        this.props.navigation.goBack()
    }

    componentDidMount() {
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        this.props.navigation.setParams({userId, _handleDelete:this._handleDelete})
        const roomId = this.props.navigation.getParam("id");
        socket.emit('connection-room', { roomId })
        socket.on('connection-room-view', (data) => {
            this.setState({
                connectedUserCount:data.count
            })
        })

        database()
            .ref(`messages/${roomId}`)
            .on('value', snapshot => {
                var messages= [];
                snapshot.forEach((item) => {
                    console.log(item)
                    messages.push({
                        roomId:item.val().roomId,
                        text:item.val().text,
                        userName:item.val().username,
                        userId:item.val().userId,
                        id:item.key
                    })
                })
                this.setState({messages})
            });


    }


    renderItem = ({ item, index }) => {
        return <Message item={item} index={index} />
    }

    componentWillUnmount(){
        socket.emit('leave-room', {roomId: this.props.navigation.getParam("id")})
    }


    handleSend = () => {
        const { text } = this.state;
        const roomId = this.props.navigation.getParam("id");


        const user = firebase.auth().currentUser;
        const userId = user.uid;
        const username = user.displayName;
        var database = firebase.database().ref(`messages/${roomId}`);
        database.push({
            roomId,
            text,
            userId,
            username
        }).then((result) => {
            this.setState({text:''})
        })
            .catch((error) => console.log(error));



    }


  render() {
      const { text, messages, connectedUserCount} = this.state;
    return (
      <SafeAreaView style={{flex:1}}>
          <View style={{ padding:10, backgroundColor:'#ddd', justifyContent:'center', alignItems:'center'}}>
              <Text>Connected Users : {connectedUserCount} </Text>
          </View>
          <FlatList
            inverted
            ref={(ref) => this.flatListRef = ref}
            data={messages.reverse()}
            renderItem={this.renderItem}
            style={styles.flatlist}/>
          <View style={styles.input_area}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TextInput 
                    value={text}
                    onChangeText={(text) => this.setState({text})}
                    style={styles.input}
                    placeholder={"Writing..."}
                />
                <TouchableOpacity onPress={this.handleSend}>
                    <Icon style={{marginLeft:10}} color={"#30B485"} name={"paper-plane"} size={25} />
                </TouchableOpacity>
              </View>
          </View>
      </SafeAreaView>
    );
  }
}


const styles= StyleSheet.create({
    flatlist:{
        flex:1,
        padding: 15,
        backgroundColor:'#F7F9FA'
    },
    input_area:{
        flexDirection:'column',
        justifyContent:'flex-end',
        padding: 10,
    },
    input:{
        flex: 1,
        borderWidth:1,
        borderColor:'#ddd',
        height:40,
        backgroundColor:'white',
        paddingLeft:15,
        color:'black'

    }
})
