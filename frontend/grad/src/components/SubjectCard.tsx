import {Subject} from '../types/subject'

interface SubjectCardProps{
    Subject: Subject,
    status ?:string
}


export default function SubjectCard({Subject, status}:SubjectCardProps){
    let obrigatority = false;

    if(Subject.Type == "Disciplinas Obrigatórias"){
        obrigatority = true
    }

    return(
        <div className={`${status == "completed"?'bg-primary':'bg-white'} shadow-lg w-28 h-28 rounded-xl relative cursor-pointer select-none`}>        
            <div className={`w-3 h-3 rounded-full ${obrigatority?'bg-purple':'bg-darkGray'} absolute top-2 left-2 flex items-center justify-center`}>
                <div className={`w-2 h-2 rounded-full ${status == "completed"?(obrigatority?"bg-purple":"bg-darkGray"):'bg-white'}`}/>
            </div>
            {
                status == "attending"?
                    <div className={`w-3 h-3 rounded-full bg-yellow absolute top-2 right-2 flex items-center justify-center`}>
                        <div className={`w-2 h-2 rounded-full 'bg-white'`}/>
                    </div>
                :null
            }

            <div className='h-[54%]'>

            </div>
            <div className='flex flex-col items-center w-full'>
                <p className={`font-Montserrat font-bold w-full text-center ${status == "completed"?'text-white':'text-black'}  ${Subject.Subject.length < 20 ?'text-[0.75rem]':'text-[0.72rem]'}`}
                    title={Subject.Subject}>
                    
                    {Subject.Subject.length > 25? Subject.Subject.substring(0,24)+"...":Subject.Subject}
                    
                </p>
                <p className={`font-Inter font-bold ${status == "completed"?'text-background':'text-gray'} text-[0.60rem]`}>
                    {Subject.Code}
                </p>
            </div>
        </div>
    )
}