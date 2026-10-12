const {getAllTypesForTrainees} = require("../models/TypeModel");

const getAllTraineeTypes = async () =>{
    return await getAllTypesForTrainees();
}

module.exports = {getAllTraineeTypes}