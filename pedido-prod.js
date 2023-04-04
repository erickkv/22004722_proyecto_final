let id = document.getElementById("id-prod");
let nombre = document.getElementById("nombre-prod");
let proveedor = document.getElementById("proveedor");
let cant = document.getElementById("cant-pedido");

window.comunicacion.enviarInfoProds(function(event, args) {
    id.value = args[0][0];
    nombre.value = args[0][1];
    let proveedores = args[1];
    proveedores.forEach(element => {
        let opcion = document.createElement('option')
        opcion.setAttribute('value',element['nombre_proveedor']);
        opcion.text = element['nombre_proveedor'];
        proveedor.add(opcion);
    });
})
