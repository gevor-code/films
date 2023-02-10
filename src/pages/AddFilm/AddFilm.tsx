import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {EnumFirestore, Film} from "../../types/type";
import st2 from "../Singin/style.module.css";
import st from "../Singup/style.module.css";
import st3 from '../AddFilm/style.module.css'
import {addDoc, collection, updateDoc, doc} from "firebase/firestore";
import {auth, db, storage} from "../../firebase/firebase-config";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";


const AddFilm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<Film>()
    const [error, setError] = useState(null)
    const userCollection = collection(db, EnumFirestore.FILM)

    const photoPart = async (movie: Film,userId:string ) => {
        let x = await addDoc(userCollection, {...movie, photo: [],userId})
        let arr: any = [];
        for (let e of movie.photo) {
            const storageRef = ref(storage, `files/${e.name}`);
            const uploadTask = uploadBytesResumable(storageRef, e)
            uploadTask.on('state_changed',
                null,
                null,
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log(downloadURL)
                        arr.push(downloadURL);
                        await updateDoc(doc(userCollection, x.id), {photo: arr})
                    })
                }
            )
        }
    }
    const addMovie = async (movie: Film) => {
        console.log(movie)
        const userId = auth.currentUser?.uid;
        if (!userId) {
            // @ts-ignore
            setError('Error: No film is currently add');
            return;
        }

        try {
            await photoPart(movie,userId)

        } catch (err) {
            // @ts-ignore
            setError(`Error: ${err.message}`);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit(addMovie)}>
                {error && <p className={st2.log_error}>{error}</p>}
                <div className={st3.back_film}>
                    <div className={st3.add_main}>
                        <div className={st3.add_first}>
                            <div>
                                <label className="form-label">Enter Name</label>
                                <input type="text" className="form-control"
                                       placeholder={"Name..."} {...register("name", {
                                    required: true,
                                    pattern: /\w/,
                                })}  />
                                {errors.name && <p className={st.error_message}>Enter Current Name</p>}
                            </div>

                            <div>
                                <label className="form-label">Enter Year</label>
                                <input type="number" className="form-control"
                                       placeholder={"Year..."}{...register("year", {
                                    required: true,
                                    pattern: /^\d+$/,
                                    min: 2009,
                                    max: 2023,
                                })} />
                                {errors.year && <p className={st.error_message}> Enter Current Year</p>}
                            </div>

                            <div>
                                <label className="form-label">Enter Genre</label>
                                <input type="text" className="form-control"
                                       placeholder={"Genre..."} {...register("genre", {
                                    required: true,
                                    pattern: /\w/,
                                })}  />
                                {errors.genre && <p className={st.error_message}>Enter Current Genre</p>}
                            </div>

                            <div>
                                <label className="form-label">Enter Description</label>
                                <input type="text" className="form-control"
                                       placeholder={"Description..."} {...register("description", {
                                    required: true,
                                    pattern: /\w/,
                                })}  />
                                {errors.description && <p className={st.error_message}>Enter Current Description</p>}
                            </div>

                        </div>
                        <div className={st3.add_second}>
                            <div>
                                <label className="form-label">Enter Actors</label>
                                <input type="text" className="form-control"
                                       placeholder={"Actors..."} {...register("actors", {
                                    required: true,
                                    pattern: /\w/,
                                })}  />
                                {errors.actors && <p className={st.error_message}>Enter Current Actors</p>}
                            </div>

                            <div>
                                <label className="form-label">Enter Producer</label>
                                <input type="text" className="form-control"
                                       placeholder={"Producer..."} {...register("producer", {
                                    required: true,
                                    pattern: /\w/,
                                })}  />
                                {errors.producer && <p className={st.error_message}>Enter Current Producer</p>}
                            </div>

                            <div>
                                <label className="form-label">Enter Country</label>
                                <input type="text" className="form-control"
                                       placeholder={"Country..."} {...register("country", {
                                    required: true,
                                    pattern: /\w/,
                                })}  />
                                {errors.country && <p className={st.error_message}>Enter Current Country</p>}
                            </div>

                            <div>
                                <label className="form-label">Enter Photo</label>
                                <input type="file" className="form-control"
                                       placeholder={"Country..."} {...register("photo")}/>
                            </div>
                        </div>
                    </div>

                    <div className={st3.btn_div}>
                        <button className={st3.add_btn}>Submit</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddFilm;
