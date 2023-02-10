import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import st from "./style.module.css"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {EnumFirestore, User} from "../../types/type"
import {db} from "../../firebase/firebase-config";
import {collection, addDoc} from 'firebase/firestore';
import {auth} from '../../firebase/firebase-config'
import {createUserWithEmailAndPassword} from 'firebase/auth'

const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<User>();
    const [error, setError] = useState<string>('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userCollection = collection(db, EnumFirestore.USER)
    const save = async (data: User) => {
        createUserWithEmailAndPassword(auth, data.email, data.password).then(async (r) => {
            await addDoc(userCollection, {
                id: r.user.uid,
                name: data.name,
                surname: data.surname,
                age: data.age,
                gender: data.gender,
                phone: data.phone

            })
            setError('')
            navigate('/')
        }).catch((err) => {
            setError(err.message)
        })
    }

    return (
        <>
            <div className={st.background_part}>
                <div className={st.main_div}>
                    <form onSubmit={handleSubmit(save)} className={st.form_part}>
                        {error !== '' ? <p>{error}</p> : ''}
                        <div className={st.reg_div}>
                            <div>
                                <label className="form-label">Enter Name</label>
                                <input type="text" className="form-control"
                                       placeholder={"Name..."} {...register("name", {required: true, pattern: /\w/})}/>
                                {errors.name && <p className={st.error_message}>Enter Current Name</p>}
                            </div>
                            <div>
                                <label className="form-label">Enter Surname</label>
                                <input type="text" className="form-control"
                                       placeholder={"Surname..."} {...register("surname", {
                                    required: true,
                                    pattern: /\w/
                                })}/>
                                {errors.surname && <p className={st.error_message}>Enter Current Surname</p>}
                            </div>

                            <div>
                                <label className="form-label">Enter Age</label>
                                <input type="number" className="form-control"
                                       placeholder={"Age..."}{...register("age", {
                                    required: true,
                                    pattern: /\w/,
                                    min: 1,
                                    max: 99,
                                })} />
                                {errors.age && <p className={st.error_message}> Enter Current Age</p>}
                            </div>

                            <div>
                                <label className="form-label">Enter Email</label>
                                <input type="text" className="form-control"
                                       placeholder={"Email..."} {...register("email", {
                                    required: true,
                                    pattern: /\w/,
                                })}  />
                                {errors.email && <p className={st.error_message}>Enter Current Email</p>}
                            </div>

                            <div>
                                <label className="form-label">Enter Password</label>
                                <input type="password" className="form-control"
                                       placeholder={"Password..."} {...register("password", {
                                    required: true,
                                    pattern: /\w/,
                                })} />
                                {errors.password && <p className={st.error_message}>Enter Current Password</p>}
                            </div>
                            <div className={st.radio_part}>
                                <p>Select your gender:</p>
                                <div className={st.radio_div}>
                                    <div>
                                        <label htmlFor="male">Male</label>
                                        <input type="radio" value="male" id="male" {...register('gender')}/>
                                    </div>
                                    <div>
                                        <label htmlFor="female">Female</label>
                                        <input type="radio" value="female" id="female" {...register('gender')}/>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="form-label">Enter Phone</label>
                                <input type="text" className="form-control"
                                       placeholder={"Phone..."} {...register("phone", {
                                    required: true,
                                    pattern: /\w/
                                })}/>
                                {errors.phone && <p className={st.error_message}>Enter Current Phone</p>}

                            </div>
                        </div>

                        <div className={st.btn_part}>
                            <button type="submit" className={st.btn_smb} style={{fontFamily: "cursive"}}>Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>


    );
};

export default SignUp;
