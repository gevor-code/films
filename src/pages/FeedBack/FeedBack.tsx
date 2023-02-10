import React, {FormEvent, useEffect, useState} from 'react';
// @ts-ignore
import ReactStars from 'react-stars'
import st from "../FeedBack/style.module.css";
import {addNewData, getAllData} from "../../features/film/filmAPI";
import {EnumFirestore, TypeFirestore} from "../../types/type";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {auth} from "../../firebase/firebase-config";


const FeedBack = () => {
    const {id}=useParams()
    const {handleSubmit} = useForm<TypeFirestore>();
    const [star, setStar] = useState(0)
    const [text, setText] = useState('');
    const dispatch = useAppDispatch()
    const {film} = useAppSelector((state) => state.film);
    const {user} = useAppSelector((state) => state.user);
    const ratingChanged = (newRating: number) => {
        setStar(newRating)
    }
    useEffect(() => {
        dispatch(getAllData({collectionName: EnumFirestore.FILM}))

    }, []);
    const saveCom = (e: FormEvent) => {
        e.preventDefault()
        const obj={comment:text,
            raiting:star,
            filmId:id,
            userId:auth.currentUser?.uid
        }
        dispatch(
            addNewData({collectionName: EnumFirestore.FEEDBACK, obj:obj})
      )

    }
    return (
        <>
            <form onSubmit={saveCom}>
                <div className={st.feed_back}>
                    <textarea rows={5} cols={30} value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    <ReactStars count={5} onChange={ratingChanged} size={24} color2={'#ffd700'}/>
                    <button className={st.btn_more}>Enter</button>
                </div>
            </form>
        </>
    );
};

export default FeedBack;
