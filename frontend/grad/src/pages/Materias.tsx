import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";


import {Subject as subjectInterface} from "../types/subject"
import {subjectBySemester} from "../types/semesterSubjects"
import SubjectCard from "../components/SubjectCard";



export default function Materias() {

    const [subjects, setSubjects] = useState([]);
    
    useEffect(()=>{
        const link = "http://localhost:3000/subjects/semester";
        axios.get(link).then(response => setSubjects((response.data)))
    },[])

    return(
        <div className="h-full w-full bg-background">
            <Header page="Materias"/>
            <div className="w-full">
               {subjects.map((semester:subjectBySemester, keyVal:number)=>(
                <div key={keyVal} className="w-full">
                    <p className="font-Montserrat text-darkGray font-semibold my-10">{semester.title}</p>
                    <div className="flex flex-row md:gap-5 gap-3 flex-wrap">
                        {
                            semester.data.map((subject:subjectInterface, key:number)=>(
                                <div className="" key={key}>
                                    <SubjectCard Subject={subject} key={key} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                
               ))}
            </div>
        </div>
    )
}