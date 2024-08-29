import { TSemester } from "../semester/semester.interface";
import { User } from "./user.model";

const findLastStudentId = async()=>{
    const lastStudent = await User.findOne(
        {
            role:'student',
        },
        {
            id:1,
            _id:0
        }
    ).sort({
        createdAt:-1
    })

    return lastStudent?.id ? lastStudent.id:'';
};


export const generateStudentId = async(semesterData:any) =>{
    
    let currentId = (0).toString().padStart(4,'0');
    const lastStudentId = await findLastStudentId();
    const lastStudentSemesterCode = lastStudentId?.substring(4,6);
    const lastStudentYear = lastStudentId.substring(0,4);
    const currentStudentSemesterCode = semesterData.code;
    const currentYear = semesterData.year;    
    
    if(lastStudentId && lastStudentSemesterCode === currentStudentSemesterCode && lastStudentYear === currentYear){

        currentId = lastStudentId.substring(6);
    }
    
    let incrementId = (Number(currentId)+1).toString().padStart(4,'0');
    incrementId = `${semesterData.year}${semesterData.code}${incrementId}`;
    return incrementId;
}