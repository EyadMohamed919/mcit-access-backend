const express = require("express");
const router = express.Router();
const path = require("path");
const os = require("os");
const {getAllProjects} = require("../controllers/ProjectController");

function getPrimaryLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    const virtualKeywords = ['vbox', 'vmware', 'wsl', 'hyper-v', 'virtual', 'vethernet'];

    let fallbackIp = null;

    for (const interfaceName in interfaces) {
        const lowerName = interfaceName.toLowerCase();
        const isVirtual = virtualKeywords.some(keyword => lowerName.includes(keyword));

        for (const layer of interfaces[interfaceName]) {
            const isIPv4 = layer.family === 'IPv4' || layer.family === 4;

            if (isIPv4 && !layer.internal) {
                if (!isVirtual) {
                    return layer.address;
                }
                if (!fallbackIp) {
                    fallbackIp = layer.address;
                }
            }
        }
    }

    return fallbackIp || '127.0.0.1';
}

const requireAuth = (req, res, next) => {
    if (req.session.username) {
        next();
    } else {
        res.redirect("/");
    }
};
router.get("/", (req, res)=>{
    hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    res.render("Login", {
        title: "Login Page",
        username: "Eyad",
        host:hostData
    });

    
});

router.get("/Dashboard", requireAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const projects = await getAllProjects(req.session.user_id);
    console.log("This is projects: " + projects);
    res.render("Dashboard", {
        title: "Dashboard Page",
        username: req.session.username,
        id: req.session.user_id,
        host: hostData,
        projects:projects,
        stats: {
            totalEvents: 20,
            totalTrainees: 3400
        }
    });
});

module.exports = router;


        