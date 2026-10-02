const express = require("express")
const router = express.Router();
const {addNewProjects, deleteProjectByID} = require("../controllers/ProjectController");

router.post("/AddProject", async (req, res)=>{
    try {
        const userId = req.session ? req.session.user_id : null;
        const success = await addNewProjects(req.body, userId);
        if(success.success)
        {
            req.session.errorMessage = null;
            res.redirect('/Dashboard');
        }
        else
        {
            req.session.errorMessage = success.message;
            res.redirect('/AddProject');
        }
    } catch (error) {
        console.log(error);
    }
    
});

router.post("/DeleteProject", deleteProjectByID)

module.exports = router;

