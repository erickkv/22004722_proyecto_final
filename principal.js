let table = document.getElementById("tabla-prods");
let cells = table.getElementsByTagName('td');
let botonEditar = document.getElementById("editarBtn");
let botonPedir = document.getElementById("pedirBtn");
let adv = document.getElementById("adv");

let currId = "";
let currNombre = "";
let currDesc = "";
let currCat = "";
let currExist = "";

let data = [];

window.comunicacion.enviarDatosProds(function(event, dataProductos) {
    data = dataProductos;
    populateTable();
    for (let i = 0; i < cells.length; i++) {
        // Take each cell
        let cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function () {
            // Get the row id where the cell exists
            let rowId = this.parentNode.rowIndex;

            let rowsNotSelected = table.getElementsByTagName('tr');
            for (let row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            let rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "rgb(206, 201, 201)";
            rowSelected.className += " selected";

            currId = rowSelected.cells[0].innerHTML;
            currNombre = rowSelected.cells[1].innerHTML;
            currDesc = rowSelected.cells[2].innerHTML;
            currCat = rowSelected.cells[3].innerHTML;
            currExist = rowSelected.cells[4].innerHTML;
        }
    }
})

/* populateTable(); */


botonEditar.addEventListener('click', function(evento) {
    evento.preventDefault();
    adv.innerHTML = "";
    if (currId === "") {
        adv.innerHTML = "Debe seleccionar un producto"
    } else {
        window.comunicacion.editarProductoValido([currId, currNombre, currDesc, currCat, currExist]);
    }
})

botonPedir.addEventListener('click', function(evento) {
    evento.preventDefault();
    adv.innerHTML = "";
    if (currId === "") {
        adv.innerHTML = "Debe seleccionar un producto"
    } else {
        window.comunicacion.hacerPedido([currId, currNombre, currDesc, currCat, currExist]);
    }
})

function populateTable(){
    let table = "" ;

        for(let i in data){
            table += "<tr>";
            table += "<td>"+ data[i].cod +"</td>"
                    + "<td>" + data[i].nombre +"</td>"
                    + "<td>" + data[i].descripcion +"</td>"
                    + "<td>" + data[i].nombre_categoria +"</td>"
                    if (data[i].cant_pedida) {
                        table += "<td>" + data[i].existencias + "("+ data[i].cant_pedida + ")" +"</td>" ;
                    } else {
                        table += "<td>" + data[i].existencias +"</td>" ;
                    }

            table += "</tr>";
        }

    document.getElementById("tableData").innerHTML = table;

}
