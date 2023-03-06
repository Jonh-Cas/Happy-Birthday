import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import validateEmail from '../utils/validations';
import {authFirebase} from '../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface Props {
  changeForm: () => void;
}

const initialValue = {
  email: '',
  password: '',
}

const LoginForm = ({ changeForm }: Props) => {

  const [formData, setFormData] = useState(initialValue);
  const [formError, setFormError] = useState({
    email: false,
    password: false,
  })

  const login = () => {
    let error = {
      email: false,
      password: false,
    };
    if(!formData.email || !formData.password ){
      if(!formData.email) error.email = true;
      if(!formData.password) error.password = true;
    }else if( !validateEmail(formData.email) ){
      error.email = true
    }else{
      error.email = false;
      error.password = false;
      signInWithEmailAndPassword(authFirebase, formData.email, formData.password)
      .then( () => { 
        console.log('Ok')
      })
      .catch( () => { 
        setFormError({
          email: true,
          password: true,
        })
      })
    }
    setFormError(error)
  }

  const onChange = (text: string, type: string) =>
    setFormData({ ...formData, [type]: text })



  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error ] }
        placeholder='Correo electronico'
        placeholderTextColor='#969696'
        onChangeText={(text) => onChange(text, 'email')}
      />

      <TextInput
        style={[ styles.input, formError.password && styles.error ] }
        placeholder='Contraseña'
        placeholderTextColor='#969696'
        secureTextEntry
        onChangeText={(text) => onChange(text, 'password')}
      />

      <Pressable
        onPress={login}
        style={{ padding: 15, backgroundColor: '#5555ff', borderRadius: 8 }} >
        <Text style={{ ...styles.btntext }} >Iniciar sesión</Text>
      </Pressable>

      <View style={styles.register} >
        <Pressable
          onPress={changeForm}
          style={{ padding: 15, backgroundColor: '#fff', borderRadius: 8 }} >
          <Text style={{ ...styles.btntext, color: '#000' }} >Registrate</Text>
        </Pressable>
      </View>
    </>
  )
}

export default LoginForm;

const styles = StyleSheet.create({
  input: {
    height: 40,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',

  },
  btntext: {
    color: '#fff',
    fontSize: 18,
  },

  register: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },

  error:{
    borderColor: '#940c0c',
  }

})