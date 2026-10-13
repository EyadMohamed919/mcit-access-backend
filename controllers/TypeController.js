const {getAllTypesForTrainees, getAgeGroups, getOutputTypes} = require("../models/TypeModel");

const getAllTraineeTypes = async () =>{
    return await getAllTypesForTrainees();
}

const getAllAgeGroups = async () =>{
    return await getAgeGroups();
}

const getAllOutputTypes = async () =>{
    return await getOutputTypes();
}

module.exports = {getAllTraineeTypes, getAllAgeGroups, getAllOutputTypes}