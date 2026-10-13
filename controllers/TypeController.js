const {getAllTypesForTrainees, getAgeGroups, getOutputTypes, getTrainingProgramTypes} = require("../models/TypeModel");

const getAllTraineeTypes = async () =>{
    return await getAllTypesForTrainees();
}

const getAllAgeGroups = async () =>{
    return await getAgeGroups();
}

const getAllOutputTypes = async () =>{
    return await getOutputTypes();
}

const getAllTrainingProgramTypes = async () =>{
    return await getTrainingProgramTypes();
}

module.exports = {getAllTraineeTypes, getAllAgeGroups, getAllOutputTypes, getAllTrainingProgramTypes}