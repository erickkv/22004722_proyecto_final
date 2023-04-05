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
        enviarInfoProds: (callback) => ipcRenderer.on('enviarInfoProds', callback),

        //consulta de pedidos a main, para hacer query de lista pedidos
        consultaPedido: (datos) => ipcRenderer.send('consultaPedido', datos),

        //eror si ya hay pedido de un producto para el proveedor
        errorPedido: (canal, callback) =>ipcRenderer.on('errorPedido',callback)
    }
)
