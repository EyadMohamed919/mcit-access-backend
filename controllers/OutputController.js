const {getAllOutputsByUserID, addOutput, deleteOutput} = require("../models/OutputModel");

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

const deleteOutputByID = async (req, res) =>{
    try {
        const {outputID} = req.body;
        await deleteOutput(outputID);
        res.redirect("/Outputs");
    } catch (error) {
        console.error("Failed to delete output:", error);
        res.status(500).send("خطأ أثناء حذف البيانات");
    }
}

module.exports = {getAllOutputs, addNewOutput, deleteOutputByID};