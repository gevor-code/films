import {storage} from "./firebase-config";
import {addDoc, collection} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db} from './firebase-config';
import {TypeFirestore} from "../types/type";


export const uploadFiles=async ({collectionName, obj}: TypeFirestore) => {
    if (obj.photo.length) {
        const storageRef = ref(storage, `files/${obj.photo[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, obj.photo[0]);
        uploadTask.on('state_changed',
            (snapshot) => {
            }, (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    delete obj.photo
                    const coll = collection(db, collectionName);
                    await addDoc(coll, {...obj,photo:downloadURL}).then(((r)=>{
                        console.log(r)
                    })).catch(((er)=>{
                        console.log(er)
                    }))
                });
            }
        );
    } else {
        delete obj.photo
        const coll = collection(db, collectionName);
        await addDoc(coll, db)
    }
}