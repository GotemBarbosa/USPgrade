import {Subject} from '../types/subject'

interface SubjectCardProps{
    Subject: Subject;

}

export default function SubjectCard({Subject}:SubjectCardProps){
    
    return(
        <div>
            <div>

            </div>
            <div>
                <p>
                    {Subject.Subject}
                </p>
                <p>
                    {Subject.Code}
                </p>
            </div>
        </div>
    )
}