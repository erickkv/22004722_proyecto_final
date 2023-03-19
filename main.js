const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

let dataProductos = [
    {id: 1, nombre: "jabón de manos", descripcion: "jabón de manos marca X", categoria: "higiene", existencias: 200},
    {id: 2, nombre: "pollo", descripcion: "pollo entero marca pio rey", categoria: "carnes", existencias: 25}
];

let usuarios = [
    {nombre: "usuario", password: "password"}
]

let ventana;

function createWindow() {
    ventana = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    ventana.loadFile('index.html')
}

//para ventana principal donde se muestran los productos en existencia
let ventanaPrinc;

function createWindowPrinc() {
    ventanaPrinc = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    ventanaPrinc.loadFile('principal.html')
}

//para ventana de edición de información de productos
let ventanaEditarProd;

function createventanaEditarProd() {
    ventanaEditarProd = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    ventanaEditarProd.loadFile('editar-prods.html')
}

//para ventana de pedidos
let ventanaHacerPedido;

function createventanaHacerPedido() {
    ventanaHacerPedido = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    ventanaHacerPedido.loadFile('pedido-prod.html')
}


//comunicación entre electron y el main

ipcMain.on('registroValido', function(event, args) {
    let test = false;
    for (user of usuarios) {
        if (user.nombre === args[0] && user.password === args[1]) {
            test = true;
            ventana.webContents.send('usuarioValido', test);
            createWindowPrinc();
            ventanaPrinc.webContents.on('did-finish-load', function() {
                ventanaPrinc.webContents.send('enviarDatosProds', dataProductos)
            });
            return;
        }
    }
    if (test === false) {
        ventana.webContents.send('usuarioValido', test)
    }
});

//cargar ventana para editar productos
ipcMain.on('editarProductoValido', function(event, args) {
    createventanaEditarProd();
    ventanaEditarProd.webContents.on('did-finish-load', function() {
        ventanaEditarProd.webContents.send('enviarInfoProds', args)
    });
});

//cargar ventana para hacer pedido
ipcMain.on('hacerPedido', function(event, args) {
    createventanaHacerPedido();
    ventanaHacerPedido.webContents.on('did-finish-load', function() {
        ventanaHacerPedido.webContents.send('enviarInfoProds', args)
    });
});


app.whenReady().then(createWindow)
