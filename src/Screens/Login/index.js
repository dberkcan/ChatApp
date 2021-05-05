import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';

export default class Index extends Component {

  constructor(){
    super();
    this.state = {
      hidePassword:true
    }
  }

  _handlSubmit = (values) => {
    auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(() => {
          this.props.navigation.navigate('App');
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            alert('Wrong Password');
            return;
          }

          if (error.code === 'auth/user-not-found') {
            alert('User Not Found');
            return;
          }

          console.error(error);
        });
  }

  render() {
    return (
      <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <ScrollView>
        <View style={{backgroundColor:'white', flex:1, alignItems:'center',paddingVertical:50}}>
          <View style={{alignItems:'center'}}>
            <Text style={styles.hero}>Welcome Back!</Text>
            <Text style={styles.hero_description}>Sign in to continue</Text>
          </View>
          <Formik
            initialValues={{
              email:'',
              password:''
            }}
            onSubmit={this._handlSubmit}
            validationSchema={
              Yup.object().shape({
                email:Yup.string().email().required("Email address is required"),
                password:Yup.string().required('Password is required')
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
                        value={values.email}
                        onChangeText={handleChange('email')}
                        placeholder={"Email"}
                        keyboardType={"email-address"}
                        placeholderTextColor={"#302D4C"}
                        style={styles.input}/>
                      {(errors.email) && <Text style={styles.error}>{errors.email}</Text>}
                      <View>
                      <TextInput 
                        value={values.password}
                        onChangeText={handleChange('password')}
                        placeholder={"Password"}
                        placeholderTextColor={"#302D4C"}
                        secureTextEntry={this.state.hidePassword}
                        style={styles.input}/>
                      <TouchableOpacity onPress={() => this.setState({hidePassword:!this.state.hidePassword})} style={{position:'absolute', right:15,top:15}}>
                        <Icon name={(this.state.hidePassword) ? "eye-slash" : 'eye'} size={20}/>
                      </TouchableOpacity>
                      {(errors.password) && <Text style={styles.error}>{errors.password}</Text>}
                      </View>
                      <TouchableOpacity style={styles.forgot}>
                        <Text>Forgot Password?</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        disabled={!isValid || isSubmitting}
                        onPress={handleSubmit}
                        style={styles.button}>
                        <Text style={styles.button_text}>Sign In My Account</Text>
                      </TouchableOpacity>
                      <View style={styles.bottom}>
                        <Text style={{fontSize:17, color:'#302D4C'}}>Don´t have an account? - </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                          <Text style={{fontSize:17, fontWeight:'700', color:'#302D4C'}}>Sign Up</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    )
            }
          </Formik>
        </View>
        </ScrollView>
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