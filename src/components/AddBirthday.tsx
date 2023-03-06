import { StyleSheet, View, TextInput, Text, Pressable } from 'react-native';
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { addDocCumples } from '../utils/firebase';


interface Props {

}

interface formDataProps {
    dateBirth: Date | undefined,
    name: string,
    lastNames: string,
}

const intialForm = {
    dateBirth: undefined,
    name: '',
    lastNames: '',
}

const AddBirthday = ({ }: Props) => {

    const [formData, setFormData] = useState<formDataProps>(intialForm)
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [formError, setFormError] = useState({
        name: false,
        lastNames: false,
        dateBirth: false,
    })

    const hideDatePicker = () => setIsDatePickerVisible(false);

    const handleConfirm = (date: Date) => {
        const dateBirth: Date = date;
        dateBirth.setHours(0);
        dateBirth.setMinutes(0);
        dateBirth.setSeconds(0);
        setFormData({ ...formData, dateBirth })
        console.log(moment(date).format('LL'))
        hideDatePicker()
    }

    const showDatePicker = () => {
        setIsDatePickerVisible(true)
    }

    const onChange = (text: string, type: string) => setFormData({...formData, [type]: text })  

    const onSubmit  = () => {
       let error = {
        name: false,
        lastNames: false,
        dateBirth: false,
       };
       if(!formData.name || !formData.lastNames || !formData.dateBirth || formData.dateBirth === undefined){
        if(!formData.name) error.name = true;
        if(!formData.lastNames) error.lastNames = true;
        if(!formData.dateBirth) error.dateBirth = true;
       }else{
        error.name = false;
        error.lastNames = false; 
        error.dateBirth = false;
        let data = formData;
        data.dateBirth?.setFullYear(0);
        addDocCumples(data)

       }
       setFormError(error)
    }

    return (
        <>
            <View style={styles.container} >
                <TextInput
                    placeholder='Nombre'
                    placeholderTextColor={'#969696'}
                    style={[styles.input, formError.name && { borderColor: '#940c0c' } ]}
                    onChangeText={ (text) => onChange(text, 'name') }
                    />
                <TextInput
                    placeholder='Apellidos'
                    placeholderTextColor={'#969696'}
                    style={[styles.input, formError.lastNames && { borderColor: '#940c0c' }  ]}
                    onChangeText={ (text) => onChange(text, 'lastNames') }
                />

                <Pressable
                    onPress={showDatePicker}
                    style={[styles.input, styles.datepicker, formError.dateBirth && { borderColor: '#940c0c' }]} >
                    <Text style={{
                        color: formData.dateBirth ? '#fff' : '#969696',
                        fontSize: 18,
                    }} >
                        {formData.dateBirth ? moment(formData.dateBirth).format('LL') : 'Fecha de nacimiento'}
                    </Text>
                </Pressable>
                <Pressable 
                    onPress={onSubmit}
                >
                    <Text style={styles.addButton } >Crear Cumpleaños </Text>
                </Pressable>

            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </>
    )
}

export default AddBirthday;

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#1e3040'
    },

    datepicker: {
        justifyContent: 'center'
    },

    textDate: {
        color: '#969696',
        fontSize: 18,
    },
    addButton: {
        fontSize: 18,
        color: '#fff',
    }

})