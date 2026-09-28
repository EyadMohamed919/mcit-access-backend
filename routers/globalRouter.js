const express = require("express");
const router = express.Router();
const path = require("path");
const os = require("os");

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


router.get("/", (req, res)=>{
    hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    res.render("Login", {
        title: "Login Page",
        username: "Eyad",
        host:hostData
    });

    
});

router.get("/Dashboard", (req, res)=>{
    hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    res.render("Dashboard", {
        title: "Login Page",
        username: "Eyad",
        host:hostData
    });

    
});

module.exports = router;


        