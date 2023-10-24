let random = Math.floor(Math.random() * 10+1);
console.log(random)
var intents = 5
var continuar = true
var cancel·lat = false
let guess;
do {
    guess = window.prompt("Adivina el numero del 1-10, te quedan: " + intents + " intentos");
    if (guess === null) {
        cancel·lat = true
    }
    intents--
    console.log(guess, random);
    if (random > guess) {
      window.alert("Tu numero es más bajo");
    } else if (random < guess) {
      window.alert("Tu numero es más alto");
    } 
} while (guess != random & intents != 0 & !cancel·lat);
if (guess == random){
        window.alert("Has ganado!")
    } else if (cancel·lat) {
        window.alert("Has cancelado, recarga para volver a intentarlo")
    }else window.alert("Has excedido los intentos")