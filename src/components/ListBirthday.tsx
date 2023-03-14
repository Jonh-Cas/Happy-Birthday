import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logout from './Logout';
import ActionBar from './ActionBar';
import AddBirthday from './AddBirthday';
import { User } from 'firebase/auth';
import { deleteCumple, getCollection } from '../utils/firestore';
import moment from 'moment';
import { ListNextProps } from './intListNextBirthday';
import Birthday from './Birthday';

export interface ListProps {
    name: string,
    lastNames: string,
    id: string,
    dateBirth: Date
}

interface Props {
    user: User
}

const ListBirthday = ({ user }: Props) => {

    const [showList, setShowList] = useState(true);
    const [birthday, setBirthday] = useState<ListNextProps[]>()
    const [pasatBirthday, setPasatBirthday] = useState<ListNextProps[]>()
 

    const saveCollections = async () => {
        try {
            const resp = await getCollection(user.uid) as ListNextProps[];
            const currentDate = moment().set({
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            let birthdayTempArray: ListNextProps[] = [];
            let pasatBirthdayTempArray: ListNextProps[] = [];

            resp.forEach(element => {

                const dateBirth = new Date(element.dateBirth.seconds * 1000)
                const dateBirthday = moment(dateBirth)
                const currentYear = moment().get('year');
                dateBirthday.set({ year: currentYear });

                const diffDate = currentDate.diff(dateBirthday, 'days')
                const elementTemp = element;

                if (diffDate <= 0) {
                    birthdayTempArray = [ 
                        ...birthdayTempArray,
                        elementTemp
                    ];

                } else {
                    pasatBirthdayTempArray = [
                        ...pasatBirthdayTempArray,
                        elementTemp
                    ];
                }

            })

            setBirthday(birthdayTempArray)
            setPasatBirthday(pasatBirthdayTempArray)

        } catch (error) {
            console.log('la respuesta es => ', error)
        }
    }

    const deleteBirthday = (birthday: ListNextProps) => {
        Alert.alert(
            'Eliminar cumpleaños',
            `Estas seguro de eliminar el cumpleaños de ${birthday.name} ${birthday.lastNames}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel', 
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        deleteCumple( user.uid, birthday.id )
                        setShowList(false)
                    }
                }
            ],
            {
                cancelable: false,
            }
        )
    }

    useEffect(() => {
        saveCollections()
    }, [showList]);

    console.log('El birthday => ', birthday)
    console.log('El pasatBirthday => ', pasatBirthday)

    return (
        <View style={styles.container} >
            {
                showList ? (
                    <ScrollView style={{ ...styles.scrollview }} >
                        {
                            birthday?.map((item, index) => (
                                <Birthday key={index} birthday={item} deleteBirthday={deleteBirthday} />
                            ))
                        }
                        {
                            pasatBirthday?.map( (item, index) => (
                                <Birthday key={index} birthday={item} deleteBirthday={deleteBirthday} />
                            ))
                        }
                    </ScrollView>
                ) : (
                    <AddBirthday user={user} setShowList={setShowList} />
                )

            }

            <ActionBar showList={showList} setShowList={setShowList} />

        </View>
    )
}

export default ListBirthday;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
    },

    scrollview: {
        marginBottom: 50,
        width: '100%'
    }
})