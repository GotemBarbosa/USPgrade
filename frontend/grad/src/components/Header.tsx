import React, { useState } from "react";
import Hbutton from "./HeaderButton";
import { useNavigate } from "react-router-dom";

interface HeaderProps{
    page: string;
}

export default function Header({page}:HeaderProps){

    const [activeButton, setActiveButon] = useState(page); //it could have no useState, just props.
    const navigate = useNavigate();
    
    const handleClick = (e : React.MouseEvent,text:string)=> {
        e.stopPropagation();
        setActiveButon(text); 
        navigate("/"+text, { replace: true });
    }

    return(
        <div className="flex flex-col-reverse  md:flex-row">
            <div>
                {/* titulo! */}
            </div>
            <div className="flex gap-4 md:gap-10">
                <Hbutton name="Materias" active={activeButton == "Materias"} onClick={(e)=>{handleClick(e,'Materias')}}/>
                <Hbutton name="Progresso" active={activeButton == "Progresso"} onClick={(e)=>{handleClick(e,'Progresso')}} />
                <Hbutton name="Conquista" active={activeButton == "Conquista"} onClick={(e)=>{handleClick(e,'Conquista')}}/>
                <Hbutton name="Mapa" active={activeButton == "Mapa"} onClick={(e)=>{handleClick(e,'Mapa')}}/>
            </div>            
        </div>
    )
}