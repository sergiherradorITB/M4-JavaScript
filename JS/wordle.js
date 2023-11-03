// Variables globales
const maxIteracion = 5; // Número de filas en la sección RESULT
let numeroSecreto = generarNumeroSecreto(); // Genera un número secreto aleatorio
let iteracion = 0; // Número de iteración actual

// Función para generar un número secreto de 5 dígitos
function generarNumeroSecreto() {
    let numero = "";
    for (let i = 0; i < 5; i++) {
        numero += Math.floor(Math.random() * 10);
    }
    return numero;
}

// Función para comprobar el número ingresado por el usuario
function comprobarNumero() {
    const inputNumero = document.getElementById("numero");
    const resultadoFila = document.getElementById("resultadoFila");
    const celdas = resultadoFila.getElementsByClassName("gray-box");
    const numeroUsuario = inputNumero.value;
    inputNumero.value = ""; // Limpiar el input

    if (numeroUsuario.length !== 5 || isNaN(numeroUsuario)) {
        alert("Por favor, ingrese un número de 5 dígitos.");
        return;
    }

    for (let i = 0; i < 5; i++) {
        celdas[i].textContent = numeroUsuario[i];
        if (numeroUsuario[i] === numeroSecreto[i]) {
            celdas[i].style.backgroundColor = "green";
        } else if (numeroSecreto.includes(numeroUsuario[i])) {
            celdas[i].style.backgroundColor = "yellow";
        } else {
            celdas[i].style.backgroundColor = "darkgray";
        }
    }

    iteracion++;

    if (numeroUsuario === numeroSecreto) {
        alert("¡Has adivinado el número secreto!");
        mostrarNumeroSecreto();
    } else if (iteracion == maxIteracion) {
        mostrarIntentoActual(iteracion);
        mostrarMensajeFinal(numeroSecreto);
        mostrarNumeroSecreto();
        const nuevaFila = resultadoFila.cloneNode(true);
        nuevaFila.id = `resultadoFila${iteracion}`;
        document.querySelector("main").appendChild(nuevaFila);
    } else if (iteracion < maxIteracion) {
        mostrarIntentoActual(iteracion);
        if (iteracion > 1) {
        const nuevaFila = resultadoFila.cloneNode(true);
        nuevaFila.id = `resultadoFila${iteracion}`;
        document.querySelector("main").appendChild(nuevaFila);
    }
}

// Función para mostrar el intento actual
function mostrarIntentoActual(intento) {
    const intentosMensaje = document.getElementById("intentosMensaje");
    intentosMensaje.textContent = `Intento actual: ${intento}`;
    intentosMensaje.style.display = "block";
}

// Función para mostrar el mensaje al finalizar los intentos
function mostrarMensajeFinal(numeroSecreto) {
    const mensajeResultado = document.getElementById("mensajeResultado");
    mensajeResultado.textContent = `¡Has agotado tus intentos! El número secreto era: ${numeroSecreto}`;
    mensajeResultado.style.display = "block";
}

// Función para mostrar el número secreto en los divs "blue-box"
function mostrarNumeroSecreto() {
    for (let i = 1; i <= 5; i++) {
        const blueBox = document.getElementById(`blue-box-${i}`);
        blueBox.textContent = numeroSecreto[i - 1];
    }
}

// Función para inicializar las celdas de la sección RESULT
function inicializarCeldas() {
    for (let i = 0; i < maxIteracion; i++) {
        const resultado = document.getElementsByClassName("gray-row")[i];
        const celdas = resultado.getElementsByClassName("gray-box");
        for (let j = 0; j < 5; j++) {
            celdas[j].textContent = "*";
            celdas[j].style.backgroundColor = "lightgray";
        }
    }
}
}
