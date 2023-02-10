import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Link, Navigate, Outlet, useNavigate} from "react-router-dom";
import {EnumFirestore} from "../../types/type";
import {db} from "../../firebase/firebase-config";
import {auth,} from '../../firebase/firebase-config'
import {onAuthStateChanged, signOut} from "firebase/auth";
import {collection, query, where, getDocs} from "firebase/firestore";
import {getUser} from "../../features/user/userSlice";
import st from "../Layout/style.module.css";

const Out = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const userCollection = collection(db, EnumFirestore.USER)
    const {user} = useAppSelector(st => st.user)
    const [response, setResponse] = useState(false)
    const logOut = () => {
        signOut(auth)
        setResponse(false)
        navigate('/')

    }
    useEffect(() => {
        onAuthStateChanged(auth, async (obj: any) => {
            if (obj) {
                let q = query(userCollection, where('id', '==', obj.uid))
                let info = await getDocs(q)
                setResponse(true)
                if (info.size > 0) {
                    let myData = info.docs[0]
                    dispatch(getUser({...myData.data(), id: myData.id}))
                }
            } else {
                setResponse(true)
            }
        })
    }, [])
    if (response) {
        if ('id' in user) {
            return (
                <>

                    <nav className={"navbar navbar-dark bg-dark"}>
                        <ul className={st.ul_part}>
                            <li><Link to='/' style={{color: "white", textDecoration: "none",fontFamily:"cursive"}}>Home</Link></li>
                            <li><Link to='/addfilm' style={{color: "white", textDecoration: "none",fontFamily:"cursive"}}>Add Film</Link></li>

                        </ul>
                    </nav>
                    <>
                        <Outlet/>
                    </>
                </>
            );
        } else {
            return <Navigate to={'/'}/>
        }
    }
    return <>
    </>
}
export default Out;
