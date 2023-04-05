const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

/* let dataProductos = [
    {id: 1, nombre: "jabón de manos", descripcion: "jabón de manos marca X", categoria: "higiene", existencias: 200},
    {id: 2, nombre: "pollo", descripcion: "pollo entero marca pio rey", categoria: "carnes", existencias: 25}
]; */

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
    ventanaPrinc.loadFile('principal.html');

    connection.promise()
        .execute(`SELECT prod.cod, prod.nombre, prod.descripcion, cat.nombre_categoria, prod.existencias, SUM(peds.cant) AS cant_pedida
                    FROM productos AS prod
                    LEFT JOIN categorias AS cat ON cat.cod = prod.cod_cat
                    LEFT JOIN pedidos AS peds ON peds.cod_prod = prod.cod
                    GROUP BY prod.cod`)
    .then(([results, fields])=>{
        ventanaPrinc.webContents.on('did-finish-load',()=>{
            ventanaPrinc.webContents.send('enviarDatosProds', results)
        })
    })
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

function createventanaHacerPedido(datos) {
    ventanaHacerPedido = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    ventanaHacerPedido.loadFile('pedido-prod.html');
    ventanaHacerPedido.webContents.on('did-finish-load', function() {
        ventanaHacerPedido.webContents.send('enviarInfoProds', datos)
    });
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
            ventana.webContents.send('usuarioValido', false)
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
    console.log(args)
    connection.promise()
            .execute(`SELECT provs.nombre AS nombre_proveedor
            FROM proveedores AS provs
            JOIN provs_prods AS pp ON provs.id = pp.id_prov
            JOIN productos AS prods ON pp.cod_prod = prods.cod
            WHERE prods.nombre = '${args[1]}'`)
    .then(([results, fields])=>{
        console.log(results)
        createventanaHacerPedido([args,results])
        ventanaPrinc.close();
    });
});

ipcMain.on('consultaPedido', function (event,args) {
    let proveedor;
    console.log(args)
    connection.promise()
            .execute(`SELECT provs.nombre, peds.cod_prod, peds.cant
                        FROM proveedores AS provs
                        JOIN pedidos AS peds ON peds.id_prov = provs.id
                        WHERE provs.nombre = ? AND peds.cod_prod = ?`, [args[1], args[0]])
    .then(([results, fields])=>{
        console.log(results)
        if(results.length > 0){
          console.log("ya hay")
          ventanaHacerPedido.webContents.send('errorPedido', 'No puede hacer pedido al proveedor seleccionado porque ' +
          'ya tiene un pedido de este producto')
        }
        else {
            connection.promise()
                .execute(`SELECT id FROM proveedores WHERE nombre = ?`, [args[1]])
            .then(([resultado, campos])=>{
                proveedor = resultado[0].id;
            })
            .then(() => {
                connection.promise().execute(`INSERT INTO pedidos (cod_prod, id_prov, cant)
                    values (?, ?, ?)`, [args[0], proveedor, args[2]])
            })
            .then(() => {
                createWindowPrinc();
                ventanaHacerPedido.close()
            })

        }
    })
})

app.whenReady().then(createWindow)
