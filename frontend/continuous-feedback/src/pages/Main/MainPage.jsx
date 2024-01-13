import MainProfesor from "./MainProfesor";
import MainStudent from "./MainStudent";
import { useState } from "react";
export default function MainPage(props) {
    const isProfessor = props.isProfessor;
    const isCreate = props.isCreate;
    if(isProfessor) {
        return <MainProfesor isCreate={isCreate}/>
    }
    else {
        return <MainStudent/>
    }
}