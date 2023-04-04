const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const mysql = require('mysql2');

let dataProductos = [
    {id: 1, nombre: "jabón de manos", descripcion: "jabón de manos marca X", categoria: "higiene", existencias: 200},
    {id: 2, nombre: "pollo", descripcion: "pollo entero marca pio rey", categoria: "carnes", existencias: 25}
];

let usuarios = [
    {nombre: "usuario", password: "password"}
]

//crear conexion
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'usuario1',
    password: 'password',
    database: 'punto_de_venta'
});

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
    console.log(args)
    connection.promise()
            .execute(`SELECT * FROM usuarios WHERE nombre = '${args[0]}'`)
    .then(([results, fields])=>{
        console.log(results)
        console.log(fields)
        if(results.length == 1){
          return bcrypt.compare(args[1], results[0]['pass'])
        }
    })
    .then((result)=>{
        console.log(result)
        if(result){
            createWindowPrinc();
            ventana.close();
        }else{
            loginVentana.webContents.send('inicio-error','Error autenticando')
        }
    })
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
