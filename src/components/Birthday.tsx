import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { ListNextProps } from './intListNextBirthday';
import moment from 'moment';

interface Props {
  key: number;
  birthday: ListNextProps,
  deleteBirthday: ( birthday: ListNextProps ) => void;
}

const Birthday = ({ birthday, deleteBirthday }: Props) => {
  const currentDate = moment().set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  const dateBirth = new Date(birthday.dateBirth.seconds * 1000)
  const dateBirthday = moment(dateBirth)
  const currentYear = moment().get('year');
  dateBirthday.set({ year: currentYear });

  const diffDate = currentDate.diff(dateBirthday, 'days')

  const past = diffDate > 0 ? true : false

  const InfoDate = () => {

    if (diffDate === 0) {
      return <Text style={{ color: '#fff' }} >Es su cumpleaños</Text>
    }
    else {
      const days = -diffDate;
      return (
        <View style={styles.textCurrent} >

          <Text>{days} {days === 1 ? 'dia' : 'dias'}</Text>
        </View>
      )
    }
  }

  return (
    <Pressable 
    onPress={ () => deleteBirthday(birthday) }
    style={[{ ...styles.card },
    past ? styles.past : (diffDate === 0)
      ? styles.actual : styles.current]} >
      <Text style={{
        ...styles.userName,
        color: past ? '#fff' :
          diffDate === 0
            ? '#fff' : '#000',
      }} >{birthday.name} {birthday.lastNames}</Text>
      {
        past
          ? <Text style={{ color: '#fff' }} >Pasado</Text>
          : <InfoDate />
      }
    </Pressable>
  )
}

export default Birthday;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },

  past: {
    backgroundColor: '#820000',
  },

  actual: {
    backgroundColor: '#559204',
  },

  current: {
    backgroundColor: '#1ae1f2',
  },
  userName: {
    fontSize: 16,
  },
  textCurrent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  }

})