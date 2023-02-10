import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getDataById} from "../../features/film/filmAPI";
import {EnumFirestore, Film} from "../../types/type";
import st from "../FilmDetails/style.module.css";
import {useParams} from "react-router-dom";
import FeedBack from "../FeedBack/FeedBack";


const FilmDetails = () => {

    const {id}=useParams()
    const dispatch = useAppDispatch()
    const { film } = useAppSelector((state) => state.film) as unknown as { film: Film };

    useEffect(() => {
        if (id) {
            dispatch(getDataById({ collectionName: EnumFirestore.FILM, id: id }));
        }
    }, [id, dispatch]);

    return (
        <div className={st.info_div}>
            <br/>
            {id ? (
                <>
                    <div className={st.more_details}>
                        <div>
                        <h5 className="card-text">Actors:<span className={st.text_part}>{film?.actors}</span> </h5>
                        <h5 className="card-text">Producer: <span className={st.text_part}>{film?.producer}</span></h5>
                        <h6 className="card-text">Description: <span className={st.text_part}>{film?.description}</span></h6>
                        </div>
                  <div>
                      <FeedBack/>
                  </div>
                    </div>

                </>
            ) : (
                <p>No film ID found</p>
            )}
        </div>
    );
};

export default FilmDetails;
