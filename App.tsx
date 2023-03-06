import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import {authFirebase} from './src/utils/firebase'
import { User } from "firebase/auth";
import Auth from './src/components/Auth';
import ListBirthday from './src/components/ListBirthday';


const App = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    authFirebase.onAuthStateChanged( (response) => {
      console.log('el response es  => ', response)
      setUser(response)
    } )

    return () => {
    }
  }, [])

  if (user === undefined) return null;

  return (
    <>
    <StatusBar barStyle='light-content' />
    <SafeAreaView style={{ ...styles.background }} >
      {
        user
        ? <ListBirthday />
        : <Auth />
      }
      
    </SafeAreaView>
      </>
  )
}

export default App;

const styles = StyleSheet.create({
  
  background: {
    backgroundColor: '#15212b',
    flex: 1,
  }

})