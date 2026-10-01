const {getAllOutputsByUserID} = require("../models/OutputsModel");

const getAllOutputs = async (userID)=>{
    const outputs = await getAllOutputsByUserID(userID);
    return outputs;
}

module.exports = {getAllOutputs};