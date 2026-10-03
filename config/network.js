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

module.exports = {getPrimaryLocalIpAddress};