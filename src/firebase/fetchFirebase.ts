import {TypeFirestore} from "../types/type";
import {addDoc, collection, doc, getDocs, deleteDoc, getDoc, query, where, updateDoc} from "firebase/firestore";
import {db} from "./firebase-config";


export const addData = async ({collectionName, obj}: any) => {
    const coll = collection(db, collectionName)
    await addDoc(coll, obj)
    return "Data added"
}
export const getData = async ({collectionName}: TypeFirestore) => {
    const coll = collection(db, collectionName)
    const info = await getDocs(coll)
    return info.docs.map((elm) => {
        return {...elm.data(), id: elm.id}
    })
}
export const deleteFilm = async ({collectionName, id}: any) => {
    const info = await doc(db, collectionName, id)
    await deleteDoc(doc(db, collectionName, id))
    return "Delete Data..."
}
export const getItem = async ({collectionName, id}: any) => {
    const info = await doc(db, collectionName, id)
    const data = await (await getDoc(info)).data()
    return {...data, id: info.id}
}


export const getFb = async ({collectionName, id}: any) => {
    const coll = collection(db, collectionName)
    const info = await getDocs(query(coll,where('filmId','==',id)))
    return info.docs.map((elm)=> ({...elm.data(),id:elm.id})
    )
}
export const updateData=async({collectionName,id,obj}:any)=>{
    const coll= collection(db,collectionName)
    const info=await doc(db,collectionName,id)
    await updateDoc(info,obj).then(r=>{
    }).catch((er)=>{
    })
    return 'data updated'
}
