import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const Auth = () => {
    const [isLoging, setIsLoging] = useState(true)

    const changeForm = () =>  {
      setIsLoging(!isLoging)
    }

  return (
    <View style={styles.view } >
        <Image 
            source={require('../assets/logo.png')}
            style={styles.logo}
        />
      {
        isLoging
        ? ( <LoginForm  changeForm={changeForm} /> )
        : ( <RegisterForm changeForm={changeForm} /> )
      }

    </View>
  )
}

export default Auth;
const styles  = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: "80%",
        height: 240,
        marginTop: 50,
        marginBottom: 50,
    }
 })