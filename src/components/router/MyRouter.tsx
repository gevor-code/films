import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../Layout";
import SingIn from "../../pages/Singin";
import SingUp from "../../pages/Singup";
import Out from "../Out";
import Profile from "../../pages/Profile";
import AddFilm from "../../pages/AddFilm/AddFilm";
import ShowFilms from "../../pages/ShowFilms/ShowFilms";
import FilmDetails from "../../pages/FilmDetails/FilmDetails";
import Reviews from "../../pages/Reviews/Reviews";


const MyRouter = (): JSX.Element => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Out />}>
                        <Route path="/" element={<ShowFilms />} />
                        <Route path="/singin" element={<SingIn />} />
                        <Route path="/singup" element={<SingUp />} />

                        <Route path="/profile" element={<Profile />} />
                        <Route path='/addfilm' element={<AddFilm />} />
                        <Route path='/film/:id' element={<FilmDetails />} />
                        <Route path='/film/reviews/:id' element={<Reviews />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default MyRouter;
