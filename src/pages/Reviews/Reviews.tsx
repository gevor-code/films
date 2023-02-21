import st from "../Reviews/style.module.css";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {EnumFirestore} from "../../types/type";
import {useEffect} from "react";
import {getFeedBack} from "../../features/film/filmAPI";


const Reviews = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const feedback = useAppSelector((state: any) => state.film.feedback);

    useEffect(() => {
        if (id) {
            dispatch(getFeedBack({collectionName: EnumFirestore.FEEDBACK, id}));

        }
    }, [id]);

    return (
        <div className={st.background_div}>
            {feedback && feedback.map((elm: { comment: string; raiting: number, id: number }) => (
                <div key={elm.id}>
                    <div className={st.review_part}>
                        <h4><i className="fas fa-user-circle" style={{marginRight: "10px"}}></i>
                            {elm.comment}</h4>
                        <h4> {
                            [...Array(elm.raiting)].map((star, index) => (
                                <i key={index} className="fas fa-star" style={{color: "gold"}}></i>
                            ))
                        }</h4>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Reviews