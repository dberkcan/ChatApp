import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

export default class Index extends Component {

  _handlSubmit = (values, {resetForm}) => {
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    const username = user.displayName;
    var database = firebase.database().ref('/rooms');
    database.push({
      name:values.name,
      userId,
      username
    }).then((result) => {
      resetForm({values:''});
      this.props.navigation.goBack();
    })
        .catch((error) => console.log(error));
  }

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <View style={{backgroundColor:'white', flex:1, alignItems:'center',paddingVertical:50}}>
          <View style={{alignItems:'center'}}>
            <Text style={styles.hero}>Chat Room</Text>
            <Text style={styles.hero_description}>Create a New Chat Room</Text>
          </View>
          <Formik
            initialValues={{
              name:''
            }}
            onSubmit={this._handlSubmit}
            validationSchema={
              Yup.object().shape({
                name:Yup.string().required("Name is required"),
              })
            }
          >
            {
              ({
                values,
                handleSubmit,
                isValid,
                isSubmitting,
                errors,
                handleChange
              }) => (
                      <View style={styles.form}>
                        <TextInput 
                          value={values.name}
                          onChangeText={handleChange('name')}
                          placeholder={"Chat Room Name"}
                          placeholderTextColor={"#302D4C"}
                          style={styles.input}/>
                        {(errors.name) && <Text style={styles.error}>{errors.name}</Text>}
                        <TouchableOpacity 
                          disabled={!isValid}
                          onPress={handleSubmit}
                          style={styles.button}>
                          <Text style={styles.button_text}>Create Room</Text>
                        </TouchableOpacity>
                    </View>
                    )
            }
          </Formik>
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  hero:{
    color:'#1C1939',
    fontWeight:'600',
    fontSize:40
  },
  hero_description:{
    color:'rgba(26,25,57,0.8)',
    fontSize:17,
    marginTop:15,
    fontWeight:'600'
  },
  form:{
    flex:1,
    marginTop:80
  },
  input:{
    backgroundColor:'#F7F7F7',
    padding: 15,
    width:300,
    height:50,
    borderRadius:10,
    paddingHorizontal:25,
    marginBottom:10
  },
  forgot:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginTop:10,
    color:'#706E83'
  },
  button:{
    backgroundColor:'#7165E3',
    padding:20,
    marginTop:40,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  button_text:{
    color:'white',
    fontWeight:'600',
    fontSize:18,
    textAlign:'center'
  },
  bottom:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:20
  },
  error:{
    color:'red'
  }
})



