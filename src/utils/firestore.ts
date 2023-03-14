import { addDoc, collection, deleteDoc, deleteField, doc, getDocs, initializeFirestore, updateDoc } from "firebase/firestore";
import { Dispatch } from "react";
import { ListProps } from "../components/ListBirthday";
import { firebaseApp } from "./firebase";
import { addDocCumplesProps } from "./intFirebases";

const db = initializeFirestore(firebaseApp, {
    experimentalForceLongPolling: true,
});

// Crea un una coleccion y los datos la guarda en firestore
const addDocCumples = (
    key: string,
    data: addDocCumplesProps,
    setShowList: Dispatch<React.SetStateAction<boolean>>) => {

    addDoc(collection(db, key), { ...data })
        .then(resp => {
            console.log('La resp es => ', resp)
            setShowList(true)
        })
        .catch(error => {
            console.log('El error es  => ', { error })
        })
}

//Toma las Collecciones de la base de datos del usuario y las guarda
const getCollection = async (key: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let birthday: ListProps[] = [];
            let resp = await getDocs(collection(db, key))
            resp.docs.forEach(element => {
                let data = element.data();
                data = { ...data, id: element.id }
                birthday = [
                    ...birthday,
                    data
                ] as ListProps[];
                // console.log('El birthday es  => ', birthday)
            })

            resolve(birthday as ListProps[]);

        } catch (error) {
            console.log('El error de colecction es  => ', { error })
            reject(error)
        }
    })

}

//borra un cumpleaños de la base de datos de firebase
//key es el user.id del usuario o de la coleccion; 
//id es el id del documento  
const deleteCumple = async( key: string, id: string ) => {
    try {
        const cumpleRef = await deleteDoc(doc(db, key, id));
        console.log('el cumple fue borrado', cumpleRef)
    } catch (error) {
        console.log('el error es =>', error)
        
    }
   
}


export {
    addDocCumples,
    getCollection,
    deleteCumple,
}