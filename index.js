let nombre = document.getElementById("nombre-login");
let password = document.getElementById("pass-login");
let adv1 = document.getElementById("adv1");
let adv2 = document.getElementById("adv2");
let formulario = document.getElementById("login");

formulario.addEventListener('submit', function(evento) {
    adv1.innerHTML = "";
    adv2.innerHTML = "";
    evento.preventDefault();
    let error = 0;
    if (nombre.value === "") {
        adv1.innerHTML ='debe introducir nombre';
        error = 1;
    }
    if (password.value === "") {
        adv2.innerHTML = 'debe introducir una contraseña'
        error = 1;
    }
    if (error === 0) {
        window.comunicacion.registroValido([nombre.value, password.value]);
        window.comunicacion.usuarioValido(function(event, test) {
            if (test === false) {
                adv1.innerHTML = 'el nombre de usuario o la contraseña no es correcto, por favor verífique sus datos';
            }
        });
    }
 })
