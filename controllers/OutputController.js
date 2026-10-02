const {getAllOutputsByUserID} = require("../models/OutputsModel");

const getAllOutputs = async (projectID)=>{
    const outputs = await getAllOutputsByUserID(projectID);
    return outputs;
}

module.exports = {getAllOutputs};