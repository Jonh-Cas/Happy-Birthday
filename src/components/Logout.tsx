import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { signOut } from "firebase/auth";
import { authFirebase } from '../utils/firebase';

interface Props {

}

const Logout = ({ }: Props) => {

    const logout = () => signOut(authFirebase)
 

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
      <Text style={{ color: '#fff' }} >Estas Loageado</Text>
      <Pressable 
      onPress={logout}
      style={{ ...styles.btnStyle  }} >
        <Text style={{ color: '#fff',  }} >Cerrar sesión</Text>
      </Pressable>
    </View>
  )
}

export default Logout;

const styles = StyleSheet.create({
    btnStyle: {
        padding:15, 
        backgroundColor: '#5555ff', 
        borderRadius: 8, 
        width: '60%', 
        alignItems: 'center', 
        justifyContent: 'center',
    }
})