import MainProfesor from "./MainProfesor";
import MainStudent from "./MainStudent";
import { useState } from "react";
export default function MainPage(props) {
    const isProfessor = props.isProfessor;
    const userId = props.userId;
    if(isProfessor) {
        return <MainProfesor userId={userId}/>
    }
    else {
        return <MainStudent userId={userId}/>
    }
}