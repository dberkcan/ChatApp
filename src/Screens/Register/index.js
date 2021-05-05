import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export default class Index extends Component {

  constructor(){
    super();
    this.state={
      checkbox:false,
      hidePassword:true
    }
  }
  componentDidMount(){
    
  }
  

  _handleSubmit = (values) => {
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName:values.name
        });
        this.props.navigation.navigate('App');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/weak-password'){
          alert('Weak Password');
        }

        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
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
            <Text style={styles.hero}>Welcome</Text>
            <Text style={styles.hero_description}>Please provide following details for your new account</Text>
          </View>
          <Formik
            initialValues={{
              name:'',
              email:'',
              password:'',
              passwordConfirm:''
            }}
            onSubmit={this._handleSubmit}
            validationSchema={
              Yup.object().shape({
                email:Yup.string().email().required('Email address is required'),
                password:Yup.string().min(6).required('Password is required'),
                passwordConfirm:Yup.string().oneOf([Yup.ref('password')], 'Passwords not matched').required("Password is required")
              })
            }
          >
            {
              ({  values, 
                  handleSubmit, 
                  isValid, 
                  isSubmitting, 
                  errors, 
                  handleChange
              }) => (
                  <View style={styles.form}>
                    <TextInput 
                      value={values.name}
                      placeholder={"Name"}
                      onChangeText={handleChange('name')}
                      placeholderTextColor={"#302D4C"}
                      style={styles.input}/>
                    {(errors.name) && <Text style={styles.error}>{errors.name}</Text>}
                    <TextInput 
                      value={values.email}
                      placeholder={"Email"}
                      keyboardType={"email-address"}
                      onChangeText={handleChange('email')}
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
                    <View>
                      <TextInput 
                        value={values.passwordConfirm}
                        onChangeText={handleChange('passwordConfirm')}
                        placeholder={"Password Confirmation"}
                        placeholderTextColor={"#302D4C"}
                        secureTextEntry={this.state.hidePassword}
                        style={styles.input}/>
                      {<Text style={styles.error}>{errors.passwordConfirm}</Text>}
                    </View>
                    <View style={styles.checkbox_area}>
                      <TouchableOpacity onPress={() => this.setState({checkbox:!this.state.checkbox})} style={styles.checkbox}>
                        {this.state.checkbox &&
                          <Text style={{fontSize:25}}>✓</Text>
                        }
                      </TouchableOpacity>
                      <View style={{marginLeft:10,flex:1, flexWrap:'nowrap'}}>
                        <Text style={styles.checkbox_text}>By creating your account you have to agree with our Teams and Conditions.</Text>
                      </View>
                    </View>
                    <TouchableOpacity 
                      disabled={!isValid || isSubmitting}
                      onPress={handleSubmit}
                      style={styles.button}>
                      <Text style={styles.button_text}>Sign up my Account</Text>
                    </TouchableOpacity>
                    <View style={styles.bottom}>
                      <Text style={{fontSize:17, color:'#302D4C'}}>Already have an account? - </Text>
                      <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Text style={{fontSize:17, fontWeight:'700', color:'#302D4C'}}>Sign In</Text>
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
    textAlign:'center',
    paddingHorizontal:70,
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
  checkbox_area:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:5
  },
  checkbox:{
    width:36,
    height:36,
    borderRadius:7,
    backgroundColor:"rgba(113,101,227,0.2)",
    borderWidth:1,
    borderColor:'#7165E3',
    justifyContent:'center',
    alignItems:'center'
  },
  checkbox_text:{
    color:'#656379'
  },
  error:{
    color:'red'
  }
})