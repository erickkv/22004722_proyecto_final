let id = document.getElementById("id-prod");
let nombre = document.getElementById("nombre-prod");
let desc = document.getElementById("desc-prod");
let cat = document.getElementById("cat-prod");
let exist = document.getElementById("exist-prod");

window.comunicacion.enviarInfoProds(function(event, args) {
    id.value = args[0];
    nombre.value = args[1];
    desc.value = args[2];
    cat.value = args[3];
    exist.value = args[4];
})
