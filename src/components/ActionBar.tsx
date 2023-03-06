import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch } from 'react'
import { signOut } from 'firebase/auth'
import { authFirebase } from '../utils/firebase'

interface Props {
    showList: boolean;
    setShowList: React.Dispatch<React.SetStateAction<boolean>>
}

const ActionBar = ({ showList, setShowList}: Props) => {
    return (
        <View style={styles.viewFooter} >
            <Pressable 
                onPress={() => signOut(authFirebase ) }
            style={styles.viewClose } >
                <Text style={styles.text} >Cerrar Sessión</Text>
            </Pressable>
            <Pressable 
                onPress={() => setShowList(!showList)}
            style={styles.viewAdd } >
                <Text style={styles.text} >
                { showList ? 'Nueva Fecha' : 'Cancelar fecha' }
                </Text>
            </Pressable>

        </View>
    )
}

export default ActionBar

const styles = StyleSheet.create({
    viewFooter: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 20,
    }, 
    viewClose:{
        backgroundColor: '#820000',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
    }, 

    viewAdd:{
        backgroundColor: '#1ea1f2',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },

    text:{
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
})  