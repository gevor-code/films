import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {User} from '../../types/type'
import {useNavigate} from "react-router-dom";
import st from "../Singup/style.module.css";
import st2 from "../Singin/style.module.css";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/firebase-config";


const SingIn = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<User>()
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const loginUser = async (data: User) => {
        signInWithEmailAndPassword(auth, data.email, data.password).then((r) => {
            navigate("/addfilm")
        }).catch((err) => {
            setError(err.message)
        })
    }
    return (
        <>
            <div className={st2.back_log}>
                <div>
                    <form onSubmit={handleSubmit(loginUser)}>
                        {error && <p className={st2.log_error}>{error}</p>}
                        <div className={st2.log_div}>
                            <div className={st2.login_style}>
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
                                <button type="submit" className={st2.btn_log} style={{fontFamily: "cursive"}}>Log In
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SingIn;
