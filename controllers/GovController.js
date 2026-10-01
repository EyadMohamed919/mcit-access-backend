const {getAllGovs} = require("../models/GovModel");

const getAllGovernorates = async ()=>{
    const governorates = await getAllGovs();
    return governorates;
}

module.exports = {getAllGovernorates};