const {getAllOutputsByUserID, addOutput} = require("../models/OutputsModel");

const getAllOutputs = async (projectID)=>{
    const outputs = await getAllOutputsByUserID(projectID);
    return outputs;
}

const addNewOutput = async (req, res) => {
    try {
        await addOutput(req.body);
        res.redirect("/Outputs");
    } catch (error) {
        console.error("Failed to add Output:", error.message);
        res.status(500).send("خطأ في حفظ المخرج");
    }
};

module.exports = {getAllOutputs, addNewOutput};