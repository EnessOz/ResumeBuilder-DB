import React from 'react'
import { Pdf } from '../pages/pdf'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/homePage'
import { LoginPage } from '../pages/loginPage'
import ProtectedRoute from './ProtectedRoute'
import RegisterPage from '../pages/registerPage'
import InputPage from '../pages/inputPage'
import { MyResumes } from '../pages/myResumes'



export const RouteComp = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/pdf' element={<Pdf />}></Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path='/cv-input' element={<InputPage />} />
            </Route>
            <Route path='/myResumes' element={<MyResumes />}></Route>
        </Routes>
    )
}
