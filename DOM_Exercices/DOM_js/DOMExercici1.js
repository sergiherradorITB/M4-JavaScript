// DOMExercici1.js

function estiljs() {
    let element = document.getElementById("text");
    element.style.color = "blue";
    element.style.fontFamily = "Calibri";
    element.style.fontSize = "x-large";
}

// DOMExercici2.js

function prenValorForm(){
    let inputs = document.getElementsByTagName("input");
    let nomForm = inputs[0].value;
    let cognomForm = inputs[1].value;
    console.log(nomForm + " " + cognomForm)
}

// DOMExercici3.js

function ex3(){
    let element = document.getElementsByClassName("ex3");
    element[0].style.color = "blue";
    element[1].style.color = "violet";
    element[2].style.color = "pink";
}

// DOMExercici4.js

function obtenirAtributs(){
    let element = document.getElementById("itb");
    let attributes = element.attributes
    console.log(attributes)
}

// DOMExercici5.js

function insertarFila(){
    var row = document.getElementsByTagName("tbody")[0];
    var x = row.insertCell(-1);
    x.innerHTML="<tr><td>Fila hola </td> </tr>";
}