import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import GlobalStyles from './Components/Styles/Global';
import { useDispatch, useSelector } from 'react-redux'
import NotLoggedin from './Pages/NotLoggedin';
import LoggedIn from './Pages/LoggedIn';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from './redux/user/userActions';

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchData())
  },[])
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route element={<NotLoggedin />}>
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
        <Route element={<LoggedIn />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer position='bottom-right'/>
    </>
  );
}

export default App;