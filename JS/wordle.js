// Variables globales
const maxIteracion = 5; // Número de filas en la sección RESULT
let numeroSecreto = generarNumeroSecreto(); // Genera un número secreto aleatorio
let iteracion = 0; // Número de iteración actual
let adivinado = false

console.log(`Hey, te pego un chivatazo: ${numeroSecreto}`);

// Inicialización
mostrarIntentoActual(iteracion);

// Función para generar un número secreto de 5 dígitos
function generarNumeroSecreto() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

// Función para comprobar el número ingresado por el usuario
function comprobarNumero() {
    const inputNumero = document.getElementById("numero");
    const numeroUsuario = inputNumero.value;
    inputNumero.value = ""; // Limpiar el input

    if (adivinado) {
        mostrarIntentoActual(iteracion);
        return;
    }

    if (numeroUsuario.length !== 5 || isNaN(numeroUsuario)) {
        alert("Por favor, ingrese un número de 5 dígitos.");
        return;
    }

    if (iteracion >= maxIteracion) {
        alert("Manito te has colao!")
        return; // No realizar ninguna acción adicional si se alcanzó el máximo de intentos
    }

    // Eliminar todas las filas con la clase "inicio"
    const filasInicio = document.querySelectorAll(".gray-row.inicio");
    filasInicio.forEach((fila) => {
        fila.remove();
    });

    const resultadoFila = document.createElement("div");
    resultadoFila.className = "gray-row";
    const celdas = [];

    for (let i = 0; i < 5; i++) {
        const celda = document.createElement("div");
        celda.className = "gray-box";
        celda.textContent = numeroUsuario[i];
        if (numeroUsuario[i] === numeroSecreto[i]) {
            celda.style.backgroundColor = "#00cd00";
        } else if (numeroSecreto.includes(numeroUsuario[i])) {
            celda.style.backgroundColor = "#ffd731";
        } else {
            celda.style.backgroundColor = "darkgray";
        }
        celdas.push(celda);
        resultadoFila.appendChild(celda);
    }

    iteracion++;

    if (numeroUsuario === numeroSecreto) {
        adivinado = true;
        ganador(numeroSecreto);
        mostrarIntentoActual(iteracion);
        mostrarNumeroSecreto();
    } else if (iteracion === maxIteracion) {
        mostrarMensajeFinal(numeroSecreto);
        mostrarNumeroSecreto();
        mostrarIntentoActual(iteracion);
    } else if (iteracion < maxIteracion) {
        mostrarIntentoActual(iteracion);
    }

    document.querySelector("main").appendChild(resultadoFila);
}

// Función para mostrar el intento actual
function mostrarIntentoActual(intento) {
    const intentosMensaje = document.getElementById("intentosMensaje");
    const intentosRestantes = maxIteracion - intento;
    const divResultado = document.getElementById("divResultado")
    divResultado.classList.add('divComprobado');
    if (!adivinado){
        intentosMensaje.textContent = `Ahora tienes ${intentosRestantes} intentos restantes.`;
    } 
}

// Función para mostrar el mensaje al finalizar los intentos
function mostrarMensajeFinal(numeroSecreto) {
    const mensajeResultado = document.getElementById("mensajeResultado");
    if (!adivinado) {
        const intentosRestantes = maxIteracion - iteracion;
        mensajeResultado.textContent = `¡Has agotado tus intentos! El número secreto era: ${numeroSecreto}`;
        mensajeResultado.style.display = "block";
    } else if (adivinado){
        mensajeResultado.textContent = `¡Te han sobrado ${intentosRestantes} intentos! El número secreto era: ${numeroSecreto}`;
        mensajeResultado.style.display = "block";
    }
}


// Función para mostrar el número secreto en los divs "blue-box"
function mostrarNumeroSecreto() {
    const numeroSecretoArray = numeroSecreto.split('');
    for (let i = 1; i <= 5; i++) {
        const blueBox = document.getElementById(`blue-box-${i}`);
        blueBox.textContent = numeroSecretoArray[i - 1];
    }
}

// Función para decir que eres ganador
function ganador() {
    const divResultado = document.getElementById("divResultado");
    divResultado.classList.add('divGanador');
    const mensajeResultado = document.getElementById("mensajeResultado");
    mensajeResultado.textContent = `¡HAS GANADO! Y el número secreto era: ${numeroSecreto}`;
    mensajeResultado.style.display = "block";
}

