let id = document.getElementById("id-prod");
let nombre = document.getElementById("nombre-prod");
let proveedor = document.getElementById("proveedor");
let cant = document.getElementById("cant-pedido");

window.comunicacion.enviarInfoProds(function(event, args) {
    id.value = args[0][0];
    nombre.value = args[0][1];
})
