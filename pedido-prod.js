let id = document.getElementById("id-prod");
let nombre = document.getElementById("nombre-prod");
let proveedor = document.querySelector("#proveedor");
let cant = document.getElementById("cant-pedido");
let pedidoBtn = document.getElementById("confirmar-pedido");
let adv = document.getElementById("adv");

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

pedidoBtn.addEventListener('click', () => {
    adv.innerHTML = "";
    if (!proveedor.value || proveedor.value === "null") {
        adv.innerHTML = 'Debe ingresar un proveedor';
    }
    else if (!cant.value || cant.value < 1) {
        adv.innerHTML = 'Deber ingresar una cantidad mayor a 0';
    }
    else if (!(Number.isInteger(Number(cant.value)))) {
        adv.innerHTML = "La cantidad debe ser un entero";
    }
    else {
        window.comunicacion.consultaPedido([id.value, proveedor.value, cant.value])
    }
})

window.comunicacion.errorPedido('errorPedido',function(event,args){
    adv.innerHTML = args
})
