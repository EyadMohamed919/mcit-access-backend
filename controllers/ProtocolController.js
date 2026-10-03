const {getAllProtocols} = require("../models/ProtocolModel");

const getAllProtocolsWithoutGovID = async ()=>{
    return protocols = await getAllProtocols();
};

module.exports =  {getAllProtocolsWithoutGovID}