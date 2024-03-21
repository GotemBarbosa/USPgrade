
interface HbuttonProps{
    name:string
    active?:boolean
    onClick?: (e:React.MouseEvent)=>void
}

export default function Hbutton({name, active, onClick}:HbuttonProps){
    return(
        <div className=" cursor-pointer flex flex-col w-min select-none" onClick={onClick}>
            <span className={`font-Montserrat ${active?'text-primary':'text-lightGray'} text-primary font-medium`}>{name}</span>
            
            {active?
            <div className="w-full h-1 bg-primary rounded-md"></div>:
            null}
        </div>
    )
}