const {getAllTypesForTrainees, getAgeGroups} = require("../models/TypeModel");

const getAllTraineeTypes = async () =>{
    return await getAllTypesForTrainees();
}

const getAllAgeGroups = async () =>{
    return await getAgeGroups();
}

module.exports = {getAllTraineeTypes, getAllAgeGroups}