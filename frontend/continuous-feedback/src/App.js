import logo from './logo.svg';
import './index.css';
import { BrowserRouter as Router, Link, Route, Routes, BrowserRouter } from 'react-router-dom';

import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainPage from './pages/Main/MainPage';
import Footer from './components/Footer/Footer';
import { useState } from "react";
import ListaFeedback from './pages/Feedback/ListaFeedback';
import ListaPrezenta from './pages/Prezenta/ListaPrezenta';
import FeedbackStudent from './pages/Feedback/FeedbackStudent';
import ProfilePage from './pages/Profile/Profile';

function App() {
  const [isProfessor, setIsProfessor] = useState(false);
  function changeProfessorState() {
    setIsProfessor(!isProfessor);
  }

  return (
    <>
        <MenuAppBar isProfessor={isProfessor}/>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/" element={<ProtectedRoute/>}>
            <Route path="/" element={<MainPage isProfessor={isProfessor}/>}></Route>
          </Route>

          <Route path="/creareActivitate" element={<ProtectedRoute/>}>
            <Route path="/creareActivitate" element={<MainPage isProfessor={isProfessor} isCreate={true}/>} />
          </Route>

          <Route path="/listaActivitati" element={<ProtectedRoute/>}>
            <Route path="/listaActivitati" element={<MainPage isProfessor={isProfessor} isCreate={false}/>} />
          </Route>

          <Route path="/conectareActivitate" element={<ProtectedRoute/>}>
            <Route path="/conectareActivitate" element={<MainPage isProfessor={isProfessor}/>}/>
          </Route>

          <Route path="/listaFeedback" element={<ProtectedRoute/>} >
            <Route path=":idProfesor/:idActivitate" element={<ListaFeedback/>}/>
          </Route>

          <Route path="/listaPrezenta" element={<ProtectedRoute/>} >
            <Route path=":idActivitate" element={<ListaPrezenta/>}/>
          </Route>

          <Route path="/feedbackActivitate" element={<ProtectedRoute/>} >
            <Route path=":idActivitate" element={<FeedbackStudent isProfessor={isProfessor}/>}/>
          </Route>
          
          <Route path="/profile" element={<ProtectedRoute/>} >
            <Route path=":idUser" element={<ProfilePage isProfessor={isProfessor}/>}/>
          </Route>
        </Routes>
        <Footer/>
    </>
  );
}

export default App;
