import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {EnumFirestore, Film} from "../../types/type";
import {delFilm, getAllData} from "../../features/film/filmAPI";
import st from "../ShowFilms/style.module.css";
import {Link} from 'react-router-dom';
import {getUser} from "../../features/user/userSlice";

const ShowFilms = () => {
    const dispatch = useAppDispatch()
    const {films} = useAppSelector((state) => state.film);
    const {user}=useAppSelector((state)=>state.user)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFilms = films.slice(startIndex, endIndex);

    useEffect(() => {
        if (!user) {
            // @ts-ignore
            dispatch(getUser({collectionName:EnumFirestore.USER}))
        }
        // @ts-ignore
        dispatch(getAllData({collectionName: EnumFirestore.FILM}))
    }, [])
    const del = (id: string | undefined): void => {
        dispatch(delFilm({collectionName: EnumFirestore.FILM, id: id})).unwrap().then((r) => {
            dispatch(getAllData({collectionName: EnumFirestore.FILM}))
        })
    }
    return (
        <>
            <div className={st.card_div}>
                <div className={st.first_part}>
                {currentFilms.map((film: Film) => (
                    <div className={st.films_div} key={film.id}>
                        <div className={st.hover_div} style={{backgroundImage: `URL(${film.photo})`}}>
                            <div className={st.card_body}>
                                <p className="card-text">Genre: {film.genre}</p>
                                <p className="card-text">Year: {film.year}</p>
                                <Link to={'film/' + film.id} className={st.learn_more}>
                                    Learn More
                                </Link>
                                <Link to={'film/reviews/' + film.id} className={st.learn_more}>
                                    Reviews
                                </Link>

                                <button className={st.btn_del} onClick={() => del(film.id)}>
                                    Delete
                                </button>
                            </div>
                            <div className={st.card_body2}>
                                <h5 className={st.film_name}> {film.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                <div className="pagination">
                    {currentPage !== 1 && (
                        <button onClick={() => setCurrentPage(currentPage - 1)} className={st.next_prev}><span className="text"></span><span>Prev</span></button>
                    )}
                    {currentPage !== Math.ceil(films.length / itemsPerPage) && (
                        <button onClick={() => setCurrentPage(currentPage + 1)} className={st.next_prev}><span className="text"></span><span>Next</span></button>
                    )}
                </div>
            </div>
        </>
    );
};

export default ShowFilms;
