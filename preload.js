const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld (
    'comunicacion',
    {
        //para cargar página principal
        registroValido: (datos) => ipcRenderer.send('registroValido', datos),

        usuarioValido: (callback) => ipcRenderer.on('usuarioValido', callback),

        enviarDatosProds : (callback) => ipcRenderer.on('enviarDatosProds', callback),

        //para editar productos
        editarProductoValido: (datos) => ipcRenderer.send('editarProductoValido', datos),

        //para hacer pedidos
        hacerPedido: (datos) => ipcRenderer.send('hacerPedido', datos),

        //enviar info de productos en editar o en pedidos
        enviarInfoProds: (callback) => ipcRenderer.on('enviarInfoProds', callback)
    }
)
