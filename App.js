import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PushNotification from "react-native-push-notification";
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging';
import NavigationService from './src/Components/NavigationService';
import Route from "./src/Route";


export default class App extends Component {
  constructor(props) {
    super(props);
    //this.createDefaultChannel();
  }
  /*
  componentDidMount(){
    firebase.messaging().registerDeviceForRemoteMessages().then((res) => console.log(res)).catch((e) => console.log(e))
    firebase.messaging().hasPermission()
      .then((enabled) => {
        firebase.messaging().getToken().then(token => console.log(token))
      })
    messaging().onMessage(data => {
      PushNotification.localNotification({
        channelId:"default-channel-id",
        title:data.notification.title,
        message:data.notification.body
      })
    })

    PushNotification.localNotification({
      channelId:"default-channel-id",
      title:"test",
      message:"sadasd"
    })
  }

  createDefaultChannel(){
    PushNotification.createChannel({
      channelId:"default-channel-id",
      channelName:"default channel"
    })
  }
*/
  render() {
    return <Route
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
    }}
    />
    
  }
}

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  senderId:"922355485942",

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
