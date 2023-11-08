// Variables globales
const maxIteracion = 5; // Número de filas en la sección RESULT
let numeroSecreto = generarNumeroSecreto(); // Genera un número secreto aleatorio
let iteracion = 0; // Número de iteración actual
let adivinado = false

console.log(`Hey, te pego un chivatazo: ${numeroSecreto}`); // mostramos en la consola un chivatazo para facilitar el testing

// Inicialización de la iteracion
mostrarIntentoActual(iteracion);

// Función para generar un número secreto de 5 dígitos
function generarNumeroSecreto() {
    return Math.floor(10000 + Math.random() * 90000).toString();
    // cogemos un numero de 5 digitos y lo convertimos en string para luego recorrer posiciones
}

// Función para comprobar el número ingresado por el usuario
function comprobarNumero() {
    const inputNumero = document.getElementById("numero"); // cogemos el numero del usuario
    const numeroUsuario = inputNumero.value; // cogemos el VALOR del usuario
    inputNumero.value = ""; // Limpiamos el input

    if (adivinado) { // si está adivinado mostramos el intento y no hacemos nada mas
        mostrarIntentoActual(iteracion);
        return;
    }

    if (numeroUsuario.length !== 5 || isNaN(numeroUsuario)) { // si el numero introducido es nulo o no tiene longitud 5 mostramos una alerta
        alert("Por favor, ingrese un número de 5 dígitos.");
        return;
    }

    if (iteracion >= maxIteracion) { // si intenta comprobar cuando está en el intento 5 o más que muestre alerta
        alert("Manito te has colao!")
        return; // No realizar ninguna acción adicional si se alcanzó el máximo de intentos
    }

    // cogemos el resultadoFila como creacion elemento de div
    const resultadoFila = document.createElement("div");
    resultadoFila.className = "gray-row"; // añadimos al div la clase de gray-row
    const celdas = [];

    for (let i = 0; i < 5; i++) { // hacemos que hasta que lleguemos a 5 hagamos esto, como empieza en 0 haremos 5
        const celda = document.createElement("div"); // creamos un div en celda
        celda.className = "gray-box"; // le asignamos la clase gray-box al div creado
        celda.textContent = numeroUsuario[i]; // hacemos que el contenido del div sea la posicion (iteracion) de la string
        if (numeroUsuario[i] === numeroSecreto[i]) { // si el numero es el mismo en la posicion (iteracion) que la posicion (iteracion) del secreto mostramos verde
            celda.style.backgroundColor = "#00cd00";
        } else if (numeroSecreto.includes(numeroUsuario[i])) { // si el numero secreto contiene el numero introducido pero no está en la posicion mostramos amarillo
            celda.style.backgroundColor = "#ffd731";
        } else { // si no se cumple nada es que no está ni lo contiene así que mostramos gris oscuro
            celda.style.backgroundColor = "darkgray";
        }
        celdas.push(celda);
        resultadoFila.appendChild(celda); 
    }

    iteracion++; // una vez hecha la row sumamos la iteracion

    // condiciones segun el numero del usuario
    if (numeroUsuario === numeroSecreto) { // si el numero del usuario esigual al secreto realizamos todo esto:
        adivinado = true; // hacemos que adivinado sea true para despues validar por ejemplo en el input
        ganador(numeroSecreto);  // llamamos a la funcion ganador con el numero para que lo muestre arriba y haga el div estilo ganador
        mostrarIntentoActual(iteracion); // llamamos a la funcion mostrarIntentoActual con la iteracion para que muestre el intento que estamos
        mostrarNumeroSecreto(); // mostramos el numero secreto arriba
    } else if (iteracion === maxIteracion) { // como hemos llegado al limite de intentos mostramos el mensaje final
        mostrarMensajeFinal(numeroSecreto);
        mostrarNumeroSecreto();
        mostrarIntentoActual(iteracion);
    } else if (iteracion < maxIteracion) { // como no lo hemos adivinado y estamos por debajo de la iteración máxima mostrará simplemente los intentos
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
        document.getElementById("imagenGuapa").innerHTML='<button class="botonFinalPerdedor" onClick="window.location.reload();"><img class="image" src="images/imageLisa.png"/></button> <br> <p>Dale click a la imagen o arriba a la izquierda para volver a jugar</p>';
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
    document.getElementById("imagenGuapa").innerHTML='<button class="botonFinalGanador" onClick="window.location.reload();"><img class="image" src="images/image1.png"/></button> <br> <p>Dale click a la imagen o arriba a la izquierda para volver a jugar</p>';
}