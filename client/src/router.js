import {Routes, Route, Navigate} from 'react-router-dom';
import {routes} from './routes'
import React from 'react';

const Router = () => {
    return (
        <Routes>
            {
                routes.map(k =>
                    <Route path={k.path} key={k.path} element={k.Element} />)}
            <Route path = '*' element={<Navigate to="/" replace/>} />
        </Routes>
    );
};

export default Router;
