import { SemesterCodeNameMapper } from "./semester.constant"
import { TSemester } from "./semester.interface"
import { Semester } from "./semester.model";

const createSemesterIntoDB = async(semesterData:TSemester) =>{
    if(SemesterCodeNameMapper[semesterData.name]!==semesterData.code){
        throw new Error("Invalid semester code");
    }
    const result = await Semester.create(semesterData);
    return result;

}
const  getAllSemestersFromDB = async() =>{
    const result = await Semester.find()
}

const getSingleSemesterFromDB = async(id:string)=>{
    const result = await Semester.findById(id);
    return result;
}

const updateSingleSemesterIntoDB = async(id:string, updateData:Partial<TSemester>)=>{
    
    if(updateData.name&&updateData.code&&SemesterCodeNameMapper[updateData.name]!==updateData.code){
        throw new Error("Invalid semester code");
    }
    const result = Semester.findOneAndUpdate({_id:id},updateData,{new:true});
    return result;
}





export const SemesterServices = {
    createSemesterIntoDB,
    getAllSemestersFromDB,
    getSingleSemesterFromDB,
    updateSingleSemesterIntoDB
}