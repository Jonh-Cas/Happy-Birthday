import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import validateEmail from '../utils/validations';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from '../utils/firebase';

interface Props {
    changeForm: () => void;
}

interface formDataProps{
    email: string | undefined;
    password: string | undefined;
    repeatPassword: string | undefined;
}
interface formErrorProps {
    email: boolean,
    password: boolean,
    repeatPassword: boolean,
}

const initialFormData = {
    email: undefined,
    password: undefined,
    repeatPassword: undefined,
}
const initialError = {
    email: false,
    password: false,
    repeatPassword: false,
}

const RegisterForm = ({ changeForm }: Props) => {

    const [formData, setFormData] = useState<formDataProps>(initialFormData)
    const [formError, setFormError] = useState<formErrorProps>(initialError)
 

    const register = () => {

        let error: formErrorProps = initialError;

        if(!formData.email || !formData.password || !formData.repeatPassword ){
            if(!formData.email) error.email = true;
            else error.email = false;
            if(!formData.password) error.password = true;
            else error.password = false
            if(!formData.repeatPassword) error.repeatPassword = true;
            else error.repeatPassword = false
        }else if(!validateEmail(formData.email)){
            error.email = true
        }else if( formData.password !== formData.repeatPassword ){
            error.password = true
            error.repeatPassword = true
        }else if( formData.password.length < 6){
            error.password = true
            error.repeatPassword = true
        }else{
            error.email = false
            error.password = false
            error.repeatPassword = false
            createUserWithEmailAndPassword(authFirebase, formData.email, formData.password )
                .then( () => {
                    console.log('Cuenta creada')
                })
                .catch( () => {
                    error.email = true;
                    error.password = true;
                    error.repeatPassword = true;
                })
        }

        console.log('el error es  => ', error)
        setFormError({...error})
    }
    return (
        <>
            <TextInput
                placeholder='Correo electronico'
                placeholderTextColor='#969696'
                style={[styles.input, formError.email && styles.errorInput] }
                onChangeText={ (text) => setFormData({ ...formData, email: text }) }
            />
            <TextInput
                placeholder='Contraseña'
                placeholderTextColor='#969696'
                style={[styles.input, formError.password && styles.errorInput]}
                secureTextEntry
                onChangeText={ (text) => setFormData({ ...formData, password: text }) }
            />
            <TextInput
                placeholder='Repetir contraseña'
                placeholderTextColor='#969696'
                style={[styles.input, formError.repeatPassword && styles.errorInput]}
                secureTextEntry
                onChangeText={ (text) => setFormData({ ...formData, repeatPassword: text }) }
            />

            <Pressable
                onPress={register}
                style={{ ...styles.btnStyleReg }} >
                <Text style={{ color: '#fff', fontSize: 18, }} >Registarse</Text>
            </Pressable>

            <View style={styles.login} >
                <Pressable
                    onPress={changeForm}
                    style={{ ...styles.btnStyle }} >
                    <Text style={{ ...styles.btnText }} >Iniciar sesión</Text>
                </Pressable>
            </View>
        </>
    )
}

export default RegisterForm

const styles = StyleSheet.create({
    btnStyle: {
        padding: 14,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    btnStyleReg: {
        padding: 14,
        backgroundColor: '#5555ff',
        borderRadius: 8,
        marginBottom: 20,
       
    },

    btnText: {
        color: '#000',
        fontSize: 18,
    },

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
    login: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
    }, 

    errorInput:{
        borderColor: '#940c0c',
        borderWidth: 1,
    }
})