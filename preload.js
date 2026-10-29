const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectDbLocation: () => ipcRenderer.invoke('select-db-location'),
    restartApp: () => ipcRenderer.invoke('restart-app')
});