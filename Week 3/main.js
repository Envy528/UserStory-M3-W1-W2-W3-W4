// HTML variables
const btn = document.getElementById("agregarNota");
const input = document.getElementById("nota");
const lista = document.getElementById("listaNotas");

// Show variables in console - Task 2
console.log(btn, input, lista);

// Add event listener to the button - Task 3
btn.addEventListener("click", function () {
    //If the input is empty does this
    if (!input.value) {
        alert("Agrega algo en el input");
    } else {
        // if the input is not empty create a li element and adds it to the HTML
        const item = document.createElement("li");
        item.innerHTML = `${input.value} <button id="btnDel">Eliminar</button>`;
        lista.appendChild(item);
        // Clear the input and focus it
        input.value = "";
        input.focus();
        // Shows on console the note added
        console.log("Nota agregada: ", item.innerText);
    }
});