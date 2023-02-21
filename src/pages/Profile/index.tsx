import React, {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {getUser} from "../../features/user/userSlice";
import {EnumFirestore} from "../../types/type";
import st from "../Profile/style.module.css";
import {updateUser} from "../../features/user/userAPI";

const Profile = () => {
    const {user}: { user: any } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [newUser, setNewUser] = useState<any>({});

    useEffect(() => {
        if (!user) {
            // @ts-ignore
            dispatch(getUser({collectionName: EnumFirestore.USER}))
        }
    }, [])

    const handleChange = (e: any) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(updateUser({obj: {...newUser}, id: user.id, collectionName: EnumFirestore.USER}))

    }

    return (
        <>
            {user.id && (
                <div className={st.profile_div}>
                    <h3 className={st.info_prof}>Profile Information</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={st.bg_div}>
                            <div className={st.info_part}>
                                <span className={st.name_part}>Username: </span>
                                <input type="text" name="name" value={newUser.name || user.name}
                                       onChange={handleChange}/>
                            </div>
                            <div className={st.info_part}>
                                <span className={st.name_part}>Surname: </span>
                                <input type="text" name="surname" value={newUser.surname || user.surname}
                                       onChange={handleChange}/>
                            </div>
                            <div className={st.info_part}>
                                <span className={st.name_part}>Age: </span>
                                <input type="text" name="age" value={newUser.age || user.age} onChange={handleChange}/>
                            </div>
                            <div className={st.info_part}>
                                <span className={st.name_part}>Gender: </span>
                                <input type="text" name="gender" value={newUser.gender || user.gender}
                                       onChange={handleChange}/>
                            </div>
                            <div className={st.info_part}>
                                <span className={st.name_part}>Phone: </span>
                                <input type="text" name="phone" value={newUser.phone || user.phone}
                                       onChange={handleChange}/>
                            </div>
                            <br/>
                            <div className={st.changes_div}>
                                <button type="submit" className={st.save_changes}>Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            )
            }
        </>
    );
};
export default Profile