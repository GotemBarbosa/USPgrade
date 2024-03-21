import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";


import {Subject as subjectInterface} from "../types/subject"
import SubjectCard from "../components/SubjectCard";



export default function Materias() {

    const [subjects, setSubjects] = useState([]);
    const [lastSemester, setLastSemester] = useState(""); //tirar depois que atualizar o server
    
    useEffect(()=>{
        const link = "http://localhost:3000/subjects";
        axios.get(link).then(response => setSubjects((response.data)))
    },[])

    return(
        <div className="h-full w-full">
            <Header page="Materias"/>
            <div>
                {/* Pegarei as materias vendo o semestre da materia anterior, o ideal é mudar o server para prover o que eu quero  aq */}
                {subjects.map((subject:subjectInterface)=>{
                    if(subject.Semester == "") setLastSemester(subject.Semester)
                    return(
                        <SubjectCard Subject={subject} key={subject.Code}/>           
                    )
                    
                    
                })}
            </div>
        </div>
    )
}