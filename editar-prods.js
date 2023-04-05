let id = document.getElementById("id-prod");
let nombre = document.getElementById("nombre-prod");
let desc = document.getElementById("desc-prod");
let cat = document.getElementById("cat-prod");
let exist = document.getElementById("exist-prod");
let descartarBtn = document.getElementById("descartarBtn");
let editarBtn = document.getElementById("editarBtn");


window.comunicacion.enviarInfoProds(function(event, args) {
    id.value = args[0];
    nombre.value = args[1];
    desc.value = args[2];
    cat.value = args[3];
    exist.value = args[4];
})

descartarBtn.addEventListener('click', function(){
    window.comunicacion.descartarCambios();
})

editarBtn.addEventListener('click', () => {
    adv.innerHTML = "";
    if (!desc.value || desc.value === "") {
        adv.innerHTML = 'Debe ingresar una descripcion';
    }
    else if (!nombre.value || nombre.value === "") {
        adv.innerHTML = 'Deber ingresar un nombre para el producto';
    }
    else if (!exist.value || exist.value === "") {
        adv.innerHTML = 'Deber ingresar una cantidad de existencias';
    }
    else if (!(Number.isInteger(Number(exist.value)))) {
        adv.innerHTML = "La cantidad debe ser un entero";
    }
    else {
        window.comunicacion.editarInfo([id.value, nombre.value, desc.value, exist.value])
    }
})
