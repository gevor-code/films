import st from "../Reviews/style.module.css";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {EnumFirestore} from "../../types/type";
import {useEffect} from "react";
import {getFeedBack} from "../../features/film/filmAPI";

const Reviews = () => {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const feedback = useAppSelector((state: any) => state.film.feedback);

    useEffect(() => {
        if (id) {
            dispatch(getFeedBack({ collectionName: EnumFirestore.FEEDBACK, id }));
        }
    }, [id, dispatch]);

    return (
        <div>
            <h1>Reviews</h1>
            {feedback ? (
                <>
                    <p>Comment: {feedback.text}</p>
                    <p>Stars: {feedback.stars}</p>
                </>
            ) : (
                <p>No feedback found</p>
            )}
        </div>
    );
}
export default Reviews